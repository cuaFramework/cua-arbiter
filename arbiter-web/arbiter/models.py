from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import Group
from django.contrib.postgres.fields import JSONField
import django.utils.timezone as timezone


# GIT权限信息
class Git_Info(models.Model):
    git_url = models.CharField(max_length=200, default='null')
    user_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


# 用例列表
class Case_List(models.Model):
    name = models.CharField(max_length=200)
    data = JSONField()


# 运行日志信息模型
class Case_Run_Info(models.Model):
    log_id = models.UUIDField()
    task_name = models.TextField(max_length=200, default='noName')
    case_name = models.TextField(max_length=5000)
    run_time = models.DateTimeField()
    author = models.CharField(max_length=50)
    num = models.CharField(max_length=50, default='0')
    duration = models.CharField(max_length=50,default='0')
    status = models.CharField(max_length=50, default='done')
    result = models.CharField(max_length=50, default='FAILED')
    deleted = models.IntegerField(default=0)
    version = models.IntegerField(default='10000000')


# 用例版本号信息
class Case_Version_Info(models.Model):
    case_name = models.TextField(max_length=200)  # 用例名，.py文件
    latest_version = models.IntegerField(default=10000000)  # 版本号 八位
    update_time = models.DateTimeField(default=timezone.now)


# 运行记录
class Case_Save_Info(models.Model):
    case_name = models.TextField(max_length=200)  # 用例名+方法
    version = models.IntegerField(default=10000000)
    author = models.CharField(max_length=50)
    save_time = models.DateTimeField(default=timezone.now)
