const { getUsersById } = require("../users/users.controllers");

const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo" // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            const data = getUsersById(decoded.id)
            if (data) {
                console.log("decoded jwt", decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
                return done(null, decoded);
            }else{
                return done(null, false)
            }
        })
    );
};