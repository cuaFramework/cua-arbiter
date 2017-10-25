from __future__ import unicode_literals

from subprocess import Popen, PIPE, STDOUT

import os
from django.contrib import admin
from django.db import models
from django.contrib.auth.models import Group
from mongoengine import *


# Create your models here.
# case模型
def Splitmap(src_map,i):
    dst_map = {}
    for case_path, case_name in src_map.items():
        pathArry = case_path.split(":")[0].split(".")
        if len(pathArry)>i+1:
            if pathArry[i] not in dst_map:
                dst_map[pathArry[i]]={}
            dst_map[pathArry[i]][case_path] = case_name
        else:
            dst_map[case_path] = case_name
    i=i+1
    for k, y in dst_map.items():
        if isinstance(y, dict):
            dst_map[k]=Splitmap(y,i)
    return dst_map


def refact(src_map):
    dst_map = {}
    for model, cases in src_map.items():
        if model not in dst_map:
            dst_map[model]={}
        dst_map[model]=Splitmap(cases,2)
    return dst_map


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
            if elem.find("Preparing test case ") != -1:
                if elem.find("(")!= -1:
                    x =  elem.split("Preparing test case ")[1]
                    temp =x.split(" ("+case_path_obj+".")[1].split(")")[0]+"."+x.split(" (")[0]
                else:
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
                if elem.find("(") != -1:
                    temp_str = des_str.split(")")[0].split(".")
                    des_str = temp_str[len(temp_str)-1] + "." + des_str.split(" (")[0]
                if case_class in des_str:
                    des_str = des_str.split(case_class+".")[1].split(".", 1)[1]
                case_map[case_name] = des_str
        res_tree = refact(res_tree)
        return res_tree
