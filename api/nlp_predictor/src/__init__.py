from .server import ServerLauncher
from .core import classifier
from .utils import EnvLoader

env_loader = EnvLoader("HOST", "PORT")

launcher = ServerLauncher(
    classifier, 
    env_loader.get("HOST", '0.0.0.0'), 
    int(env_loader.get("PORT", 9000))
)

# Author information for the package
__author__ = "Eric Santos <ericshantos13@gmail.com>"

# Define the modules that will be accessible when the package is imported
__all__ = ["launcher"]

__version__ = "2.0.0"