let config = {};

config.port = 5000;

config.password_salt = "SomeBlu";

config.jwt =
{
    key: "ThisIsARandomJWTKeyForYouToChange",
    timeout: '1d'
};

config.me = {
    origins: ['http://localhost:4200','http://localhost:5000']
};


module.exports = config;

