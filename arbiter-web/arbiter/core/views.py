import codecs
import json
import os
import time
import git
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from arbiter.core.models import CaseList
from arbiter.models import Case_List, Git_Info


# 登录
def login(request):
    return render(request, 'case/login.html')


def index(request):
    return render(request, 'case/index.html')


class restful(APIView):
    # 获取测试用例树
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.body = None

    @api_view(['POST'])
    @permission_classes([permissions.AllowAny, ])
    def get_case_list(self):
        try:
            cases_results = Case_List.objects.filter(name="arbiter_cases").first().data
            return JsonResponse(cases_results)
        except AttributeError:
            cases_results = CaseList.getList()
            Case_List.objects.create(name="arbiter_cases", data=cases_results)
            return JsonResponse(cases_results)

    # 获取测试用例GIT工程
    @api_view(['POST'])
    @permission_classes([permissions.AllowAny, ])
    def get_caseobj(self):
        case_path = os.getenv("CASEPATH")
        json_obj = json.loads(self.body)
        if Git_Info.objects.count() > 0:
            info = Git_Info.objects.get()
            info.user_name = json_obj.get("git_username")
            info.password = json_obj.get("git_password")
            info.save()
        else:
            Git_Info.objects.create(user_name=json_obj.get("git_username"), password=json_obj.get("git_password"))
        repo = git.Repo.clone_from(json_obj.get('url'), '../arbiter-cases/' + case_path.split('/')[0], branch='master')
        response_data = {'success': True}
        Case_List.objects.create(name="arbiter_cases", data=CaseList.getList())
        return JsonResponse(response_data)


# 下列接口需要登录验证
class auth_restful(APIView):
    # 设置permission_classes为必须登陆才能访问下列接口
    permission_classes = (IsAuthenticated,)

    # 获取用户信息
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user = None
        self.method = None
        self.body = None

    @api_view(['POST'])
    def get_user_detail(self):
        response_data = {'username': self.user.username,
                         'role': list(self.user.groups.values_list('name', flat=True))}
        return JsonResponse(response_data)

    # 注销
    @api_view(['GET'])
    def logout(self):
        Token.objects.get(user_id=self.user.id).delete()
        Token.objects.create(user_id=self.user.id)
        response_data = {'success': True}
        return JsonResponse(response_data, content_type="application/json")

    # 保存文件方法
    @api_view(['POST'])
    def save_case_file(self):
        case_path = os.getenv("CASEPATH")
        case_path_obj = case_path.split('/')[0]
        # 获取发送的请求
        json_str = self.body
        json_obj = json.loads(json_str)
        case_path = json_obj.get('casepath').split(':')[0].replace('.', '/') + '.py'
        time_str = time.strftime("%Y-%m-%d %H_%M_%S")
        # rename 原文件+时间格式(2017-07-20 18_34_48)
        os.rename('../arbiter-cases/' + case_path_obj + '/' + case_path,
                  '../arbiter-cases/' + case_path_obj + '/' + case_path + '_' + time_str + '.history')
        # 使用codecs解决乱码问题
        with codecs.open('../arbiter-cases/' + case_path_obj + '/' + case_path, 'w', 'utf-8') as f:
            mfile = File(f)
            mfile.write(json_obj.get('content'))
            mfile.flush()
            mfile.seek(0)
            mfile.close()
            if mfile.closed:
                result = 'ok'
                repo = git.Repo('../arbiter-cases/caseobj')
                repo.git.add(update=True)
                repo_index = repo.index
                repo_index.commit(self.user.username + "修改文件" + case_path)
                # 获取远程仓库
                remote = repo.remote()
                remote.pull()
                test = os.path.join(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'util'), 'askpass.py')
                # 推送本地修改到远程仓库
                remote.push()
                # 同步最新用例列表到数据库
                Case_List.objects.create(name="arbiter_cases", data=CaseList.getList())
                return HttpResponse(json.dumps({"result": result}), content_type="application/json")
