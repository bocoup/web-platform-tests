// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.align.valid
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
_assertSame(ctx.textAlign, 'start', "ctx.textAlign", "'start'");

ctx.textAlign = 'end';
_assertSame(ctx.textAlign, 'end', "ctx.textAlign", "'end'");

ctx.textAlign = 'left';
_assertSame(ctx.textAlign, 'left', "ctx.textAlign", "'left'");

ctx.textAlign = 'right';
_assertSame(ctx.textAlign, 'right', "ctx.textAlign", "'right'");

ctx.textAlign = 'center';
_assertSame(ctx.textAlign, 'center', "ctx.textAlign", "'center'");

});
done();
