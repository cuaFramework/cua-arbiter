from channels.routing import route, include

from .core import consumers
from .core.routing import casemanager_routing

routing = [
    # You can use a string import path as the first argument as well.
    include(casemanager_routing, path=r"^/arbiter"),
]