from subprocess import Popen, PIPE, STDOUT
from channels.sessions import channel_session
from arbiter.models import Case_Run_Info
from ..settings import redis_elk_pool
import json
import redis
from ..common import utils

# 一个管道大概会持续30s


isEditFilesName = []  # 全局变量，保存正在被编辑的文件名
# redis 配置

# logstash 在redis key值
logstash_redis_key = 'logstash-arbiter-list'
# redis 连接
re = redis.Redis(connection_pool=redis_elk_pool)


# 当连接上时，发回去一个connect字符串
@channel_session
def ws_connect(message):
    message.reply_channel.send({"accept": True})


# 将发来的信息原样返回
@channel_session
def ws_message(message):
    cmd = message.content['text']
    log_content = ''
    # 获得本次运行的用例id
    log_id = utils.generate_id()
    # 通过自定义字符分割需要的类型
    if cmd.split(' ')[0] == 'runCase':
        message.reply_channel.send({
            "text": "**********************************************开始执行***********************************************"
        }, immediately=True)
        case_name = cmd.split(' ')[1]
        user_name = cmd.split(' ')[2]
        task_name = cmd.split(' ')[3]
        run_time = utils.get_now_time(1)
        runcmd = Popen(['nosetests', '-P', '--nologcapture', case_name],
                       bufsize=0, stdout=PIPE, stderr=STDOUT)
        text = None
        while True:
            line = runcmd.stdout.readline()
            if not line:
                break
            text = line.decode('utf-8')
            if 'Ran' in text and 'test' in text:
                info_text = text
            # 拼接日志内容
            case_name = case_name
            create_time = utils.get_now_time(2)
            data = {'create_time': create_time, 'logId': log_id, 'case': case_name, 'author': user_name,
                    'logData': text}
            # 向redis中发送值
            logData = json.dumps(data)
            re.lpush(logstash_redis_key, logData)
            message.reply_channel.send({
                "text": text
            }, immediately=True)

        message.reply_channel.send({
            "text": "**********************************************结束执行***********************************************"
        }, immediately=True)
        num = info_text.split("Ran")[1].split("test")[0].strip()
        duration = info_text.split(" in")[1].split("s")[0].strip()
        # 存一条logId到mysql
        # 将日志存入mysql
        # mysql 存入格式和内容需要完善
        dic = {'log_id': log_id, 'case_name': case_name, 'run_time': run_time, 'author': user_name,
               'duration': duration, 'num': num,
               'task_name': task_name, 'result': text.split("(")[0].strip().replace("\n", "")}
        Case_Run_Info.objects.create(**dic)

    if cmd.split(' ')[0] == 'validateEdit':

        if cmd.split(' ')[1] == '0':
            if cmd.split(' ')[2] in isEditFilesName:
                message.reply_channel.send({
                    "text": "isBusy"
                }, immediately=True)
                isEditFilesName.append(cmd.split(' ')[2])
        if cmd.split(' ')[1] == '1':
            isEditFilesName.remove(cmd.split(' ')[2])


# 断开连接时发送一个disconnect字符串
@channel_session
def ws_disconnect(message):
    message.reply_channel.send({"disc": True})
