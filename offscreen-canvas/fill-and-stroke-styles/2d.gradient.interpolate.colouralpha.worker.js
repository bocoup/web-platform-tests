// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.interpolate.colouralpha
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

var g = ctx.createLinearGradient(0, 0, 100, 0);
g.addColorStop(0, 'rgba(255,255,0, 0)');
g.addColorStop(1, 'rgba(0,0,255, 1)');
ctx.fillStyle = g;
ctx.fillRect(0, 0, 100, 50);
_assertPixelApprox(offscreenCanvas, 25,25, 190,190,65,65, "25,25", "190,190,65,65", 3);
_assertPixelApprox(offscreenCanvas, 50,25, 126,126,128,128, "50,25", "126,126,128,128", 3);
_assertPixelApprox(offscreenCanvas, 75,25, 62,62,192,192, "75,25", "62,62,192,192", 3);

});
done();
