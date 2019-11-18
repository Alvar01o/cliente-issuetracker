const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'tablero'

const tablerosService  = {
    list : function (page, callback) {
         request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'tableros' , base:base})
        })
    },
    save : function (tablero, proyecto_id , callback){
        let options = {
            uri: url + "/" + proyecto_id,
            method:'post',
            json:tablero
        }
        request(options ,  (error , response) => {
            base.cache.set(base.config.get("cache_key") + "_tableros_" + response.body.id , tablero, base.config.get("cache_timeout") , function(err){

                base.cache.gets(base.config.get("cache_key") + "_proyectos_" + proyecto_id, function (err, data) {
                    let proyecto = data[base.config.get("cache_key") + "_proyectos_" + proyecto_id];
                    tablero = JSON.parse(response.body);
                    proyecto.tableros = new Array(proyecto.tableros);
                    proyecto.tableros.push(tablero);
                    base.cache.cas(base.config.get("cache_key") + "_proyectos_" + proyecto_id,proyecto , data.cas, base.config.get("cache_timeout"), function (err , result ) {
                        callback(error, result);
                    });
                });
    
                callback(error, response);
            });
        })
    }
}
module.exports = tablerosService