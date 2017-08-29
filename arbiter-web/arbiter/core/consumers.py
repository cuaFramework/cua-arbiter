from subprocess import Popen, PIPE, STDOUT

from channels.sessions import channel_session

from arbiter.models import Run_Log
import json
import redis

# message.reply_channel    一个客户端通道的对象
# message.reply_channel.send(chunk)  用来唯一返回这个客户端

# 一个管道大概会持续30s


isEditFilesName = []#全局变量，保存正在被编辑的文件名
#redis 配置
redis_host = '10.104.104.26'
redis_port = 6379
redis_db = 11
#logstash 在redis key值
logstash_key = 'logstash-test-list'
re = redis.Redis(host=redis_host, port=redis_port,db=redis_db)#redis 连接
# 当连接上时，发回去一个connect字符串
@channel_session
def ws_connect(message):
    message.reply_channel.send({"accept": True})


# 将发来的信息原样返回
@channel_session
def ws_message(message):
    cmd = message.content['text']
    log_content=''
    #通过自定义字符分割需要的类型
    if (cmd.split(' ')[0] == 'runCase'):
        message.reply_channel.send({
            "text": "**********************************************开始执行***********************************************"
        }, immediately=True)
        case_name = cmd.split(' ')[1]

        # if os.name == 'nt':
        #     setenv = getoutput('set PYTHONPATH='+caseBasePath)
        #     # runcmd = Popen(['nosetests', '-vv', '-P', case_name], bufsize=0, stdout=PIPE, stderr=STDOUT)
        # else:
        #     # setenv = getoutput('export PYTHONPATH=' + caseBasePath)
        #     setenv = Popen(['/bin/sh', '-c', 'export', 'PYTHONPATH='+caseBasePath], bufsize=0, stdout=PIPE, stderr=STDOUT)

        # runcmd = Popen('nosetests -vv -P --exe  ' + case_name, bufsize=0, stdout=PIPE, stderr=STDOUT)
        runcmd = Popen(['nosetests', '-P', '--nologcapture', case_name], bufsize=0, stdout=PIPE, stderr=STDOUT)
        while True:
            line = runcmd.stdout.readline()
            if not line: break
            text = line.decode('utf-8')
            #拼接日志内容
            log_content = log_content+text

            # log_list.append(line.decode('utf-8'))
            message.reply_channel.send({
                "text": text
            }, immediately=True)
        message.reply_channel.send({
            "text": "**********************************************结束执行***********************************************"
        }, immediately=True)
        #向redis中发送值
        case_name = case_name.lower()
        data = {'case':case_name,'author': 'hui','logData': log_content}
        logData = json.dumps(data)
        re.lpush(logstash_key,logData)
        #将日志存入mysql
        # mysql 存入格式和内容需要完善
        #dic = {'case_info':case_name,'content': log_content, 'begin_time': '','run_time': 10}
        #Run_Log.objects.create(**dic)

        #mongodb
        #Run_Log.objects.create(case_info=case_name)
        #log = Run_Log(case_info=case_name)
        #log.content ="log_content"
        #log.save()

    if (cmd.split(' ')[0] == 'validateEdit'):

        if(cmd.split(' ')[1] == '0'):
            if(cmd.split(' ')[2] in isEditFilesName):
                message.reply_channel.send({
                    "text": "isBusy"
                }, immediately=True)
                isEditFilesName.append(cmd.split(' ')[2])
        if (cmd.split(' ')[1] == '1'):
            isEditFilesName.remove(cmd.split(' ')[2])



# 断开连接时发送一个disconnect字符串，当然，他已经收不到了
@channel_session
def ws_disconnect(message):
    message.reply_channel.send({"disc": True})
