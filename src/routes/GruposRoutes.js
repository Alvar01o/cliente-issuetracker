
const GruposService = require("../services/GruposService");

const GruposRoute  = {
    chargeRoutes : function(app) {
        app.get('grupos' , (req, res) => { 
            GruposService.list(1);
            res.render('dashboard', {

            })
        })
    }
}


module.exports = GruposRoute