const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'tablero'

const tablerosService  = {
    list : async function (page, callback) {
        await request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            base.utils.checkBodyAndCache(error, response, callback , {store:true , type:'tableros' , base:base})
        })
    },
    save : function (tablero, tablero_id , callback){
        console.log("serv >> " + JSON.stringify(tablero));
        let options = {
            uri: url + "/" + tablero_id,
            method:'post',
            json:tablero
        }
        console.log(options);
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = tablerosService