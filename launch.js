var argv = require('optimist')    
    .usage('Usage: $0 --page "FacebookPageName"\n Example: \n\t$0 --page "cocacola"')
    .demand(['page'])
    .argv;

require("coffee-script");

hubiquitus = require("hubiquitus")
hubiquitus.start({
   actor: "urn:localhost:tracker",
   type: "htracker",
   children: [
       {
           actor: "urn:localhost:gateway",
           type: "hgateway",
           log:{
               logLevel:"info"
           },
           children: [
               {
                   actor: "urn:localhost:auth",
                   type: "hauth"
               }
           ],
           adapters: [ { type: "socket_in"} ],
           properties: {
               socketIOPort: 8080,
               authActor: "urn:localhost:auth",
               authTimeout: 3000
           }
       },
       {
           actor: "urn:localhost:fb",
           type: "fbActor",
           adapters: [{
               type: "fbAdapter",
               properties: {
                  "alert" : "fbAlert",
                  "mode" : "millisecond",
                  "period" : 1000,
                  "page": argv.page
                }
            }]
       }
   ],
   properties:{
       channel: {
           actor: "urn:localhost:trackChannel",
           type: "hchannel",
           properties: {
               subscribers: [],
               db:{
                   host: "localhost",
                   port: 27017,
                   name: "admin"
               },
               collection: "trackChannel"
           }
       }
   },
   adapters: [ { type: "socket_in"} ]
});