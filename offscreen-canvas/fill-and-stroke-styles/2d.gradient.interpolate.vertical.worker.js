// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.interpolate.vertical
// Description:
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var g = ctx.createLinearGradient(0, 0, 0, 50);
g.addColorStop(0, '#ff0');
g.addColorStop(1, '#00f');
ctx.fillStyle = g;
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 50,12, 191,191,63,255, "50,12", "191,191,63,255", 10);
_assertPixelApprox(offscreenCanvas, 50,25, 127,127,127,255, "50,25", "127,127,127,255", 5);
_assertPixelApprox(offscreenCanvas, 50,37, 63,63,191,255, "50,37", "63,63,191,255", 10);

});
done();
