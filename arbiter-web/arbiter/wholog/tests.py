from django.test import TestCase
import datetime,time
# Create your tests here.
from django.test import TestCase
from arbiter.common import utils
# Create your tests here.
class Test():
    def test_test(self):
        log_id = utils.generate_id()
        print(log_id)
    def test_time(self):
        t1 = time.time()
        print(t1)
        print(t1*10000000)

