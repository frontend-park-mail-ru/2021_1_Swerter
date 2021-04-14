const Observable = {

  bind(event, callback) {
    if (!this.listeners) this.listeners = {};
    if (!this.listeners[event]) {
      this.listeners[event] = [callback];
      return;
    }
    this.listeners[event].push(callback);
  },

  off(event, callback) {
    this.listeners[event] = this.listeners[event]
        .filter(function(listener) {
          return listener !== callback;
        });
  },

  emit(event, data) {
    this.listeners[event].forEach((listener)=>{
      listener(data);
    });
  },
};

export default function makeObservable(classObj) {
  Object.assign(classObj.prototype, Observable);
}
