#!/usr/bin/env python
#_*_coding:utf-8_*_
import time
import datetime
import hashlib

##生成uuid
def generate_id():
    m = hashlib.md5(str(time.clock()).encode('utf-8'))

    return m.hexdigest()

#获取当前时间
#typeid=1 ，格式：2017-09-05 13:58:41
#typeid=1 ，格式：时间戳形式：1505112338.4971874
def getNowtime(typeId):
    if (typeId == 1):
        return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    if (typeId == 2):
        return datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
