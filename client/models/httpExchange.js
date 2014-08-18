// httpExchange Model - http-exchange.js
var AmpModel = require('ampersand-model');
var httpRequest = require('./request.js');
var httpResponse = require('./response.js');
var getBytesWithUnit = function(bytes) {
    sep = '';
    if (isNaN(bytes)) {
        return;
    }
    var units = [' B', ' Kb', ' Mb', ' Gb', ' Tb', ' Pb', ' Eb', ' Zb', ' Yb'];
    var amountOf2s = Math.floor(Math.log(+bytes) / Math.log(2));
    if (amountOf2s < 1) {
        amountOf2s = 0;
    }
    var i = Math.floor(amountOf2s / 10);
    if (i===0){
        i=1
    };
    bytes = +bytes / Math.pow(2, 10 * i);

    // Rounds to 3 decimals places.
        bytes = bytes.toPrecision(3);
        decLength = bytes.toString().split('.')[1];
        decLength = (decLength)? decLength.length : 0;
        wholeLength = bytes.toString().split('.')[0].length;
        if(decLength+wholeLength !== 4 && (decLength+wholeLength <=5)){
            padding = new Array(5-(decLength+wholeLength)).join('0');
            if(decLength>0){
                bytes = bytes + padding;
            } else {
                bytes = bytes + '.'+padding;
            }
        }

    return bytes + units[i];
};
var hashCode = function(input) {
    var hash = 0,
        i, chr, len;
    if (input.length == 0) return hash;
    for (i = 0, len = input.length; i < len; i++) {
        chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
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
        isSelected: ['boolean'],
    },
    children: {
        request: httpRequest,
        response: httpResponse,
    },
    derived: {
        host: {
            deps: ['request'],
            fn: function() {
                return this.request.host;
            }
        },
        responseHTTP: {
            deps: ['response'],
            fn: function() {
                return this.response.rawText.match(/([\s\S]*Content-Length: [\d]*\s\s)([\s\S]*)/)[0]
            }
        },
        requestHTTP: {
            deps: ['request'],
            fn: function() {
                return this.request.rawText.match(/([\s\S]*Content-Length: [\d]*\s\s)([\s\S]*)/)[0]
            }
        },
        responseLengthText: {
            deps: ['responseLength'],
            fn: function() {
                return getBytesWithUnit(this.responseLength)
            }
        },
        elementId: {
            deps: ['responseTime, savedAt'],
            fn: function() {
                return hashCode(this.responseTime + this.savedAt);
            }
        },
        responseTimeText: {
            deps: ['responseTime'],
            fn: function() {
                return String((parseInt(this.responseTime) * 1.0e-6).toFixed(4)).substring(0,6) + ' ms';
            }
        },
        requestMethod: {
            deps: ['request'],
            fn: function() {
                return this.request.method;
            }
        },
        requestPath: {
            deps: ['request'],
            fn: function() {
                if (this.request.path) {
                    return this.request.path.replace(/(=|\?).*/, '');
                } else {
                    return '/'
                }
            }
        },
        responseCode: {
            deps: ['response'],
            fn: function() {
                return this.response.statusCode;
            }
        },
        responseRawText: {
            deps: ['response'],
            fn: function() {
                return this.response.rawText;
            }
        },
        requestRawText: {
            deps: ['request'],
            fn: function() {
                return this.request.rawText;
            }
        },
    }
});