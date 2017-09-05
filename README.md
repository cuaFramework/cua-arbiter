# interface test with python
用python实现的测试网页，对接口&网页进行测试

需要
mysql存储用户信息
redis保证实时websocket
monogodb保存日志
![Image text](https://github.com/shimine/cua-arbiter/blob/master/doc/import.gif)
![Image text](https://github.com/shimine/cua-arbiter/blob/master/doc/demo.gif)

部署步骤：

1.clone code
2.进入到 arbiter-web/ cd arbiter-web
3.安装依赖文件 pip install -r requirements.txt
4.安装好mysql redis，在setting.py中修改成相对应的配置属性
5.修改运行时选项，设置 manage.py路径，脚本命令为runserver
6.或直接使用 python manage.py　runserver
