# -*- coding: utf-8 -*-
"""
    随机字符串
"""

import random
import string


def random_char(y):
    string_model = string.ascii_lowercase+string.digits
    return ''.join(random.choice(string_model) for x in range(y))


if __name__ == '__main__':
    print(random_char(5))

