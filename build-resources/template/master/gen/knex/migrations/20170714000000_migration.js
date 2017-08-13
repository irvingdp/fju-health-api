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
            t.string('title');
            t.string('description');
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
                title: "菁英防癌健檢",
                description: "",
                displayPrice: "NT$100,000",
                price: 100000,
                gender: GENDER.MALE,
                createdAt: now,
            },
            {
                group: 1,
                order: 2,
                title: "菁英防癌健檢",
                description: "",
                displayPrice: "NT$116,000",
                price: 116000,
                gender: GENDER.FEMALE,
                createdAt: now,
            },
            {
                group: 2,
                order: 1,
                title: "防癌健檢",
                description: "",
                displayPrice: "NT$71,000",
                price: 71000,
                gender: GENDER.MALE,
                createdAt: now,
            },
            {
                group: 2,
                order: 2,
                title: "防癌健檢",
                description: "",
                displayPrice: "NT$73,000",
                price: 73000,
                gender: GENDER.FEMALE,
                createdAt: now,
            },
            {
                group: 3,
                order: 1,
                title: "精準健檢",
                description: "",
                displayPrice: "NT$24,000",
                price: 24000,
                gender: GENDER.MALE,
                createdAt: now,
            },
            {
                group: 3,
                order: 2,
                title: "精準健檢",
                description: "",
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
    })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('User')
        .then(function () {return knex.schema.dropTable('Profile')})
        .then(function () {return knex.schema.dropTable('Reservation')});
};
