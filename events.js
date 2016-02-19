module.exports = (() => {
    "use strict";

    let events = new Map();

    function setEventCallback(eventName, callback, scope) {

        if (events.has(eventName)) {
            let callbacks = events.get(eventName);
            callbacks.set(callback.toString(), callback);
            events.set(eventName, callbacks);
        }
        else {
            let callbacks = new Map();
            callbacks.set(callback.toString(), callback);
            events.set(eventName, callbacks);
        }

        return callback;
    }
    function removeEventCallback(eventName, callback) {

        let callbacks = events.get(eventName);
        if (callback === undefined) {
            callbacks.clear();
            events.set(eventName, callbacks);
            return;
        }

        callbacks.delete(callback.toString());
        events.set(eventName, callbacks);
    }

    function triggerEvent(eventName, parameters) {
        let callbacks = events.get(eventName);
        for (let callback of callbacks.values()) {
            callback.call(this, parameters);
        }
    }

    return {
        on: setEventCallback,
        off: removeEventCallback,
        trigger: triggerEvent
    };

})();
