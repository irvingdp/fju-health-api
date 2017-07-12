/**
 * Created by irvingdp on 2017/7/12.
 */

function sayHello() {
    return Promise.resolve("Hello World!");
}

module.exports = {
    sayHello: sayHello,
};