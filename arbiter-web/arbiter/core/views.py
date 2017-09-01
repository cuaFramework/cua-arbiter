import codecs
import json
import os
import time
from subprocess import Popen, PIPE, STDOUT

from django import forms
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.views import APIView
from .models import CaseList


class UserForm(forms.Form):
    username = forms.CharField(label='用户名', max_length=50)
    password = forms.CharField(label='密码', widget=forms.PasswordInput())


# 登录
def login(request):
    return render(request, 'case/login.html')




@ensure_csrf_cookie
def index(request):
    username = request.user
    # 获取所有case目录下的case
    runcmd = Popen(['nosetests', '-vvv', '--collect-only', '-w', '../arbiter-cases'], bufsize=0,
                   stdout=PIPE, stderr=STDOUT)
    log_list = []
    for line in runcmd.stdout:
        log_list.append(line.decode('utf-8').rstrip())
    # 修改显示名称
    case_list = []
    case_description_list = []
    model_list = []
    for elem in log_list:
        if elem.find("Preparing test case main") != -1:
            temp = elem.split("Preparing test case main.")[1]
            case_list.append(
                temp[::-1].replace(".", ":", 2).replace(":", ".", 1)[::-1])
            model_list.append(temp.split(".")[1])
        elif elem.find(" ... ok") != -1:
            des_str = elem.split(" ...")[0]
            if "main.cases" in des_str:
                des_str = des_str.split("main.cases.")[1].split(".", 1)[1]
            case_description_list.append(des_str)
    case_res = dict(zip(case_list, case_description_list))
    model_res = list(set(model_list))
    # model_res.sort(model_list.index())
    context = {'case_list': case_res, 'model_list': model_res}
    return render(request, 'case/index.html', context)


def detail(request, case_name):
    # runcmd = Popen('nosetests -vv -P --exe  ' + case_name, bufsize = 1, stdout=PIPE, stderr=subprocess.STDOUT)
    # runcmd.wait()
    # 日志
    log_list = []
    # for line in runcmd.stdout.readlines():
    #     log_list.append(line.decode('utf-8'))
    # 传给网页模板
    context = {'log_list': log_list}
    return render(request, "case/detail.html", context)


def editor(request, case_name):
    return render(request, "case/editor.html")


# 分割路径
def spiltPath(name):
    temp = name.split(':')[0]
    print(temp)
    case_class_name = temp.split('.')[-1]  # 用例类名
    case_dir = temp.replace('.', '/')
    return case_dir

class restful(APIView):
    # permission_classes = (AllowAny,)

    @api_view(['POST'])
    @permission_classes([permissions.AllowAny,])
    def get_caselist(request):
        return JsonResponse( CaseList.getList())


# 接口验证
class auth_restful(APIView):
    # 设置permission_classes为必须登陆才能访问下列接口
    permission_classes = (IsAuthenticated,)

    @api_view(['POST'])
    def get_user_detail(request):
        response_data = {}
        response_data['username'] = request.user.username
        response_data['role'] = list(request.user.groups.values_list('name',flat=True))
        return JsonResponse(response_data)

    # 注销
    @api_view(['POST'])
    def logout(request):
        Token.objects.get(user_id=request.user.id).delete()

        response_data = {}
        response_data['success'] = True
        return JsonResponse(response_data)

    # 保存文件方法
    @api_view(['POST'])
    def save_casefile(request):
        # 获取发送的请求
        if request.method == 'POST':
            json_str = ((request.body))
            json_obj = json.loads(json_str)
            case_path = spiltPath(json_obj.get('casepath')) + '.py'
            time_str = time.strftime("%Y-%m-%d %H_%M_%S")
            # rename 原文件+时间格式(2017-07-20 18_34_48)
            os.rename('../arbiter-cases/main/' + case_path,
                      '../arbiter-cases/main/' + case_path + '_' + time_str + '.history')
        # 使用codecs解决乱码问题
        with codecs.open('../arbiter-cases/main/' + case_path, 'w', 'utf-8') as f:
            mfile = File(f)
            mfile.write(json_obj.get('content'))
            mfile.flush()
            mfile.seek(0)
            mfile.close()
            if (mfile.closed):  # TODO 若未关闭？保存不成功？？
                result = 'ok'
                return HttpResponse(json.dumps({"result": result}), content_type="application/json")
