/**
 * <%= constant.warning %>
 */

const config = {
    DOMAIN_NAME: "<%= domainName %>",
    HOST_NAME: "<%= hostName %>",
    TOKEN_SECRET: "<%= tokenSecret %>",
    SESSION_EXPIRES_IN_SEC: <%= sessionExpiresInSec %>,
    TOKEN_EXPIRES_IN_SEC: <%= tokenExpiresInSec %>
};

module.exports = config;