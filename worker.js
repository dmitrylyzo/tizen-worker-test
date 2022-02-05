console.log('Worker');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'test.data', true);
xhr.onload = function () {
    console.log('load');
};
xhr.onerror = function (e) {
    console.error('error', e);
};
xhr.send(null);
