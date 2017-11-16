![Image text](https://github.com/shimine/cua-arbiter/blob/master/doc/import.gif)
## arbiter是什么
- python实现的web IDE，可以导入&编辑脚本工程，进行测试执行和编辑的操作
- 可以对测试日志进行查询和统计

## 依赖环境
- postgresql存储用户信息
- redis保证实时websocket
- elk保存日志

## 部署步骤：
1. clone code
2. 进入到 arbiter-web/ cd arbiter-web
3. 安装依赖文件 pip install -r requirements.txt
4. 安装好postgresql redis elk。在config.py中修改成相对应的配置属性
5. 修改运行时选项，设置 manage.py路径，脚本命令为runserver
6. 或直接使用 python manage.py　runserver

## 浏览器支持
- chrome 60+
- firefox 55+