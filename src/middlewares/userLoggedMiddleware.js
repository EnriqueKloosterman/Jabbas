const db = require('../database/models');

function userLoggedMiddleware(req, res, next){
    // let islogged = false;
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if(emailInCookie){
        db.Users.findOne({
            where:{
                email: emailInCookie,
            }
        })
        .then((userFound) => {
            req.session.userLogged = userFound;
        })
        .catch((e) => res.send(e));
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    


    next();
}
module.exports = userLoggedMiddleware;