const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'proyecto'

const ProyectosService  = {
    list :  function (page, callback) {
         request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'proyectos' , base:base})
        })
    },
    getById :  function (proyecto_id, callback) {
         request({ url:url+"/"+proyecto_id, json:true}, (error , response ) => {
            callback(error, response);
        })
    },
    listByGrupo :  function (grupo_id, page, callback) {
         request({ url:url+"/getbygrupo/"+grupo_id+"/"+page, json:true}, (error , response ) => {
            callback(error, response);
        })
    },    
    save : function (proyecto, grupo_id , callback){
        let options = {
            uri: url + "/" + grupo_id,
            method:'post',
            json:proyecto
        }

        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = ProyectosService