from django.conf.urls import url

from . import views
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

urlpatterns = [
    url(r'^login', views.login, name='login'),
    url(r'^logout', views.auth_restful.logout, name='logout'),
    url(r'^api-token-auth', obtain_jwt_token),
    url(r'^getUserDetail', views.auth_restful.get_user_detail),
    url(r'^save', views.auth_restful.save_casefile, name='save'),
    url(r'^getCaseList', views.restful.get_caselist, name='getCaseList'),
    url(r'^(?P<case_name>[\w.:]+)/$', views.detail, name='detail'),
    url(r'^$', views.index, name='index'),
    # url(r'^(?P<case_name>[\w.:]+)/editor/$', views.editor, name='editor'),

]
