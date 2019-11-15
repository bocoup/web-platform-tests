// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.align.invalid
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

ctx.textAlign = 'start';
ctx.textAlign = 'bogus';
_assertSame(ctx.textAlign, 'start', "ctx.textAlign", "'start'");

ctx.textAlign = 'start';
ctx.textAlign = 'END';
_assertSame(ctx.textAlign, 'start', "ctx.textAlign", "'start'");

ctx.textAlign = 'start';
ctx.textAlign = 'end ';
_assertSame(ctx.textAlign, 'start', "ctx.textAlign", "'start'");

ctx.textAlign = 'start';
ctx.textAlign = 'end\0';
_assertSame(ctx.textAlign, 'start', "ctx.textAlign", "'start'");

});
done();
