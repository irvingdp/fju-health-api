/**
 * <%= constant.warning %>
 */

const config = {
    DOMAIN_NAME: "<%= domainName %>",
    HOST_NAME: "<%= hostName %>",
    TOKEN_SECRET: "<%= tokenSecret %>",
    TOKEN_EXPIRES_IN_SEC: <%= tokenExpiresInSec %>,
    mailgun: <%= JSON.stringify(mailgun) %>,
};

module.exports = config;