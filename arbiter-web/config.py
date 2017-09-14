arbiter_prod_config = \
    dict(mongodb_host='10.104.104.39',
         mongodb_port=10001,
         redis_url='redis://10.104.104.26:6379/9',
         mysql_host='10.104.104.58',
         mysql_port='3306',
         case_path='caseobj/casesx')

arbiter_docker_config = \
    dict(redis_url='redis://redis:6379/9',
         mysql_host='mysql',
         mysql_port='3306',
         case_path='caseobj/casesx')
