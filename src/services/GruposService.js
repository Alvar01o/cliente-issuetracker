const request = require('request')
const base = require("./BaseService");
const url  = base.host + "grupo"

const GruposService  = {
    list : async function (page, callback) {
        await request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            callback(error, response);
        })
    },
    save : function (grupo , callback){
        console.log("gru >> " + JSON.stringify(grupo));
        let options = {
            uri: url,
            method:'post',
            json:grupo
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
module.exports = GruposService