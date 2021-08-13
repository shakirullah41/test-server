/**
 * User model events
 */

var { EventEmitter } = require("events");
var modelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
modelEvents.setMaxListeners(0);

// Model events
var events = {
  save: "save",
  remove: "remove",
};

// Register the event emitter to the model events
function registerEvents(User) {
  for (var e in events) {
    let event = events[e];
    User.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    modelEvents.emit(`${event}:${doc._id}`, doc);
    modelEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = modelEvents;
