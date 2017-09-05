from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from arbiter.common import utils
# Create your tests here.
class Test():
    def test_test(self):
        log_id = utils.generate_id()
        print(log_id)
