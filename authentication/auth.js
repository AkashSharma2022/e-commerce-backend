const jwt = require('jsonwebtoken');
const authorize = {
      authorization: (req, res, next) => {
            if (
                  !req.headers.authorization ||
                  !req.headers.authorization.startsWith('Bearer') ||
                  !req.headers.authorization.split(' ')[1]
            ) {
                  return res.status(422).json({
                        message: "Please provide the token",
                  });
            }
            let token = req.headers.authorization;
            const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

            if (isTokenExpired(token) == true) {

                  return res.json({
                        message: "token expired"
                  })
            }
            if (token) {
                  token = token.split(" ")[1];
                  jwt.verify(token, "secret_key", (err, decoded) => {
                        console.log(err);
                        if (err) {
                              return res.json({
                                    status: 404,
                                    message: "Invalid token or unauthorised access"
                              })
                        }
                        console.log(decoded)
                        // console.log("id in token  : ", decoded.id)
                        req.decoded = decoded;
                        next();
                  })
            } else {
                  res.json({
                        status: 303,
                        message: 'Please provide token'
                  });
            }
      }
}
module.exports = authorize;