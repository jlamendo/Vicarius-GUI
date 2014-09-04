// serverSettings Model - server-settings.js
var AmpModel = require('ampersand-model');



var general = AmpModel.extend({
    props: {
        maxBytesUnknownType: ['string'],
        dataDir: ['string'],
        textContentTypes: ['array'],
        binContentTypes: ['array']
    }
});

var API = AmpModel.extend({
    props: {
        host: ['string'],
        port: ['string']
    }
});


var IDE = AmpModel.extend({
    props: {
        host: ['string'],
        port: ['string']
    }
})


var GUI = AmpModel.extend({
    props: {
        host: ['string'],
        port: ['string']
    }
});

var DB = AmpModel.extend({
    props: {
        host: ['string'],
        port: ['string']
    }
});


var session = AmpModel.extend({
        props: {
            project: ['string'],
            selectedItem: ['string'],
            profile: ['string'],
        }
    });

var user = AmpModel.extend({
        props: {
            username: ['string'],
            authToken: ['string'],
            projects: ['array'],
            profiles: ['array'],
        },
        children: {
            session: session,
        }
    });



module.exports = AmpModel.extend({
    props: {
        id: ['string'],
        firstRun: ['string'],
    },
    children: {
        general: general,
        API: API,
        IDE: IDE,
        GUI: GUI,
        DB: DB,
        user: user
    },
});
