console.log('Main');

function getAbsUrl() {
    var platformVersion = tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version').split('.');

    if (parseInt(platformVersion[0], 10) <= 3) {
        return 'file:///opt/usr/home/owner/apps_rw/GV24KP5ul8/res/wgt/test.data';
    }

    return 'file:///opt/usr/apps/GV24KP5ul8/res/wgt/test.data';
}

function resolveUrl(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, true);
        xhr.onload = function () {
            resolve(xhr.responseURL);
        };
        xhr.onerror = function (e) {
            reject(e);
        };
        xhr.send(null);
    });
}

function runAsync(name, url) {
    var test = document.querySelector('#' + name);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        console.log(name, xhr.response);
        test.classList.add('success');
    };
    xhr.onerror = function (e) {
        console.error(name, e);
        test.classList.add('failed');
    };
    xhr.send(null);
}

function runSync(name, url) {
    var test = document.querySelector('#' + name);

    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);

        console.log(name, xhr.response);

        test.classList.add('success');
    } catch (e) {
        test.classList.add('failed');
    }
}

window.onload = function () {
    var worker = new Worker('worker.js');

    worker.onerror = function (e) {
        console.error('worker error', e);
    };

    worker.onmessage = function (e) {
        var test = document.querySelector('#' + e.data.name);
        if (e.data.success) {
            test.classList.add('success');
        } else {
            test.classList.add('failed');
        }
    }

    runAsync('main1', 'test.data');
    runAsync('main2', getAbsUrl());
    runSync('main3', 'test.data');

    worker.postMessage({
        name: 'worker1',
        url: 'test.data'
    });

    worker.postMessage({
        name: 'worker2',
        url: getAbsUrl()
    });

    worker.postMessage({
        name: 'worker3',
        url: 'test.data',
        sync: true
    });

    resolveUrl('test.data').then(function (url) {
        worker.postMessage({
            name: 'worker4',
            url: url
        });
    });
}
