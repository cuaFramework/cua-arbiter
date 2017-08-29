from django.conf.urls import url

from . import views
from rest_framework_jwt.views import obtain_jwt_token,verify_jwt_token

urlpatterns = [
     url(r'^$',views.logmanage,name='logmanage'),
    # url(r'^api-token-auth/', obtain_jwt_token),
    # url(r'^getUserDetail', views.restful.get_user_detail),
    # url(r'^save', views.restful.save_casefile, name='save'),
    # url(r'^$', views.index, name='index'),
    # url(r'^(?P<case_name>[\w.:]+)/editor/$', views.editor, name='editor'),

]