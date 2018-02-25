import os

from django.apps import AppConfig


class CaseManagerConfig(AppConfig):
    name = 'arbiter'

    def ready(self):
        case_base_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
                                      "arbiter-cases")
        case_path = os.getenv("CASEPATH")
        case_base_path = os.path.join(case_base_path, case_path.split('/')[0])
        case_base_path = case_base_path.replace("\\", "/")
        os.environ["PYTHONPATH"] = case_base_path
        os.putenv("PYTHONPATH", case_base_path)
        from arbiter.models import Git_Info
        from arbiter.core.models import CaseList
        from arbiter.models import Case_List
        try:
            if Git_Info.objects.count() > 0:
                git_info = Git_Info.objects.all().first()
                os.environ['GIT_USERNAME'] = git_info.user_name
                os.environ['GIT_PASSWORD'] = git_info.password
            case_list = Case_List.objects.get()
            case_list.name = "arbiter_cases"
            case_list.data = CaseList.getList()
            case_list.save()
        except:
            pass
        os.environ['GIT_ASKPASS'] = os.path.join(
            os.path.join(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'core'), 'util'),
            'askpass.py')
