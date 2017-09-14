#!/bin/sh
python ./manage.py makemigrations arbiter&& python ./manage.py migrate && python ./manage.py shell < initadmin.py && python ./manage.py runserver 0.0.0.0:8000