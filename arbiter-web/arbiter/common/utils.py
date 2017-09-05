#!/usr/bin/env python
#_*_coding:utf-8_*_
import time
import datetime
import hashlib

##生成uuid
def generate_id():
    m = hashlib.md5(str(time.clock()).encode('utf-8'))

    return m.hexdigest()

#获取当前时间 ，格式：2017-09-05 13:58:41
def getNowtime():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
