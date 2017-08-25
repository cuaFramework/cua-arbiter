import os

from django.apps import AppConfig


class CasemanagerConfig(AppConfig):
    name = 'arbiter'

    def ready(self):
        caseBasePath = os.path.join(

                os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
            "arbiter-cases")
        caseBasePath = os.path.join(caseBasePath, "main")
        caseBasePath = caseBasePath.replace("\\", "/")
        os.environ["PYTHONPATH"] = caseBasePath
        os.putenv("PYTHONPATH", caseBasePath)


