/*
 <%= constant.warning %>
 */

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '<%= db.host %>',
            user: '<%= db.user %>',
            password: '<%= db.password %>',
            database: '<%= db.database %>',
            port: <%= db.port %>,
            charset: 'utf8',
            timezone: "UTC",
        },
        debug: '<%= db.debug %>',
    },
};
