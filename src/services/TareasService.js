const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'tarea'
const RequestMiddleware =  require("../middlewares/requestmiddleware");
const tareasService  = {
    list : function (page, req, res, callback) {
        RequestMiddleware.checkCredentials(req,res);
         request({ url:url+"/page/"+page, json:true, headers: {"Authorization":req.session.auth.basic}}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'tareas' , base:base})
        })
    },
    save : function (tarea, tableroid , req, res, callback){
        RequestMiddleware.checkCredentials(req,res);
        let options = {
            uri: url + "/addtareatablero/" + tableroid,
            method:'post',
            json:tarea,
            headers: {"Authorization":req.session.auth.basic}
        }
        request(options ,  (error , response ) => {

            base.cache.set(base.config.get("cache_key") + "_tareas_" + response.body.id , tarea, base.config.get("cache_timeout") , function(err){
                base.cache.gets(base.config.get("cache_key") + "_tableros_" + tableroid, function (err, data) {
                    let tablero = data[base.config.get("cache_key") + "_tableros_" + tableroid];
                    console.log("UPDATING CACHE tablero")
                    console.log(response.body);
                    tareas = response.body;
                    if(tablero.tareas != null ){
                        tablero.tareas = new Array(tablero.tareas);
                    } else {
                        tablero.tareas = [];                        
                    }
                    tablero.tareas.push(tareas);
                    console.log(tablero);
                    base.cache.cas(base.config.get("cache_key") + "_tableros_" + tableroid,tablero , data.cas, base.config.get("cache_timeout"), function (err , result ) {
                        callback(error, response);
                    });
                });
    
                //callback(error, response);
            });

//            callback(error, response);
        })
    }
}
module.exports = tareasService