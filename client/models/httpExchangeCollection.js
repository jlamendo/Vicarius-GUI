// httpExchange Collection - http-exchange-collection.js
var AmpCollection = require('ampersand-rest-collection');
var httpExchange = require('./httpExchange');
var BackboneEvents = require('backbone-events-standalone');
var Faye = require('faye');
var _ = require('underscore');
  var fayeClient = new Faye.Client('http://127.0.0.1:8085/faye');

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
        // Great, this is the model we're waiting for!
        this.trigger('found', model);
        this.stopListening();

      } else if(--this._awaitCount === 0) {
        // All the models are done and we haven't found the id we received from the realtime stream
        this.stopListening();
        this.trigger('notfound');
      }
    }
  });


  var LiveCollection = AmpCollection.extend({
    constructor: function(models, options) {
      AmpCollection.prototype.constructor.call(this, models, options);

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

      // Does this id exist in the collection already?
      // If so, rather just do an update
      var id = body[this.model.prototype.idAttribute];
      if(this.get(id)) {
        return this._updateEvent(body);
      }

      // Look to see if this collection has any outstanding creates...
      var idAttribute = this.model.prototype.idAttribute;
      var unsaved = this.filter(function(model) {
        return !model.id;
      });

      // If there are unsaved items, monitor them and if one of them turns out to be the matching object
      // then simply update that
      if(unsaved.length) {

        var listener = new UpdateEventListener(id, unsaved);

        listener.once('notfound', function() {
          this.add(body, { parse: true });
        }, this);

      } else {

        this.add(body, { parse: true });

      }
    },

    _updateEvent: function(body) {
      var id = this._getModelId(body);

      var parsed = new this.model(body, { parse: true });

      // Try find an existing instance with the given ID
      var existingModel = this.get(id);

      // If it exists, update it
      if(existingModel) {
        existingModel.set(parsed.attributes);
      } else {
        // If it doesn't exist, add it
        this.add(parsed);
      }

    },

    _removeEvent: function(body) {

      var id = this._getModelId(body);
      this.remove(id);
    },

    _getModelId: function(model) {
      return model[this.model.prototype.idAttribute];
    }

  });

  // Create our global collection of **Todos**.
module.exports = LiveCollection.extend({
    model: httpExchange,
    url: 'http://127.0.0.1:8085/httpExchange?project=proxyHistory',
    comparator: function (model) {
        return -1 * model.createdAt.valueOf();
    },
    channel: function(){
      return '/' + this.url.split('://')[1].split('/')[1].replace('/', '?').split('?')[0]+ '/proxyHistory'//app.me.config.user.session.project
    },
    sortByIndex: function(direction, key){
      map = {
        'up': -1,
        'down': +1
      }
      this.comparator = function (model) {
        return map[direction] * model[key].valueOf();
    },
    }
});


