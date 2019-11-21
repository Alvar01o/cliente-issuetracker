const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'user'
const RequestMiddleware =  require("../middlewares/requestmiddleware");
const UsuariosService  = {
    list : async function (page,req,res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        await request({ url:url+"/page/"+page, json:true,  headers: {"Authorization":req.session.auth.basic}}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'users' , base:base})
        })
    },
    delete: function(user_id , req,res, callback) {
        RequestMiddleware.checkCredentials(req,res);
        let options = {
            uri: url+"/"+user_id,
            method:'delete',
            headers: {"Authorization":req.session.auth.basic}
        }
        request(options ,  (error , response ) => {
            callback(error, response);
        })        
    } ,
    save : function (usuario ,req,res, callback){
        RequestMiddleware.checkCredentials(req,res);
        let options = {
            uri: url,
            method:'post',
            json:usuario,
            headers: {"Authorization":req.session.auth.basic}
        }
        request(options ,  (error , response ) => {
            base.cache.set(base.config.get("cache_key") + "_users_" + response.body.id , response.body, base.config.get("cache_timeout")  , function(err){
                callback(error, response);
            });

        })
    }, 
    getById : function(id , callback) {
        RequestMiddleware.checkCredentials(req,res);
        memcached.get(base.config.get("cache_key") + "_users_"+id, function (err, data) {
            if(err) {
                console.log(err);
            } else {    
                request({ url:url+"/"+id, json:true}, (error , response ) => {
                    base.cache.set(base.config.get("cache_key") + "_users_" + response.body.id , response.body,base.config.get("cache_timeout")   , function(err){
                        callback(error, response);
                    });
                })
            }
          });

    }
}
module.exports = UsuariosService