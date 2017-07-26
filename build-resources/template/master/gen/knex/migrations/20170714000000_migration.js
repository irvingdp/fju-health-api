/*
<%= constant.warning %>
*/

exports.up = function (knex, Promise) {
    return knex.schema.createTable('User', function(t) {
        t.charset("utf8");
        t.increments('id').unsigned().primary();
        t.string('email').notNull();
        t.string('salt');
        t.string('passwordHash');
        t.timestamp('createdAt');
        t.timestamp('updatedAt');
    }).then(function () {
        return knex.schema.createTable('Profile', function (t) {
            t.charset("utf8");
            t.increments('id').unsigned().primary();
            t.string('uid');
            t.dateTime('birthday');
            t.string('name');
            t.enu('gender', ['male', 'female']);
            t.string('contactAddress');
            t.string('fax');
            t.string('mobilePhone');
            t.timestamp('createdAt');
            t.timestamp('updatedAt');
            t.integer('user_id_fk').unsigned().references('id').inTable('User');
        });
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('User')
        .then(function () {return knex.schema.dropTable('Profile')});
};
