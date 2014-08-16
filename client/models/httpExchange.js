// httpExchange Model - http-exchange.js
var AmpModel = require('ampersand-model');
var httpRequest = require('./request.js');
var httpResponse = require('./response.js');
var getBytesWithUnit = function( bytes ){
    if( isNaN( bytes ) ){ return; }
    var units = [ ' ', ' Kb', ' Mb', ' Gb', ' Tb', ' Pb', ' Eb', ' Zb', ' Yb' ];
    var amountOf2s = Math.floor( Math.log( +bytes )/Math.log(2) );
    if( amountOf2s < 1 ){
        amountOf2s = 0;
    }
    var i = Math.floor( amountOf2s / 10 );
    bytes = +bytes / Math.pow( 2, 10*i );

    // Rounds to 3 decimals places.
        if( bytes.toString().length > bytes.toFixed(3).toString().length ){
            bytes = bytes.toFixed(3);
        }
    return bytes + units[i];
};
var hashCode = function(input) {
  var hash = 0, i, chr, len;
  if (input.length == 0) return hash;
  for (i = 0, len = input.length; i < len; i++) {
    chr   = input.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

module.exports = AmpModel.extend({
    props: {
        createdBy: ['string'],
        project: ['string'],
        savedAt: ['string'],
        responseLength: ['number'],
        responseTime: ['number'],
    },
    children: {
        request: httpRequest,
        response: httpResponse,
    },
    derived: {
        responseLengthText: {
            deps: ['responseLength'],
            fn: function () {
                return getBytesWithUnit(this.responseLength)
            }
        },
        elementId: {
            deps: ['responseTime, savedAt'],
            fn: function () {
                return hashCode(this.responseTime + this.savedAt);
            }
        },
        responseTimeText: {
            deps: ['responseTime'],
            fn: function () {
                return parseInt(this.responseTime) * 1.0e-6 + ' ms';
            }
        },
        requestMethod: {
            deps: ['request'],
            fn: function () {
                return this.request.method;
            }
        },
        requestPath: {
            deps: ['request'],
            fn: function () {
                return this.request.path.replace(/(=|\?).*/, '');
            }
        },
        responseCode: {
            deps: ['response'],
            fn: function () {
                return this.response.statusCode;
            }
        },
        responseRawText: {
            deps: ['response'],
            fn: function () {
                return this.response.rawText;
            }
        },
        requestRawText: {
            deps: ['request'],
            fn: function () {
                return this.request.rawText;
            }
        },
    }
});