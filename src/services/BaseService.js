const PropertiesReader = require('properties-reader');
const config = PropertiesReader('src/config/config.properties');
const cache  =  require("./memcache"); 

const utils  = {
    checkBodyAndCache(error ,response , callback ,options) {
        if(typeof response == 'undefined') {
            callback(error ,{"message":"Error al recibir pedido"});
        }

        if(typeof response.body == 'undefined') {
            callback(error ,{"message":"Error al recibir pedido"});
        }

        if(options.store) {
            if(response.body[options.type] == undefined) {
//                continue;
            } else {
                response.body[options.type].forEach(function(grupo) {
                    options.base.cache.add(options.base.config.get("cache_key") + "_"+options.type+"_"+ grupo.id , grupo, options.base.config.get("cache_timeout") , function(err){
                    });
                })    
            }
        }
        callback(error ,response);
    }
  
}

module.exports = { cache: cache, config :config , utils:utils}