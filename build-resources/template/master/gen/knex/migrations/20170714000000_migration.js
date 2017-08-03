/*
<%= constant.warning %>
*/

exports.up = function (knex, Promise) {
    return knex.schema.createTable('User', function(t) {
        t.charset("utf8");
        t.increments('id').unsigned().primary();
        t.string('email').notNull();
        t.string('uid').notNull();
        t.string('passwordHash');
        t.dateTime('createdAt');
        t.dateTime('updatedAt');
    }).then(function () {
        return knex.schema.createTable('Profile', function (t) {
            t.charset("utf8");
            t.increments('id').unsigned().primary();
            t.string('name');
            t.dateTime('birthday');
            t.enu('gender', ['male', 'female']);
            t.string('contactAddress');
            t.string('phoneNumber');
            t.dateTime('createdAt');
            t.dateTime('updatedAt');
            t.integer('user_id_fk').unsigned().references('id').inTable('User');
        });
    }).then(function () {
        return knex.schema.createTable('Package', function (t) {
            t.charset("utf8");
            t.increments('id').unsigned().primary();
            t.string('title');
            t.string('description');
            t.integer('price');
            t.enu('gender', ['male', 'female']);
            t.dateTime('createdAt');
            t.dateTime('updatedAt');
        });
    }).then(function () {
        return knex.schema.createTable('Reservation', function (t) {
            t.charset("utf8");
            t.increments('id').unsigned().primary();
            t.dateTime('reserveDate');
            t.enu('status', ['paymentPending', 'paymentCompleted']);
            t.dateTime('paymentDate');
            t.boolean('isSentPackage');
            t.dateTime('sentPackageDate');
            t.boolean('isAgentCalled');
            t.dateTime('agentCalledDate');
            t.dateTime('createdAt');
            t.dateTime('updatedAt');
            t.integer('user_id_fk').unsigned().references('id').inTable('User');
            t.integer('package_id_fk').unsigned().references('id').inTable('Package');
        });
    })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('User')
        .then(function () {return knex.schema.dropTable('Profile')})
        .then(function () {return knex.schema.dropTable('Reservation')});
};
