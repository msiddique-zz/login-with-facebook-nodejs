const graph = require('fbgraph');

const Authenticate = (req, res) => {

    // we don't have a code yet
    // so we'll redirect to the oauth dialog
    if (!req.query.code) {
        console.log("Performing oauth for some user right now.");

        var authUrl = graph.getOauthUrl({
            "client_id": process.env.client_id
            , "redirect_uri": process.env.redirect_uri
            , "scope": process.env.scope
        });

        if (!req.query.error) { //checks whether a user denied the app facebook login/permissions

            res.redirect(authUrl);
            console.log('-----------------sucessfull----------')
        } else {  //req.query.error == 'access_denied'
            res.send('access denied');
        }
    }
    // If this branch executes user is already being redirected back with 
    // code (whatever that is)
    else {
        console.log("Oauth successful, the code (whatever it is) is: ", req.query.code);
        // code is set
        // we'll send that and get the access token
        graph.authorize({
            "client_id": process.env.client_id
            , "redirect_uri": process.env.redirect_uri
            , "client_secret": process.env.client_secret
            , "code": req.query.code
        }, function (err, facebookRes) {
            console.log('facebook response ', facebookRes)
            res.redirect('/UserHasLoggedIn');
        });
    }

}

module.exports = Authenticate