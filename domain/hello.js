function sayHello() {
    return Promise.resolve("Hello World !");
}

module.exports = {
    sayHello: sayHello,
};