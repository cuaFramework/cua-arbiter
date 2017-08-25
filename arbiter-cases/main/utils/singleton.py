# -*- coding: utf-8 -*-
"""
    单例装饰器，实现相同的类、相同的参数时都使用同一个实例
"""
from collections import OrderedDict


def singleton(cls):
    """" singleton """
    instances = {}

    def get_instance(*args, **kwargs):
        key = (cls, args, tuple(OrderedDict(kwargs).items()))
        print(key)
        if key not in instances:
            instances[key] = cls(*args, **kwargs)
        return instances[key]
    return get_instance


if __name__ == "__main__":
    # 使用singleton的情况
    @singleton
    class TestClass(object):
        def __init__(self, test, test1):
            self.test = test
            self.test1 = test1

        def print_test(self):
            print(self.test, self.test1)

    class1 = TestClass(1, test1=1)
    class2 = TestClass(1, test1=1)
    print(class1, class2)
    print(id(class1) == id(class2))
    print(class1 is class2)
    class1.print_test()
    class2.print_test()

    # 不使用singleton的情况
    from api import v2exapi
    aapi1 = v2exapi.Aapi("1")
    aapi2 = v2exapi.Aapi("1")
    print(aapi1, aapi2)
    print(id(aapi1) == id(aapi2))
    # print(id(aapi.Aapi("1")) == id(aapi.Aapi("2")))
    print(aapi1 is aapi2)
