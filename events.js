module.exports = (() => {
    "use strict";

    let eventWithCallbacks = new Map();

    function setEventCallback(eventName, callback, scope) {

        if (eventWithCallbacks.has(eventName)) {
            let callbacks = eventWithCallbacks.get(eventName);
            callbacks.set(callback.toString(), callback);
            eventWithCallbacks.set(eventName, callbacks);
        }
        else {
            let callbacks = new Map();
            callbacks.set(callback.toString(), callback);
            eventWithCallbacks.set(eventName, callbacks);
        }

        return callback;
    }
    function removeEventCallback(eventName, callback) {

        let callbacks = eventWithCallbacks.get(eventName);
        if (callback === undefined) {
            callbacks.clear();
            eventWithCallbacks.set(eventName, callbacks);
            return;
        }

        callbacks.delete(callback.toString());
        eventWithCallbacks.set(eventName, callbacks);
    }

    function triggerEvent(eventName, parameters) {
        let callbacks = eventWithCallbacks.get(eventName);
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
