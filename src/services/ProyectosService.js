const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'proyecto'
const RequestMiddleware =  require("../middlewares/requestmiddleware");
const ProyectosService  = {
    list :  function (page, req,res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        request({ url:url+"/page/"+page, json:true,headers: {"Authorization":req.session.auth.basic}}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'proyectos' , base:base})
        })
    },
    getById :  function (proyecto_id, req, res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        memcached.get(base.config.get("cache_key") + "_proyectos_"+proyecto_id, function (err, data) {
            console.log(data);
            if(err){

            }

            if(data.tableros == null || data.tableros.tareas == null) {
                console.log("REFRESH PROECTO")
                request({ url:url+"/"+proyecto_id, json:true, headers: {"Authorization":req.session.auth.basic}}, (error , response ) => {
                    console.log("from request");
                    console.log(response.body); 
                    console.log("to  view");
                    base.cache.set(base.config.get("cache_key") + "_proyectos_" + proyecto_id , response.body, base.config.get("cache_timeout") , function(err){
                        callback(error, response.body);
                    });
                })
            }}
        );

    },
    listByGrupo :  function (grupo_id, page, req , res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        request({ url:url+"/getbygrupo/"+grupo_id+"/"+page, json:true, headers: {"Authorization":req.session.auth.basic}}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'proyectos' , base:base})
//            callback(error, response);
        }) 
    },    
    save : function (proyecto, grupo_id ,req, res, callback){
        RequestMiddleware.checkCredentials(req,res);
        let options = { 
            uri: url + "/" + grupo_id,
            method:'post',
            json:proyecto,
            headers: {"Authorization":req.session.auth.basic}
        }

        request(options ,  (error , response ) => {
            base.cache.set(base.config.get("cache_key") + "_proyectos_" + response.body.id , response.body, base.config.get("cache_timeout") , function(err){
                callback(error, response);
            });
        })
    }
}
module.exports = ProyectosService