# -*- coding: utf-8 -*-
"""
    http client
"""
import requests
from config import config
from utils.arbiter_logger import LOGGER

DEFAULT_HEADER = {
    "Connection": "keep-alive",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
}


COOKIES = {}

def get_response(req_type="POST", url=None, data=None, headers=DEFAULT_HEADER):
    """ http请求 """
    LOGGER.info(url + " " + str(data) + " " + str(COOKIES))

    try:
        if req_type.upper() == "POST":
            r = requests.post(url=url, data=data, headers=headers, allow_redirects=True, cookies=COOKIES)
        elif req_type.upper() == "GET":
            param_list = []
            for key, value in data.items():
                param_list.append(key + "=" + value)
            r = requests.get(url=url + "?" + "&".join(param_list), data={}, headers=headers, allow_redirects=True, cookies=COOKIES)
        else:
            raise TypeError("http method error")
    except (requests.exceptions.ConnectionError, TypeError) as e:
        LOGGER.error("send request fail " + str(e))
        return None

    if r.status_code == requests.codes.ok:
        # LOGGER.info(r.text)
        # 更新cookies
        if len(r.cookies) != 0:
            COOKIES.update(r.cookies)
        for res in r.history:
            if len(res.cookies) != 0:
                COOKIES.update(res.cookies)

        return r.text
    else:
        LOGGER.error("status code " + str(r.status_code))
        return None


def get_response_common(api_type="aapi", env="test", req_type="GET", host="", url="", data={}):
    """ 通用获取respose接口 """

    host = host.replace("${env_url}", env)
    port = config.get_port(api_type, env)
    if port==443:
        host = 'https://'+host
    else:
        host = 'http://' + host
    url = host + ":" + str(port) + url

    return get_response(req_type=req_type, url=url, data=data)




