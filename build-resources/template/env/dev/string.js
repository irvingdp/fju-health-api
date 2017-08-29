const variables = {
    domainName: "https://localhost:3001",
    hostName: "localhost:3001",
    dockerfileCmd: "[\"nodemon\",\"index.js\"]",
    apiDocUrl: "http://localhost:3001/api/",
    tokenSecret: "52bcef3b-c7df-4cec-96ef-7630949ca513",
    tokenExpiresInSec: 60 * 60,
    db: {
        database: "fjuhealth",
        host: "127.0.0.1",
        port: 5432,
        user: "admin",
        password: "admin",
        debug: true
    },
    mailgun: {
        apiKey: "key-7550b9097f7d7fb47547334f04ad363e",
        domain: "iask.today",
    },
};

module.exports = variables;