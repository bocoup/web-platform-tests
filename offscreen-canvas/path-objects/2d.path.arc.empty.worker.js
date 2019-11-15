// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.arc.empty
// Description:arc() with an empty path does not draw a straight line to the start point
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("arc() with an empty path does not draw a straight line to the start point");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#0f0';
ctx.fillRect(0, 0, 100, 50);
ctx.lineWidth = 50;
ctx.strokeStyle = '#f00';
ctx.beginPath();
ctx.arc(200, 25, 5, 0, 2*Math.PI, true);
ctx.stroke();
_assertPixel(offscreenCanvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

});
done();
