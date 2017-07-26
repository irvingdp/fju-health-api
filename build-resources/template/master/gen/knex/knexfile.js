/*
 <%= constant.warning %>
 */

module.exports = {
    development: {
        client: 'mariadb',
        connection: {
            host: '<%= db.host %>',
            user: '<%= db.user %>',
            db: '<%= db.database %>',
        },
        debug: '<%= db.debug %>',
    },
};
