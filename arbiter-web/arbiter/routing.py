from channels.routing import route, include

from .core import consumers
from .core.routing import case_manager_routing

routing = [
    # You can use a string import path as the first argument as well.
    include(case_manager_routing, path=r"^/arbiter"),
]