// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.transformation.basic
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

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.translate(-100, 0);
ctx.rect(100, 0, 100, 50);
ctx.translate(0, -100);
ctx.fillStyle = '#0f0';
ctx.fill();
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

});
done();
