import pytest

from webdriver import Element
from webdriver.transport import Response

from tests.support.asserts import assert_error, assert_success
from tests.support.inline import inline


def element_send_keys(session, element, text):
    return session.transport.send(
        "POST", "/session/{session_id}/element/{element_id}/value".format(
            session_id=session.session_id,
            element_id=element.id),
        {"text": text})


def test_null_parameter_value(session, http):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    path = "/session/{session_id}/element/{element_id}/value".format(
        session_id=session.session_id, element_id=element.id)
    with http.post(path, None) as response:
        assert_error(Response.from_http(response), "invalid argument")


def test_null_response_value(session):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    response = element_send_keys(session, element, "foo")
    value = assert_success(response)
    assert value is None


def test_no_browsing_context(session, closed_window):
    element = Element("foo", session)

    response = element_send_keys(session, element, "foo")
    assert_error(response, "no such window")


@pytest.mark.parametrize("value", [True, None, 1, [], {}])
def test_invalid_text_type(session, value):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    response = element_send_keys(session, element, value)
    assert_error(response, "invalid argument")


def test_stale_element(session):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    session.refresh()

    response = element_send_keys(session, element, "foo")
    assert_error(response, "stale element reference")

def test_cancel(session):
    session.url = inline("")

    session.execute_script("""
        document.body.addEventListener('keydown', function(event) {
            document.body.innerHTML = event.key;
          });
    """)
    element = session.find.css("body", all=False)

    response = element_send_keys(session, element, u"\ue001")
    value = assert_success(response)
    assert value is None

    result = session.execute_script("return document.body.innerHTML;")

    assert result == "Cancel"
