# -*- coding: utf-8 -*-
# from utils.arbiter_logger import LOGGER
import utils.arbiter_logger
from api.v2exapi import V2exapi
from bs4 import BeautifulSoup
from config.config import ENV


class LoginPage(object):
    def __init__(self,env='prod'):
        self.v2exapi = V2exapi(env)

    def get_login_params(self, env=ENV):
        logger = utils.arbiter_logger.log(__name__)
        logger.info("获取登陆页面")
        login_page = self.v2exapi.请求登录页面()
        soup = BeautifulSoup(login_page, "lxml")
        login_form = soup.find(action="/signin")
        login_param_lists = login_form.table
        username=''
        pwd = ''
        once = ''
        for param in login_param_lists:
            if not isinstance(param, str):
                keyList = param.contents[1].contents
                if keyList:
                    key = keyList[0]
                else:
                    key = ''

                if key =='用户名':
                    username = param.contents[3].contents[0]['name']
                elif key =='密码':
                    pwd = param.contents[3].contents[0]['name']
                elif key == '':
                    once = param.contents[3].contents[0]['value']
                    break
        return dict(username=username,pwd=pwd,once=once)
                # 断言
                # errors = []
                # logger.info("判断列表长度是否大于0")
                # if len(member_hobby_name) == 0:
                #     errors.append("列表为空")
                # member_hobby_name_contains_str = "闲聊"
                # logger.info("判断列表中是否包含特定名称:" + member_hobby_name_contains_str)
                #
                # if not any(member_hobby_name_contains_str in s for s in member_hobby_name):
                #     errors.append("列表中不包含特定字段:" + member_hobby_name_contains_str)
                # assert not errors, "出现以下错误:\n".join(errors)


if __name__ == "__main__":
    x = LoginPage()
    x.get_login_params()