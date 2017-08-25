from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render
from subprocess import getoutput, Popen, PIPE, STDOUT
import os,time
from functools import wraps
import json
import codecs
from django import forms
from .models import User
from django.core.files import File
from django.views.decorators.csrf import ensure_csrf_cookie
class UserForm(forms.Form):
        username = forms.CharField(label='用户名',max_length=50)
        password = forms.CharField(label='密码',widget=forms.PasswordInput())

#自定义登录装饰器
def check_login(func):
    @wraps(func)
    def wrap(request, *args, **kwargs):
        profile = request.session.get('username')
        if profile:
            return func(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/arbiter/login')

    return wrap
#登录
def login(request):
    errors=[]
    username=None
    password=None
    validcode=None
    if request.method == 'POST':
        if not request.POST.get('username'):
            errors.append('用户名不能为空')
        else:
            username = request.POST.get('username')

        if not request.POST.get('password'):
            errors.append('密码不能为空')
        else:
            password = request.POST.get('password')
        if username is not None and password is not None :
            user = User.objects.filter(username=username,password=password)
            if user:
                response = HttpResponseRedirect('/arbiter/')
                request.session['username']=username
                return response


    return render(request, 'case/login.html', {'errors': errors})
#注销
def logout(reuest):
    username = reuest.session.get('username')
    if username:
        del reuest.session['username']
    return HttpResponseRedirect('/arbiter/login')


@ensure_csrf_cookie
@check_login
def index(request):
    username = request.session.get('username')
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
            if  "main.cases" in des_str:
                des_str = des_str.split("main.cases.")[1].split(".",1)[1]
            case_description_list.append(des_str)


    case_res = dict(zip(case_list, case_description_list))
    model_res = list(set(model_list))
    # model_res.sort(model_list.index())



    context = {'case_list': case_res,'model_list': model_res}

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

#保存文件方法
def save(request):
    #获取发送的请求
    if request.method == 'POST':
        json_str = ((request.body))
        json_obj = json.loads(json_str)
        case_path = spiltPath(json_obj.get('casepath'))+'.py'
        time_str=time.strftime("%Y-%m-%d %H_%M_%S")
        #rename 原文件+时间格式(2017-07-20 18_34_48)
        os.rename('../arbiter-cases/main/'+case_path,'../arbiter-cases/main/'+case_path+'_'+time_str+'.history')
    #使用codecs解决乱码问题
    with codecs.open('../arbiter-cases/main/'+case_path,'w','utf-8') as f:
        mfile = File(f)
        mfile.write(json_obj.get('content'))
        mfile.flush()
        mfile.seek(0)
        mfile.close()
        if(mfile.closed):#TODO 若未关闭？保存不成功？？
            result = 'ok'
            return HttpResponse(json.dumps({"result":result}),content_type="application/json")


#分割路径
def spiltPath(name):
    temp = name.split(':')[0]
    print(temp)
    case_class_name = temp.split('.')[-1]   #用例类名
    case_dir =  temp.replace('.','/')
    return case_dir
