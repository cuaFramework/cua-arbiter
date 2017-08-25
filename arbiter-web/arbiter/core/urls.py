from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login', views.login, name='login'),
    url(r'^logout',views.logout,name='logout'),
    url(r'^save', views.save, name='save'),
    url(r'^(?P<case_name>[\w.:]+)/$', views.detail, name='detail'),
    url(r'^$', views.index, name='index'),
    # url(r'^(?P<case_name>[\w.:]+)/editor/$', views.editor, name='editor'),

]