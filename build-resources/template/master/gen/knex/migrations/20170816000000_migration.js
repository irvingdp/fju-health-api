/*
 <%= constant.warning %>
 */
const bcrypt = require('bcrypt')
exports.up = function (knex, Promise) {
    let now = new Date().toISOString();
    return knex('AdminUser').insert([
        {
            email: "fjuhealthservice@gmail.com",
            passwordHash: bcrypt.hashSync("admin", 10),
            createdAt: now,
        },
    ]);
};

exports.down = function (knex, Promise) {
    return knex('AdminUser').truncate();
};
