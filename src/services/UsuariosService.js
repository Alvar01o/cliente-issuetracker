const request = require('request')
const base = require("./BaseService");
const url  = base.host + "user"

const UsuariosService  = {
    list : async function (page, callback) {
        await request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            callback(error, response);
        })
    },
    delete: function(user_id , callback) {
        let options = {
            uri: url+"/"+user_id,
            method:'delete',
        }
        request(options ,  (error , response ) => {
            callback(error, response);
        })        
    } ,
    save : function (usuario , callback){
        console.log(usuario);
        let options = {
            uri: url,
            method:'post',
            json:usuario
        }
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }, 
    getById : function(id , callback) {
        request({ url:url+"/"+id, json:true}, (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = UsuariosService