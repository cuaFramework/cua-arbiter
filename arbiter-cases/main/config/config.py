# -*- coding: utf-8 -*-
"""
    
    公共配置项

"""
import os

# 获取工作目录（main）的绝对路径
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API_DIR = os.path.join(BASE_DIR, 'api')
LOG_DIR = os.path.join(BASE_DIR, 'log')
UTILS_DIR = os.path.join(BASE_DIR, 'utils')
CASE_DIR = os.path.join(BASE_DIR, 'cases')
MODULE_DIR = os.path.join(BASE_DIR, 'module')
TEST_DATA_DIR = os.path.join(BASE_DIR, 'testdata')
RESOURCE_DIR = os.path.join(BASE_DIR, 'resource')

# 默认测试环境
ENV = "prod"

# 环境及API类型列表
ENV_LIST = ["test", "test02", "pre", "prod"]
API_LIST = ["v2exapi" ,"v3exapi"]

# 端口号列表
V2EXAPI_PORT_LIST = [80, 9080, 9080, 443]
V3EXAPI_PORT_LIST = [80, 9080, 9080, 443]

# 端口号配置
PORT = dict(zip(API_LIST,
                [dict(zip(ENV_LIST, V2EXAPI_PORT_LIST)),
                 dict(zip(ENV_LIST, V3EXAPI_PORT_LIST)),
                 ]))

def get_port(api, env):
    """ 根据api及环境类型获取对应的端口号 """
    if env not in ENV_LIST:
        raise TypeError("env error: " + env)
    if api not in API_LIST:
        raise TypeError("api error: " + api)

    return PORT[api][env]


if __name__ == '__main__':
    print("环境参数配置：")
    print(PORT)
