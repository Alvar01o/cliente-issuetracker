const request = require('request')
const base = require("./BaseService");
const url  = base.config.get('host') + 'contacto'

const contactoService  = {
    save : function (contacto, callback){
        let options = {
            uri: url ,
            method:'post',
            json:contacto
        }
        request(options ,  (error , response ) => {
            callback(error, response);
        })
    }
}
module.exports = contactoService