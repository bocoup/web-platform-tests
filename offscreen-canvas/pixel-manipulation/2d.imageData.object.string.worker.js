// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.object.string
// Description:ImageData.data converts strings to numbers with ToNumber
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("ImageData.data converts strings to numbers with ToNumber");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

var imgdata = ctx.getImageData(0, 0, 10, 10);
imgdata.data[0] = 100;
imgdata.data[0] = "110";
_assertSame(imgdata.data[0], 110, "imgdata.data[\""+(0)+"\"]", "110");
imgdata.data[0] = 100;
imgdata.data[0] = "0x78";
_assertSame(imgdata.data[0], 120, "imgdata.data[\""+(0)+"\"]", "120");
imgdata.data[0] = 100;
imgdata.data[0] = " +130e0 ";
_assertSame(imgdata.data[0], 130, "imgdata.data[\""+(0)+"\"]", "130");

});
done();
