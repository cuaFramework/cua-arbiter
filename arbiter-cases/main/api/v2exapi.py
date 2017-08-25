
# -*- coding: utf-8 -*-
from utils.singleton import singleton
from utils.http_client import get_response_common


@singleton
class V2exapi(object):
    def __init__(self, env):
        self.env = env

        if env=='prod':
            self.env_url = ''
        else:
            self.env_url = env


    def 发送登录请求(self,data={}):

        return get_response_common(api_type='v2exapi', env=self.env, req_type='POST', host='www.v2ex'+self.env_url+'.com', url='/signin', data=data)

    def 请求登录页面(self):

        return get_response_common(api_type='v2exapi', env=self.env, req_type='GET', host='www.v2ex'+self.env_url+'.com', url='/signin')