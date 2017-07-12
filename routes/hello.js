const helloService = require("../domain/hello");

function hello(req, res, next) {
    return helloService.sayHello()
        .then((result) => {
            res.json(result);
        }).fail((err) => {
            next(err);
        });
}
module.exports = {
    hello: hello,
};