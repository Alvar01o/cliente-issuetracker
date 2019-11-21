const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'tablero'
const RequestMiddleware =  require("../middlewares/requestmiddleware");

const tablerosService  = {
    list : function (page,req,res, callback) { 
        RequestMiddleware.checkCredentials(req,res);
        request({ url:url+"/page/"+page, json:true, headers: {"Authorization":req.session.auth.basic}}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'tableros' , base:base})
        })
    }, 
    save : function (tablero, proyecto_id ,req,res, callback){
        console.log("SAVING TABLERO")
        RequestMiddleware.checkCredentials(req, res);
        let options = { 
            uri: url + "/" + proyecto_id,
            method:'post',
            json:tablero,
            headers: {"Authorization":req.session.auth.basic}
        }
        request(options ,  (error , response) => {
            base.cache.set(base.config.get("cache_key") + "_tableros_" + response.body.id , tablero, base.config.get("cache_timeout") , function(err){

                base.cache.gets(base.config.get("cache_key") + "_proyectos_" + proyecto_id, function (err, data) {
                    let proyecto = data[base.config.get("cache_key") + "_proyectos_" + proyecto_id];
                    console.log("UPDATING CACHE PROYECTO")
                    tablero = response.body;
                    if(proyecto.tableros != null ){
                        proyecto.tableros = new Array(proyecto.tableros);
                    } else {
                        proyecto.tableros = [];                        
                    }
                    proyecto.tableros.push(tablero);
                    console.log(proyecto);
                    base.cache.cas(base.config.get("cache_key") + "_proyectos_" + proyecto_id,proyecto , data.cas, base.config.get("cache_timeout"), function (err , result ) {
                        callback(error, result);
                    });
                });
    
                //callback(error, response);
            });
        })
    }
}
module.exports = tablerosService