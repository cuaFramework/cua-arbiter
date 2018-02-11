#!/usr/bin/env python
#
# Short & sweet script for use with git clone and fetch credentials.
# Requires GIT_USERNAME and GIT_PASSWORD environment variables,
# intended to be called by Git via GIT_ASKPASS.
#

from sys import argv
from os import environ

if "Username for" in argv[1]:
    print(environ['GIT_USERNAME'])
    exit()

if "Password for" in argv[1]:
    print(environ['GIT_PASSWORD'])
    exit()

exit(1)
