console.log('Worker');

// Tizen 5 doesn't work with relative path for some reason
// But sync request works on Tizen 5

function runAsync(name, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        console.log(name, xhr.response);
        self.postMessage({
            name: name,
            success: true
        });
    };
    xhr.onerror = function (e) {
        console.error(name, e);
        self.postMessage({
            name: name,
            success: false
        });
    };
    xhr.send(null);
}

function runSync(name, url) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);

        console.log(name, xhr.response);

        self.postMessage({
            name: name,
            success: true
        });
    } catch (e) {
        self.postMessage({
            name: name,
            success: false
        });
    }
}

self.onmessage = function (e) {
    var msg = e.data;
    (msg.sync ? runSync : runAsync)(msg.name, msg.url);
}
