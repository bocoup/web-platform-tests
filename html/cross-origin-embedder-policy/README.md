See `../cross-origin-opener-policy/README.md`.

## Reporting

### Existing tests ###

- cache-storage-reporting-dedicated-worker.https.html
- cache-storage-reporting-document.https.html
- cache-storage-reporting-service-worker.https.html
- cache-storage-reporting-shared-worker.https.html
- reporting-navigation.https.html
- reporting-subresource-corp.https.html
- reporting-to-endpoint.https.html
- reporting-to-owner.https.html

### Testing plan ###

- test multiple values with COEPRO
- test "relevant settings object" is the right one

https://html.spec.whatwg.org/multipage/origin.html#embedder-policy-checks

"check a navigation response's adherence to its embedder policy"
-> https://html.spec.whatwg.org/multipage/browsing-the-web.html#navigating-across-documents:check-a-navigation-response's-adherence-to-its-embedder-policy

-> "Otherwise, if the result of Should navigation response to navigation request of type in target be blocked by Content Security Policy? given navigationParams's request, response, navigationType, and browsingContext is "Blocked", then set failure to true. [CSP]"
  - test that a CSP failure doesn't give a COEP report.

-> "Otherwise, if the result of checking a navigation response's adherence to `X-Frame-Options` given response, browsingContext, and navigationParams's origin is false, then set failure to true."
  - test that X-Frame-Options check happens after COEP check (expect a COEP report) (is this order of checks intentional?)

"check a global object's embedder policy"
-> https://html.spec.whatwg.org/multipage/workers.html#worker-processing-model:check-a-global-object's-embedder-policy

Run a Worker and SharedWorker.
-> "If response's url's scheme is a local scheme, then set worker global scope's embedder policy to owner's embedder policy."
  - test that "about" (is it testable?), "blob", and "data" inherit owner's embedder policy, and that other schemes don't.

-> "If worker global scope's embedder policy is "require-corp" and is shared is true, then set agent's agent cluster's cross-origin isolation mode to "logical" or "concrete". The one chosen is implementation-defined."
  - "is shared" means it's a SharedWorker and not a Worker. So dedicated worker don't get cross-origin isolation mode changed. Test with .crossOriginIsolated ?

-> "If is shared is false and response's url's scheme is "data", then set worker global scope's cross-origin isolated capability to false."
  - dedicated worker with data: URL should have .crossOriginIsolated === false.

- test that type (note: different from "report type") is "worker initialization"

- test that blockedURL trims username, password, fragment.


https://w3c.github.io/ServiceWorker/

How does this spec use embedder policy? Does it cause COEP reports to be sent?
