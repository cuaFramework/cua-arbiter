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

from elasticsearch import Elasticsearch
import requests

# 日志管理
ES_URL = '10.104.104.57:9200'


def logmanage(request):
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
    data = res.json()
    return JsonResponse(data)
