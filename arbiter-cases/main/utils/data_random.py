# -*- coding: utf-8 -*-
""" 
   生成随机数据 
"""
import rstr
import random
from datetime import date
from datetime import timedelta


def create_phone():
    """" 随机手机号 """
    return rstr.xeger(r'1[3-9]\d{9}')


def create_phone_list(num, fun=None):
    """" 不重复的手机号列表 
         num:需要生成的手机号个数
    """
    return create_data_list(num, create_phone, fun)


def create_id_code():
    """ 生成随机的身份证号码
    """
    global code_list
    code_list = []
    if not code_list:
        get_district_code()
    id = code_list[random.randint(0, len(code_list))]['code']  # 地区项
    id = id + str(random.randint(1900, int(date.today().strftime('%Y'))))  # 年份项
    da = date.today() + timedelta(days=random.randint(1, 366))  # 月份和日期项
    id = id + da.strftime('%m%d')
    id = id + str(random.randint(100, 300))  # ，顺序号简单处理
    i = 0
    count = 0
    weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]  # 权重项
    check_code = {'0': '1', '1': '0', '2': 'X', '3': '9', '4': '8', '5': '7', '6': '6', '7': '5', '8': '5', '9': '3',
                  '10': '2'}  # 校验码映射
    for i in range(0, len(id)):
        count = count + int(id[i]) * weight[i]
    id = id + check_code[str(count % 11)]  # 算出校验码
    return id


def create_id_code_list(num, fun=None):
    """
    随机身份账号列表
    """
    return create_data_list(num, create_id_code, fun)


def get_district_code():
    """
    获取地区码
    """
    from config.config import DISTRICT_CODE_PATH

    with open(DISTRICT_CODE_PATH,encoding='utf-8') as file:
        data = file.read()
        district_list = data.split('\n')
    for node in district_list:
        # print(node)
        if node[10:11] != ' ':
            state = node[10:].strip()
        if node[10:11] == ' ' and node[12:13] != ' ':
            city = node[12:].strip()
        if node[10:11] == ' ' and node[12:13] == ' ':
            district = node[14:].strip()
            code = node[0:6]
            code_list.append({"state": state, "city": city, "district": district, "code": code})


def create_data_list(num, create_item=None, fun=None):
    """
    不重复的数据列表
    """
    data_list = []
    if create_item is None:
        return data_list
    if fun is None:
        def fun(x): return x
    while num:
        item = fun(create_item())
        if item in data_list:
            continue
        data_list.append(item)
        num -= 1
    return data_list

if __name__ == '__main__':
    lst = list('ABeeE11122134453645756967')
    # print(list(set(lst)))

    print("手机号列表：")
    print(create_phone_list(10))
    print("身份证列表：")
    print(create_id_code_list(5))
