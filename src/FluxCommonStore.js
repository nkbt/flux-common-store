import {EventEmitter} from 'events';
import throttle from 'lodash.throttle';

const CHANGE_EVENT = 'change';


const FluxCommonStore = {
  ...EventEmitter.prototype,


  CHANGE_EVENT,


  emitChange(...args) {
    this.emit(CHANGE_EVENT, ...args);
  },


  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
    return () => this.removeChangeListener(callback);
  },


  addThrottledChangeListener(callback, timeout = 200, options = {leading: false, trailing: true}) {
    const throttledCallback = throttle(callback, timeout, options);

    this.on(CHANGE_EVENT, throttledCallback);
    return () => {
      this.removeChangeListener(throttledCallback);
      throttledCallback.cancel();
    };
  },


  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
};

export default FluxCommonStore;
