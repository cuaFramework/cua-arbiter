# interface test with python
用python实现的测试网页，对接口&网页进行测试

需要
mysql存储用户信息
redis保证实时websocket
monogodb保存日志

![Image text](https://github.com/shimine/cua-arbiter/blob/master/doc/pic.png)
![Image text](https://github.com/shimine/cua-arbiter/blob/master/doc/demo.gif)

部署步骤：
1.down code
2.cd arbiter-web
3.pip install -r requirements.txt
4.edit confirgrations python manage.py runserver
5.run,  see localhost:8000