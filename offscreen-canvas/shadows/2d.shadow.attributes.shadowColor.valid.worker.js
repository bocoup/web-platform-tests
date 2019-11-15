// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.attributes.shadowColor.valid
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

ctx.shadowColor = 'lime';
_assertSame(ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");
ctx.shadowColor = 'RGBA(0,255, 0,0)';
_assertSame(ctx.shadowColor, 'rgba(0, 255, 0, 0)', "ctx.shadowColor", "'rgba(0, 255, 0, 0)'");

});
done();
