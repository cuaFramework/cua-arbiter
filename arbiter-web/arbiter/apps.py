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
