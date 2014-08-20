// httpExchange Model - http-exchange.js
var AmpModel = require('ampersand-model');
var httpRequest = require('./request.js');
var httpResponse = require('./response.js');

module.exports = AmpModel.extend({
    props: {
        createdBy: ['string'],
        project: ['string'],
        savedAt: ['string'],
        responseLength: ['number'],
        responseTime: ['number'],
        isSelected: ['boolean'],
        host: ['string'],
        responseHTTP: ['string'],
        requestHTTP: ['string'],
        responseLengthText: ['string'],
        referenceId: ['string'],
        responseTimeText: ['string'],
        requestMethod: ['string'],
        requestPath: ['string'],
        responseCode: ['string'],
    },
    children: {
        request: httpRequest,
        response: httpResponse,
    },
    derived: {
        responseRawText: {
            deps: ['response'],
            fn: function(){
                return this.response.rawText;
            }
        },
        requestRawText: {
            deps: ['request'],
            fn: function(){
                return this.request.rawText;
            }
        }
    }
});