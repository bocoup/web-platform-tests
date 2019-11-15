// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:size.attributes.parse.whitespace
// Description:Parsing of non-negative integers
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Parsing of non-negative integers");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

offscreenCanvas.width = '	100';
offscreenCanvas.height = '	100';
_assertSame(offscreenCanvas.width, 100, "offscreenCanvas.width", "100");
_assertSame(offscreenCanvas.height, 100, "offscreenCanvas.height", "100");

});
done();
