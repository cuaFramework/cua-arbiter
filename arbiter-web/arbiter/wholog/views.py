import codecs
import json
import os
import time
from subprocess import Popen, PIPE, STDOUT

from django import forms
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from django.core import serializers
from arbiter.models import RunInfo
import requests
import datetime

# 日志管理
from rest_framework.decorators import api_view

ES_URL = '10.104.104.57:9200'


def index(request):
    querybody = {
        "from": 0,
        "size": 10,
        "query": {
            "range": {
                "@timestamp": {
                    "gte": "2017-08-30T02:03:22.566Z"
                }
            }
        }
    }

    # querybody['query'] = "xxx"
    # payload = "{'query': { 'match_all': {} }}"
    res = requests.get('http://' + ES_URL + '/_search', data=json.dumps(querybody))
    data =     res.json()  # 返回的数据

    return render(request,'home.html')
#去Es 根据id 查询
def search(id):
    #组合查询DSL
    querybody = {
        "size": 1000,
        "query": {
          "match": {
            "logId": id
            }
          },
        "sort": {"@timestamp": {"order": "asc"}}
}


    res = requests.get('http://' + ES_URL + '/_search', data=json.dumps(querybody))
    #转换成json
    res_json = res.json()
    #符合查询条件的数量
    result_total = res_json['hits']['total']
    #获取source节点
    result_source = res_json['hits']['hits'][0]['_source']
    #最内层数据
    response_data_dict = {}
    response_data_dict['id'] = result_source['logId']
    response_data_dict['caseName'] = result_source['case']
    response_data_dict['author'] = result_source['author']
    response_data_dict['beginTime'] = result_source['@timestamp']
    #每条返回的数据组合到list
    response_data_list = []
    #每条日志内容组合list
    log_data_list = []
    for i in range(0,result_total):
        result_source_var = res_json['hits']['hits'][i]['_source']
        print(result_source_var)
        log_data_list.append(result_source_var['logData'])

    response_data_dict['logData'] = log_data_list
    response_data_list.append(response_data_dict)
    #最终返回的json
    response_data={"data":response_data_list}
    return  response_data

#去Es 根据id 只查询具体日志数据
@api_view(['GET'])
def queryLogData(request):
    log_id = request.GET.get('logId')
    # 组合查询DSL
    querybody = {
        "size": 1000,
        "query": {
            "match": {
                "logId": log_id
            }
        },
        "sort": {"creat_time": {"order": "asc"}}
    }

    res = requests.get('http://' + ES_URL + '/_search', data=json.dumps(querybody))
    # 转换成json
    res_json = res.json()
    # 符合查询条件的数量
    result_total = res_json['hits']['total']
    # 每条返回的数据组合到list
    # 每条日志内容组合list
    log_data_list = []
    for i in range(0, result_total):
        result_source = res_json['hits']['hits'][i]['_source']
        log_data_list.append(result_source['logData'])
    # 最终返回的json
    response_data = {"data": log_data_list}
    return JsonResponse(response_data)

@api_view(['GET'])
def getAllLog(request):
    "获取数据库所有日志列表"
    #获取前台发送来的参数
    start_time = request.GET.get('startTime')
    end_time = request.GET.get('endTime')
    key_word = request.GET.get('keyWords')
    #将字符串转换成对应数据库日期时间
    date_from =datetime.datetime.strptime(start_time,'%Y-%m-%d %H:%M')
    date_to =datetime.datetime.strptime(end_time,'%Y-%m-%d %H:%M')
    #查询时间范围内的数据库
    log_list = RunInfo.objects.filter(run_time__range=(date_from,date_to)).order_by('run_time')
    data = serializers.serialize('json',log_list)
    return HttpResponse(data)

@api_view(['GET'])
def getDetailLog(request):
    #通过logid 获取具体日志
    log_id = request.GET.get('logId')
    return JsonResponse(search(log_id))













