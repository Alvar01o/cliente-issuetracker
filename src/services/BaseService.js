const PropertiesReader = require('properties-reader');
const config = PropertiesReader('src/config/config.properties');
const cache  =  require("./memcache"); 

const utils  = {
    checkBodyAndCache(error ,response , callback ,options) {
        if(typeof response == 'undefined') {
            callback(error ,{"message":"Error al recibir pedido"});
        }

        if(typeof response.body == 'undefined') {
            callback(error ,{"message":"Error al recibir pedido."});
        }

        if(options.store) {
            if(response.body[options.type] == undefined) {
                console.log('No se especifico tipo de cache');
            } else {
                response.body[options.type].forEach(function(algo) {
                    console.log("STORING " + JSON.stringify(algo));
                    options.base.cache.add(options.base.config.get("cache_key") + "_"+options.type+"_"+ algo.id , algo, options.base.config.get("cache_timeout") , function(err){
                    });
                })    
            }
        }
        callback(error ,response);
    }
  
}

module.exports = { cache: cache, config :config , utils:utils}