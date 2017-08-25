# -*- coding: utf-8 -*-
"""
    日志模块
"""

import os
import logging
from config.config import LOG_DIR


def log(mod_name):
    """ create  logger """
    logger = logging.getLogger(mod_name)
    logger.setLevel(level=logging.INFO)
    handler = logging.FileHandler(os.path.join(LOG_DIR, "log.txt"))
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - [%(message)s] - at %(name)s.%(funcName)s(%(filename)s:%(lineno)d)")
    handler.setFormatter(formatter)

    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    console.setFormatter(formatter)
    logger.addHandler(handler)
    logger.addHandler(console)
    logger.info("log_begin")
    return logger

def create_logger():
    """ create logger """
    logger = logging.getLogger(__name__)
    logger.setLevel(level=logging.INFO)
    handler = logging.FileHandler(os.path.join(LOG_DIR, "log.txt"))
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - [%(message)s] - at %(name)s.%(funcName)s(%(filename)s:%(lineno)d)")
    handler.setFormatter(formatter)

    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    console.setFormatter(formatter)
    logger.addHandler(handler)
    logger.addHandler(console)
    return logger

LOGGER = create_logger()