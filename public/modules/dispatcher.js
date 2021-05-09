import { fatal } from "./errors.js";

class Dispatcher {
    constructor() {
        this._callbacks = {};
        this._isHandled = {};
        this._isPending = {};

        this._prefix = 'ID_';
        this._lastId = 1;

        this._isDispatching = false;
        this._pendingAction = null;
    }

    register(callback) {
        const id = this._prefix + this._lastId++;
        this._callbacks[id] = callback;

        return id;
    }

    unregister(id) {
        if (!this._callbacks[id]) {
            fatal(`Dispatcher.unregister(): ${id} does not map to a registered callback.`);
        }

        delete this._callbacks[id];
    }

    waitFor(ids) {
        if (!this._isDispatching) {
            fatal('Dispatcher.waitFor(): Must be invoked while dispatching');
        }

        ids.forEach(id => {
            if (this._isPending[id]) {
                if (!this._isHandled[id]) {
                    fatal(`Dispatcher.waitFor(): Circular dependency detected while waiting for ${id}.`);
                }
                return;
            }

            if (!this._callbacks[id]) {
                fatal(`Dispatcher.waitFor(): ${id} does not map to a registered callback.`)
            }

            this._invokeCallback(id);
        });
    }

    dispatch(action) {
        if (this._isDispatching) {
            fatal('Dispatch.dispatch(): Already dispatching.')
        }

        this._startDispatching(action);
        try {
            for (const id in this._callbacks) {
                if (!this._isPending[id]) {
                    this._invokeCallback(id);
                }
            }
        } finally {
            this._stopDispatching();
        }
    }

    isDispatching() {
        return this._isDispatching;
    }

    _invokeCallback(id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingAction);
        this._isHandled[id] = true;
    }

    _startDispatching(action) {
        for (const id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }

        this._pendingAction = action;
        this._isDispatching = true;
    }

    _stopDispatching() {
        delete this._pendingAction;
        this._isDispatching = false;
    };
}

const dispatcher = new Dispatcher();

export default dispatcher;
