from django.test import TestCase
from arbiter.common import utils
import re


# Create your tests here.
class Test:

    def id_test(self):
        log_id = utils.generate_id()
        print(log_id)

    def spilt_demo(self):
        text = "2017-12-27 10:09:12,655 - INFO - [https://www.v2ex.com:443/signin {} {} " \
               "请求类型:GET 耗时:215.734ms 返回码:200] - at utils.arbiter_logger.get_response(http_client.py:38)"
        t1 = text.split("请求")[1].split("]")[0]
        print(t1)
        result_str = t1.split(" ")
        print(result_str)
        type = result_str[0].split(":")[1]
        time = result_str[1].split(":")[1].split("m")[0]
        code = result_str[2].split(":")[1]

        print("type:"+type+"time:"+time+"code:"+code)

if __name__ == '__main__':
    test = Test()
    result = test.spilt_demo()


