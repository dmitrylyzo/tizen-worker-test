console.log('Worker');

var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'test.data', true);
xhr1.onload = function () {
    console.log('load 1');
};
xhr1.onerror = function (e) {
    console.error('error', e);
};
xhr1.send(null);

// Tizen 5 doesn't work with relative path for some reason
var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'file:///opt/usr/apps/GV24KP5ul8/res/wgt/test.data', true);
xhr2.onload = function () {
    console.log('load 2');
};
xhr2.onerror = function (e) {
    console.error('error', e);
};
xhr2.send(null);
