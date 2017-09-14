#FROM python:latest
#
#WORKDIR /usr/src/app
#COPY requirements.txt ./
#RUN pip install --no-cache-dir -r requirements.txt
#COPY . .

FROM cua-arbiter-img:latest

ENV DJANGO_SU_NAME=admin
ENV DJANGO_SU_EMAIL=admin@my.company
ENV DJANGO_SU_PASSWORD=admin
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000:8000
CMD sh docker_start.sh