import codecs
import json
import os
import time
import git
import redis
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import CaseList


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
        # re = redis.Redis(connection_pool=redis_arbiter_pool)
        # res = re.hgetall("casemap")
        # if res == {}:
        #     tmp =  CaseList.getList()
        #     re.hmset("casemap",tmp)
        #     res = tmp
        return JsonResponse(CaseList.getList())

    # 获取测试用例工程
    @api_view(['POST'])
    @permission_classes([permissions.AllowAny, ])
    def get_caseobj(self):
        case_path = os.getenv("CASEPATH")
        json_obj = json.loads(self.body)
        repo = git.Repo.clone_from(json_obj.get('url'), '../arbiter-cases/' + case_path.split('/')[0], branch='master')
        response_data = {'success': True}
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
                return HttpResponse(json.dumps({"result": result}), content_type="application/json")
