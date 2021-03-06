/*
<%= constant.warning %>
*/
const GENDER = {
    MALE : "male",
    FEMALE : "female",
}
exports.up = function (knex, Promise) {
    return knex.schema.createTable('User', function(t) {
        t.increments('id').unsigned().primary();
        t.string('email').notNull();
        t.string('uid').notNull();
        t.string('passwordHash');
        t.dateTime('createdAt');
        t.dateTime('updatedAt');
    }).then(function () {
        return knex.schema.createTable('Profile', function (t) {
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
            t.increments('id').unsigned().primary();
            t.integer('group');
            t.integer('order');
            t.string('key');
            t.string('price');
            t.string('displayPrice');
            t.enu('gender', ['male', 'female']);
            t.dateTime('createdAt');
            t.dateTime('updatedAt');
        });
    }).then(function () {
        let now = new Date().toISOString();
        return knex('Package').insert([
            {
                group: 1,
                order: 1,
                key: "LEVEL3_MALE_HEALTH_CHECK",
                displayPrice: "NT$100,000",
                price: 100000,
                gender: GENDER.MALE,
                createdAt: now,
            },
            {
                group: 1,
                order: 2,
                key: "LEVEL3_FEMALE_HEALTH_CHECK",
                displayPrice: "NT$116,000",
                price: 116000,
                gender: GENDER.FEMALE,
                createdAt: now,
            },
            {
                group: 2,
                order: 1,
                key: "LEVEL2_MALE_HEALTH_CHECK",
                displayPrice: "NT$71,000",
                price: 71000,
                gender: GENDER.MALE,
                createdAt: now,
            },
            {
                group: 2,
                order: 2,
                key: "LEVEL2_FEMALE_HEALTH_CHECK",
                displayPrice: "NT$73,000",
                price: 73000,
                gender: GENDER.FEMALE,
                createdAt: now,
            },
            {
                group: 3,
                order: 1,
                key: "LEVEL1_MALE_HEALTH_CHECK",
                displayPrice: "NT$24,000",
                price: 24000,
                gender: GENDER.MALE,
                createdAt: now,
            },
            {
                group: 3,
                order: 2,
                key: "LEVEL1_FEMALE_HEALTH_CHECK",
                displayPrice: "NT$27,000",
                price: 27000,
                gender: GENDER.FEMALE,
                createdAt: now,
            },

        ]);
    }).then(function () {
        return knex.schema.createTable('Reservation', function (t) {
            t.increments('id').unsigned().primary();
            t.dateTime('reserveDate');
            t.enu('status', ['paymentPending', 'paymentCompleted']);
            t.dateTime('paymentDate');
            t.dateTime('sentPackageDate');
            t.dateTime('agentCalledDate');
            t.dateTime('createdAt');
            t.dateTime('updatedAt');
            t.integer('user_id_fk').unsigned().references('id').inTable('User');
            t.integer('package_id_fk').unsigned().references('id').inTable('Package');
        });
    }).then(function () {
        return knex.schema.createTable('Reminder', function (t) {
            t.increments('id').unsigned().primary();
            t.string('key');
            t.boolean('isSent');
            t.dateTime('createdAt');
            t.dateTime('updatedAt');
            t.integer('reservation_id_fk').unsigned().references('id').inTable('Reservation');
        });
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('User')
        .then(function () {return knex.schema.dropTable('Profile')})
        .then(function () {return knex.schema.dropTable('Reservation')});
};
