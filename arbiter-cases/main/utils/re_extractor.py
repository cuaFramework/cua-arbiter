# -*- coding: utf-8 -*-
"""
    正则提取器
"""

import re


def extract(pattern, string, index=1):
    """ 正则匹配出相应的值,默认取第一个匹配的值 """
    search_obj = re.search(pattern=pattern, string=string)
    return search_obj.group(index) if search_obj else None

if __name__ == '__main__':
    test = 'testsdg:"id":"1231234",dgdfg '
    print(extract(r'"id":"(\d+)",', test))