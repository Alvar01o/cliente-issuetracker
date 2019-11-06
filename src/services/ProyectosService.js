const request = require('request')
const base = require("./BaseService");
const url  = base.host + "proyecto"

const ProyectosService  = {
    list : async function (page, callback) {
        await request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            callback(error, response);
        })
    },
    listById : async function (proyecto_id, callback) {
        await request({ url:url+"/"+proyecto_id, json:true}, (error , response ) => {
            callback(error, response);
        })
    },
    listByGrupo : async function (grupo_id, page, callback) {
        await request({ url:url+"/getbygrupo/"+grupo_id+"/"+page, json:true}, (error , response ) => {
            callback(error, response);
        })
    },    
    save : function (proyecto, grupo_id , callback){
        console.log("serv >> " + JSON.stringify(proyecto));
        let options = {
            uri: url + "/" + grupo_id,
            method:'post',
            json:proyecto
        }
        console.log(options);
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = ProyectosService