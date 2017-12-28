from django.contrib.auth.models import User

# 如果没用用户 就新建一个
if User.objects.count() == 0:
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
else:
    print('Admin accounts can only be initialized if no Accounts exist. Now Accounts num is ' + str(
        User.objects.all().count()))
