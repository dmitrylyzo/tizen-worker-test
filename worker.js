console.log('Worker');

var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'test.data', true);
xhr1.onload = function () {
    console.log('worker load 1', xhr1.response);
};
xhr1.onerror = function (e) {
    console.error('worker error', e);
};
xhr1.send(null);

// Tizen 5 doesn't work with relative path for some reason
var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'file:///opt/usr/apps/GV24KP5ul8/res/wgt/test.data', true);
xhr2.onload = function () {
    console.log('worker load 2', xhr2.response);
};
xhr2.onerror = function (e) {
    console.error('worker error', e);
};
xhr2.send(null);

// But sync request works on Tizen 5
var xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'test.data', false);
xhr3.send(null);
console.log('worker load 3', xhr3.response);
