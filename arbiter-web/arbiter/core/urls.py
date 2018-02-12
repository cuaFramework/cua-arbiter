from django.conf.urls import url
from . import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^login', views.login, name='login'),
    url(r'^api-token-auth', obtain_jwt_token),
    url(r'^getUserDetail', views.auth_restful.get_user_detail),
    url(r'^save', views.auth_restful.save_case_file, name='save'),
    url(r'^delete', views.auth_restful.delete_case_file, name='delete'),
    url(r'^copy', views.auth_restful.copy_case_file, name='copy'),
    url(r'^getCaseList', views.restful.get_case_list),
    url(r'^cloneCaseObj', views.restful.get_caseobj),
    url(r'^$', views.index, name='index'),
    url(r'^.*$', views.index),
]
