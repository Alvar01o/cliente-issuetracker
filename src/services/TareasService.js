const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'tarea'

const tareasService  = {
    list : async function (page, callback) {
        await request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'tareas' , base:base})
        })
    },
    save : function (tarea, tableroid , callback){
        let options = {
            uri: url + "/addtareatablero/" + tableroid,
            method:'post',
            json:tarea
        }
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = tareasService