# -*- coding: utf-8 -*-
# from utils.arbiter_logger import LOGGER
import utils.arbiter_logger
from api.v2exapi import V2exapi
from bs4 import BeautifulSoup

from module.v2exapi.login_page import LoginPage


class TestLogin():
    def set_up(self):
        """ 所有case运行前执行此方法 """
        pass

    def tear_down(self):
        """ 所有case运行后执行此方法 """
        pass

    def __init__(self):
        test_env = "prod"
        self.v2exapi = V2exapi(test_env)
        self.login_page = LoginPage(test_env)

    def set_up(self):
        """ 每个case执行前执行此方法 """
        pass

    def tear_down(self):
        """ 每个case执行后执行此方法 """
        pass

    def test_login(self):
        """V2EX登陆测试1"""
        '''上面写什么名字就显示什么名字'''
        logger = utils.arbiter_logger.log(__name__)
        logger.info("登陆")
        post_ids = self.login_page.get_login_params()
        username_key = post_ids['username']
        pwd_key = post_ids['pwd']
        once_value = post_ids['once']
        data = {username_key: 'testerzz', pwd_key: '987654321', 'once': once_value}
        login_res = self.v2exapi.发送登录请求(data)
        assert not "", "出现以下错误:\n".join("")
