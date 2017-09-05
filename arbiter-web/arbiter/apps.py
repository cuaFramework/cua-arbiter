import os

from django.apps import AppConfig


class CasemanagerConfig(AppConfig):
    name = 'arbiter'

    def ready(self):
        caseBasePath = os.path.join(

                os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
            "arbiter-cases")
        case_path = os.getenv("CASEPATH")
        caseBasePath = os.path.join(caseBasePath, case_path.split('/')[0])
        caseBasePath = caseBasePath.replace("\\", "/")
        os.environ["PYTHONPATH"] = caseBasePath
        os.putenv("PYTHONPATH", caseBasePath)


