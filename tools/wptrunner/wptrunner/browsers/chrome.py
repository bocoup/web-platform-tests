from .base import Browser, ExecutorBrowser, require_arg
from ..webdriver_server import ChromeDriverServer
from ..executors import executor_kwargs as base_executor_kwargs
from ..executors.executorwebdriver import (WebDriverTestharnessExecutor) # noqa: F401
from ..executors.executorcdp import CDPRefTestExecutor # noqa: F401
from ..executors.executorchrome import ChromeDriverWdspecExecutor # noqa: F401


__wptrunner__ = {"product": "chrome",
                 "check_args": "check_args",
                 "browser": "ChromeBrowser",
                 "executor": {"testharness": "WebDriverTestharnessExecutor",
                              "reftest": "CDPRefTestExecutor",
                              "wdspec": "ChromeDriverWdspecExecutor"},
                 "browser_kwargs": "browser_kwargs",
                 "executor_kwargs": "executor_kwargs",
                 "env_extras": "env_extras",
                 "env_options": "env_options"}


def check_args(**kwargs):
    require_arg(kwargs, "webdriver_binary")


def browser_kwargs(test_type, run_info_data, config, **kwargs):
    return {"binary": kwargs["binary"],
            "webdriver_binary": kwargs["webdriver_binary"],
            "webdriver_args": kwargs.get("webdriver_args")}


def executor_kwargs(test_type, server_config, cache_manager, run_info_data,
                    **kwargs):
    executor_kwargs = base_executor_kwargs(test_type, server_config,
                                           cache_manager, run_info_data,
                                           **kwargs)
    executor_kwargs["close_after_done"] = True

    capabilities = {
        "browserName": "chrome",
        "platform": "ANY",
        "version": "",
        "goog:chromeOptions": {
            "prefs": {
                "profile": {
                    "default_content_setting_values": {
                        "popups": 1
                    }
                }
            },
            "w3c": True
        }
    }

    for (kwarg, capability) in [("binary", "binary"), ("binary_args", "args")]:
        if kwargs[kwarg] is not None:
            capabilities["goog:chromeOptions"][capability] = kwargs[kwarg]

    if kwargs["headless"]:
        if "args" not in capabilities["goog:chromeOptions"]:
            capabilities["goog:chromeOptions"]["args"] = []
        if "--headless" not in capabilities["goog:chromeOptions"]["args"]:
            capabilities["goog:chromeOptions"]["args"].append("--headless")

    if test_type == "testharness":
        capabilities["goog:chromeOptions"]["useAutomationExtension"] = False
        capabilities["goog:chromeOptions"]["excludeSwitches"] = ["enable-automation"]

    executor_kwargs["capabilities"] = capabilities

    return executor_kwargs


def env_extras(**kwargs):
    return []


def env_options():
    return {}


class ChromeBrowser(Browser):
    """Chrome is backed by chromedriver, which is supplied through
    ``wptrunner.webdriver.ChromeDriverServer``.
    """

    def __init__(self, logger, binary, webdriver_binary="chromedriver",
                 webdriver_args=None):
        """Creates a new representation of Chrome.  The `binary` argument gives
        the browser binary to use for testing."""
        Browser.__init__(self, logger)
        self.binary = binary

    def start(self, **kwargs):
        None

    def stop(self, force=False):
        None

    def pid(self):
        return 0

    def is_alive(self):
        return True

    def cleanup(self):
        None

    def executor_browser(self):
        #import pdb; pdb.set_trace()
        return ExecutorBrowser, {"binary_path": self.binary}
