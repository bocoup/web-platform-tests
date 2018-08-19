try:
    from importlib import reload
except ImportError:
    pass
import json
import os
try:
    import Queue as queue
except ImportError:
    import queue
import tempfile
import threading

import pytest

from . import serve
from wptserve import logger


class StubServerProc(serve.ServerProc):
    instances = None

    def __init__(self, *args, **kwargs):
        super(StubServerProc, self).__init__(*args, **kwargs)

        if StubServerProc.instances is not None:
            StubServerProc.instances.put(self)

serve.ServerProc = StubServerProc

@pytest.fixture()
def server_subprocesses():
    StubServerProc.instances = queue.Queue()
    yield StubServerProc.instances
    StubServerProc.instances = None

@pytest.fixture()
def tempfile_name():
    name = tempfile.mkstemp()[1]
    yield name
    os.remove(name)


def test_subprocess_exit(server_subprocesses, tempfile_name):
    timeout = 30

    def target():
        # By default, the server initially creates a child to validate local
        # system configuration. That process is unrelated to the behavior under
        # test, but at the time of this writing, it uses the same constructor
        # that is also used to create the long-running processes which are
        # relevant to this functionality. Disable the check so that the
        # constructor is only used to create relevant processes.
        with open(tempfile_name, 'w') as handle:
            json.dump({"check_subdomains": False}, handle)

        # The `logger` module from the wptserver package uses a singleton
        # pattern which resists testing. In order to avoid conflicting with
        # other tests which rely ono that module, Pre-existing state should be
        # discared through an explicit "reload" operation.
        reload(logger)

        serve.run(config_path=tempfile_name)

    thread = threading.Thread(target=target)

    thread.start()

    server_subprocesses.get(True, timeout)
    subprocess = server_subprocesses.get(True, timeout)
    subprocess.kill()

    thread.join(timeout)

    assert not thread.is_alive()
