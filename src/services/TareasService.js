const request = require('request')
const base = require("./BaseService");
const url  = base.host + "tarea"

const tareasService  = {
    list : async function (page, callback) {
        await request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            callback(error, response);
        })
    },
    save : function (tarea, tableroid , callback){
        console.log("serv >> " + JSON.stringify(tarea));
        let options = {
            uri: url + "/addtareatablero/" + tableroid,
            method:'post',
            json:tarea
        }
        console.log(options);
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = tareasService