

module.exports = (() => {
    "use strict";
    let eventName;

    let eventWithCallbacks = {
        eventName: eventName,
        callbacks: new Map()
    };

    function setEventCallback(eventName, callback, scope) {
        eventWithCallbacks.eventName = eventName;
        eventWithCallbacks.callbacks.set(callback.toString(), callback)

        return callback;
    }
    function removeEventCallback(eventName, callback) {
        if (callback === undefined) {
            eventWithCallbacks.callbacks.clear();
            return;
        }
        eventWithCallbacks.callbacks.delete(callback.toString());
    }

    function triggerEvent(eventName, parameters) {
        for (let callback of eventWithCallbacks.callbacks.values()) {
            callback.call(this, parameters);
        }
    }

    return {
        on: setEventCallback,
        off: removeEventCallback,
        trigger: triggerEvent
    };

})();
