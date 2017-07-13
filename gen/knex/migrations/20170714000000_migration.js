/*
### WARNING: This file is generated from template, edit the file under build-resources/template ###
*/

exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.charset("utf8");
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.string('salt');
        t.string('passwordHash');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
