// serverSettings Model - server-settings.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
    props: {
        id: ['string'],
        firstRun: ['string'],
    },
    children: {
        general: AmpModel.extend({
            props: {
                maxBytesUnknownType: ['string'],
                dataDir: ['string'],
                textContentTypes: ['array'],
                binContentTypes: ['array']
            }
        }),
        API: AmpModel.extend({
            props: {
                host: ['string'],
                port: ['string']
            }
        }),
        IDE: AmpModel.extend({
            props: {
                host: ['string'],
                port: ['string']
            }
        }),
        DB: AmpModel.extend({
            props: {
                host: ['string'],
                port: ['string']
            }
        }),
        GUI: AmpModel.extend({
            props: {
                host: ['string'],
                port: ['string']
            }
        }),
        user: AmpModel.extend({
            props: {
                username: ['string'],
                authToken: ['string'],
            },
            children: {
                session: AmpModel.extend({
                    props: {
                        project: ['string'],
                        selectedItem: ['string'],
                        profile: ['string']
                    }
                })
            }
        }),
    },
});