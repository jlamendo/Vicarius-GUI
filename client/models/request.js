// request Model - request.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
    props: {
        host: ['string'],
        port: ['number'],
        protocol: ['string'],
        url: ['string'],
        path: ['string'],
        httpVersion: ['string'],
        method: ['string'],
        headers: ['object'],
        body: ['string'],
        rawText: ['string'],
        inScope: ['boolean'],
        toolFlag: ['number'],
        messageType: ['string'],
        referenceId: ['string'],
    }
});