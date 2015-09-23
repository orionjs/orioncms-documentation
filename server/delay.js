Meteor.startup(function() {
  var rootUrl = process.env.ROOT_URL;
  if (rootUrl !== 'http://localhost:3000/') {
    return;
  } else {
    console.log('Delaying publications...');
  }

  _.keys(Meteor.server.publish_handlers).map(function(key) {
    var func = Meteor.server.publish_handlers[key];
    Meteor.server.publish_handlers[key] = function() {
      this.unblock();
      Meteor._sleepForMs(500);
      return func.apply(this, arguments);
    };
  });

  Meteor.server.universal_publish_handlers = Meteor.server.universal_publish_handlers.map(function(func) {
    return function() {
      this.unblock();
      Meteor._sleepForMs(500);
      return func.apply(this, arguments);
    };
  });
});
