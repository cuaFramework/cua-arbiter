from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^query-api-data', views.query_api_data, name='query-api-data'),
    url(r'^api-count', views.api_count, name='api-count'),
    url(r'^getAllLog', views.getAllLog, name='getAllLog'),
    url(r'^logDetail111', views.getDetailLog, name='getDeatailLog'),
    # todo 登录登出抽离出来，现在core和wholog下的view均有
    url(r'^getUserDetail', views.auth_restful.get_user_detail, name='getUserDetail'),
    url(r'^queryLogData', views.queryLogData, name='queryLogData'),
    url(r'^home', views.home, name='home'),
    url(r'^index', views.index, name='index'),

]
