// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.gradient.object.invalidoffset
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
assert_throws("INDEX_SIZE_ERR", function() { g.addColorStop(-1, '#000'); });
assert_throws("INDEX_SIZE_ERR", function() { g.addColorStop(2, '#000'); });
assert_throws(new TypeError(), function() { g.addColorStop(Infinity, '#000'); });
assert_throws(new TypeError(), function() { g.addColorStop(-Infinity, '#000'); });
assert_throws(new TypeError(), function() { g.addColorStop(NaN, '#000'); });

});
done();
