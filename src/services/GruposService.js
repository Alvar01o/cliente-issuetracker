const request = require('request')
const base = require("./BaseService");
const Grupo = require("../beans/GruposB.js");
const url  = base.host + "grupos"

const GruposService  = {
    list : function (page) {
        console.log("Request a  "+ url);
        request({ url:url+"/page/"+page, json:true}, (error , response ) => {
            console.log(response.body);
            if (error) {
    
            } else {
    
            }
        
        })
    }
}
module.exports = GruposService