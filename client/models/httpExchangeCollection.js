// httpExchange Collection - http-exchange-collection.js
var AmpCollection = require('ampersand-rest-collection');
var httpExchange = require('./httpExchange');
var BackboneEvents = require('backbone-events-standalone');
var Faye = require('faye');
var _ = require('underscore');
var conf = function(){
    if(window.conf) return window.conf();
    else return window.serverSettingsJSON;
}

  function UpdateEventListener(outstandingId, models) {
    this._outstandingId = outstandingId;
    this._awaitCount = models.length;

    _.each(models, function(model) {
      this.listenToOnce(model, 'sync error', this._onModelSync);
    }, this);
  }
    BackboneEvents.mixin(UpdateEventListener.prototype);
  _.extend(UpdateEventListener.prototype,
    AmpCollection, {
    _onModelSync: function(model) {
      if(model.id === this._outstandingId) {
        this.trigger('found', model);
        this.stopListening();

      } else if(--this._awaitCount === 0) {
        this.stopListening();
        this.trigger('notfound');
      }
    }
  });


  var LiveCollection = AmpCollection.extend({
    constructor: function(models, options) {
      AmpCollection.prototype.constructor.call(this, models, options);

      fayeClient = new Faye.Client('http://' + conf().DB.host + ':' + conf().DB.port + '/faye');
      this.subscription = fayeClient.subscribe(this.channel(), this._fayeEvent, this);
    },

    _fayeEvent: function(message) {
      var method = message.method;
      var body = message.body;

      switch(method) {
        case 'POST':
          this._createEvent(body);
          break;

        case 'PUT':
          this._updateEvent(body);
          break;

        case 'DELETE':
          this._removeEvent(body);
          break;

        default:
          console.log('Unknown realtime event', message);
      }
    },

    _createEvent: function(body) {
      console.log('live: Create event', body);
      return this.add(body, { parse: true, merge: true });
    },

    _updateEvent: function(body) {
       return this.add(body, { parse: true, merge: true });
    },

    _removeEvent: function(body) {
      var id = this._getModelId(body);
      this.remove(id);
    },

  });

  // Create our global collection of **Todos**.
module.exports = LiveCollection.extend({
    model: httpExchange,
    url: 'http://' + conf().DB.host + ':' + conf().DB.port + '/httpExchange?project=' + conf().user.session.project +'&authToken=' + conf().user.authToken,
    comparator: function (model) {
        return -1 * model.savedAt.valueOf();
    },
    channel: function(){
      return '/' + this.url.split('://')[1].split('/')[1].replace('/', '?').split('?')[0]+ '/'+ conf().user.session.project
    },
    sortByIndex: function(direction, key){
      map = {
        'up': -1,
        'down': +1
      }
      this.comparator = function (model) {
        return map[direction] * model[key].valueOf();
    }
    }
});


