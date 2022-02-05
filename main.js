console.log('Main');

var worker = new Worker('worker.js');

worker.onerror = function (e) {
    console.error('worker error', e);
};
