// response Model - response.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
    props: {
        statusCode: ['number'],
        rawText: ['string'],
        body: ['string'],
        headers: ['object'],
       // cookies: ['array'],
        mimeType: ['string'],
        host: ['string'],
        protocol: ['string'],
        port: ['number'],
        inScope: ['boolean'],
        toolFlag: ['number'],
        messageType: ['string']
    }
});