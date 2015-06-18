import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';


export default Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },


  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
    return () => this.removeChangeListener(callback);
  },


  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}, {CHANGE_EVENT});
