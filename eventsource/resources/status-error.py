def main(request, response):
  status = (request.GET.first("status", "404"), "HAHAHAHA")
  headers = [("Content-Type", "text/event-stream")]

  # According to RFC7231, HTTP responses bearing status code 204 or 205 must
  # not specify a body.
  if status[0] in ["204", "205"]:
      body = ""
  else:
      body = "data: data\n\n"

  return status, headers, body
