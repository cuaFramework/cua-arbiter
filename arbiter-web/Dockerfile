FROM python:3.6.2-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk add --no-cache postgresql-dev libffi-dev gcc musl-dev libxml2-dev libxslt-dev git bash
WORKDIR /usr/src/app
COPY . .
RUN gcc -shared -fPIC stack-fix.c -o stack-fix.so
ENV LD_PRELOAD = /usr/src/app/stack-fix.so
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn
#RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000:8000

CMD sh docker_start.sh