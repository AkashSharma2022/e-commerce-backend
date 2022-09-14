const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases }  = require('http-status-codes');
global.atob = require("atob");


const authorize = {
      authorization: (req, res, next) => {
            if (
                  !req.headers.authorization ||
                  !req.headers.authorization.startsWith('Bearer') ||
                  !req.headers.authorization.split(' ')[1]
            ) {
                  return res.status(403).json({
                        status: "FORBIDDEN",
                        StatusCodes
: StatusCodes
.FORBIDDEN,
                        message: "Please provide the token",
                  });
            }
            let token = req.headers.authorization;
            const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

            if (isTokenExpired(token) == true) {

                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "token expired"
                  })
            }
            if (token) {
                  token = token.split(" ")[1];
                  jwt.verify(token, "secret_key", (error, decoded) => {
;
                        if (error)
 {
                              return res.status(400).json({
                                    status: "BAD_REQUEST",
                                    StatusCodes
: StatusCodes
.BAD_REQUEST,
                                    message: "Invalid token or unauthorised access"
                              })
                        }
                        console.log(decoded)
                        // console.log("id in token  : ", decoded.id)
                        req.decoded = decoded;
                        next();
                  })
            } else {
                  res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: 'Please provide token'
                  });
            }
      }
}
module.exports = authorize;