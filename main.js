console.log('Main');

var worker = new Worker('worker.js');

worker.onerror = function (e) {
    console.error('worker error', e);
};

var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'test.data', true);
xhr1.onload = function () {
    console.log('main load 1', xhr1.response);
};
xhr1.onerror = function (e) {
    console.error('main error', e);
};
xhr1.send(null);

var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'file:///opt/usr/apps/GV24KP5ul8/res/wgt/test.data', true);
xhr2.onload = function () {
    console.log('main load 2', xhr2.response);
};
xhr2.onerror = function (e) {
    console.error('main error', e);
};
xhr2.send(null);

var xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'test.data', false);
xhr3.send(null);
console.log('main load 3', xhr3.response);
