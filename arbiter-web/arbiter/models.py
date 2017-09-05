from __future__ import unicode_literals
from django.contrib import  admin
from django.db import models
from django.contrib.auth.models import Group
from mongoengine import *


# Create your models here.
#用户模型
class User (models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
#用例执行日志
class Run_Log (Document):
    meta = {
        'collection': 'log',
    }
    case_info = StringField(max_length=100)
    # case_info = models.TextField(max_length=50)
    content =  StringField(max_length=100)
    # begin_time= models.DateTimeField(auto_now_add=True)
    # run_time = models.IntegerField(null=True)
    # operator = models.CharField(max_length=20,null=True)
#用户模型
class RunInfo (models.Model):
    log_id = models.UUIDField()
    case_name = models.TextField(max_length=200)
    run_time = models.DateTimeField()
    author = models.CharField(max_length=50)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username','password')

admin.site.register(User,UserAdmin)