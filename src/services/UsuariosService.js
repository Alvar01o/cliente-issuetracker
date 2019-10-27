const request = require('request')
const base = require("./BaseService.js");
const User = require("../beans/UserB.js");
const url  = base.host + "user"

const list   =   (page) => {
    console.log("Request a  "+ url);
    request({ url:url+"/page/"+page, json:true}, (error , response ) => {
        console.log(response.body);
        if (error) {

        } else {

        }
    
    })
}

const create   =  (user) => {
    
    request.post(url, {form:{key:'value'}}, function(err,httpResponse,body){ 
        console.log(body);
    })
}

module.exports = {
    list
}