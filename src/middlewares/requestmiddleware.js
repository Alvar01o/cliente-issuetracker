const request = require('request')

const RequestMiddleware  = {

    sendRequestSession: function(options, userdata, req, callback) {
        auth = "Basic " + Buffer.from(userdata.email + ":" + userdata.pass).toString("base64");
        options.headers = {"Authorization" : auth}
        request(options, (error , response ) => {
            if(response.statusCode == 401) {
                callback({error:response.body.error, message: response.body.message});
            }else {
                req.session.auth = options.headers.Authorization;
                response.auth = auth
                callback(response)
            }
        })
    },
    sendRequest: function( options, req, callback  ) {
        //inject credentials in header
        auth = req.session.auth
        options.headers = {"Authorization" : auth.basic}
        console.log(options)
        request(options , (error , response) => {
            callback(error, response); 
        })
    },
    checkCredentials(req , res ) {
        if(req.session.auth == undefined || req.session.auth.basic == undefined){
            res.redirect('/issuetracker/login')

        }
    }
}
module.exports = RequestMiddleware