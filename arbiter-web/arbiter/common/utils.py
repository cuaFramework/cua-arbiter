#!/usr/bin/env python
#_*_coding:utf-8_*_
import time
import datetime
import hashlib


##生成uuid
def generate_id():
    m = hashlib.md5(str(time.clock()).encode('utf-8'))

    return m.hexdigest()


# 获取当前时间
# typeid=1 ，格式：2017-09-05 13:58:41
# typeid=1 ，格式：时间戳形式：1505112338.4971874
def getNowtime(typeId):
    if (typeId == 1):
        return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    if (typeId == 2):
        return datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')


# 处理logData数据
def get_log_data(log_data):
    log_str = log_data.split("请求")[1].split("]")[0]  # 获得请求类型+耗时+code部分数据
    if log_str != None:
        result_list = log_str.split(" ")
        type_value = result_list[0].split(":")[1]
        consume_time = result_list[1].split(":")[1].split("m")[0]
        response_code = result_list[2].split(":")[1]
        response_value = {}
        response_value["request_type"] = type_value
        response_value["consume_time"] = consume_time
        response_value["response_code"] = response_code
        return response_value
