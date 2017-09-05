from __future__ import unicode_literals

from subprocess import Popen, PIPE, STDOUT

import os
from django.contrib import admin
from django.db import models
from django.contrib.auth.models import Group
from mongoengine import *


# Create your models here.
# case模型
class CaseList:
    @staticmethod
    def getList():
        runcmd = Popen(['nosetests', '-vvv', '--collect-only', '-w', '../arbiter-cases'], bufsize=0,
                       stdout=PIPE, stderr=STDOUT)
        log_list = []
        case_path = os.getenv("CASEPATH")
        case_path_obj = case_path.split('/')[0]
        case_path_fd = case_path.split('/')[1]
        case_class = case_path_obj+"."+case_path_fd
        for line in runcmd.stdout:
            log_list.append(line.decode('utf-8').rstrip())
        # 修改显示名称
        case_list = []
        res_tree = {}
        case_map = {}
        case_name = None
        for elem in log_list:
            if elem.find("Preparing test case "+case_path_obj) != -1:
                temp = elem.split("Preparing test case "+case_path_obj+".")[1]
                model = temp.split(".")[1]
                case_name = temp[::-1].replace(".", ":", 2).replace(":", ".", 1)[::-1]
                if model not in res_tree:
                    res_tree[model] = {}
                case_map = res_tree[model]
                case_map[case_name] = temp[::-1].replace(".", ":", 2).replace(":", ".", 1)[::-1]
                case_list.append(
                    temp[::-1].replace(".", ":", 2).replace(":", ".", 1)[::-1])
            elif elem.find(" ... ok") != -1:
                des_str = elem.split(" ...")[0]
                if case_class in des_str:
                    des_str = des_str.split(case_class+".")[1].split(".", 1)[1]
                case_map[case_name] = des_str
        return res_tree
