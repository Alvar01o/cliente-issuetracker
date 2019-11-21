const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'grupo'
const RequestMiddleware =  require("../middlewares/requestmiddleware");

const GruposService  = {
    list :  function (page, req, res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        request( { url:url+"/page/"+page , headers: {"Authorization":req.session.auth.basic} , json:true}, (error , response ) => {
            if(response.body == undefined) {

            } else {
                base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'grupos' , base:base})
            }

        });
    },
    save : function (grupo ,req, res, callback){
        RequestMiddleware.checkCredentials(req,res);
        let options = {
            uri: url,
            method:'post',
            json:grupo,
            headers: {"Authorization":req.session.auth.basic}
        }
        request(options ,  (error , response) => {
            base.cache.set(base.config.get("cache_key") + "_grupos_" + response.body.id , grupo, base.config.get("cache_timeout") , function(err){
                callback(error, response);
            });
        })
    }, 
    saveUser : function (grupo_id , user_id , req, res, callback){
        RequestMiddleware.checkCredentials(req,res);
        let options = {
            uri: url+"/adduser/"+grupo_id+"/"+user_id,
            method:'post',
            headers: {"Authorization":req.session.auth.basic}
        }
        request(options ,  (error , response ) => {
            base.cache.gets(base.config.get("cache_key") + "_grupos_" + grupo_id, function (err, data) {
                let grupo = JSON.parse(response.body);
                base.cache.cas(base.config.get("cache_key") + "_grupos_" + grupo_id,grupo , data.cas, base.config.get("cache_timeout"), function (err , result ) {
                    callback(error, result);
                });
            });
        })
    },
    delete: function(grupo_id ,req, res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        let options = {
            uri: url+"/"+grupo_id, 
            method:'delete',
            headers: {"Authorization":req.session.auth.basic}            
        }
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    } ,
    getById : function(id ,req,res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        memcached.get(base.config.get("cache_key") + "_grupos_"+id, function (err, data) {
            if(err){
                request({ url:url+"/"+id, json:true, headers: {"Authorization":req.session.auth.basic} }, (error , response ) => {
                    callback(error, response.body);
                })
            } else {
                callback(err, data);
            }}
        );
    }
}
module.exports = GruposService