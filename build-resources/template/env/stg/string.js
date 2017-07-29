const variables = {
    domainName: "https://localhost:3001",
    hostName: "localhost:3001",
    dockerfileCmd: "[\"nodemon\",\"index.js\"]",
    apiDocUrl: "http://localhost:3001/api/",
    tokenSecret: "52bcef3b-c7df-4cec-96ef-7630949ca513",
    sessionExpiresInSec: 60 * 60,
    tokenExpiresInSec: 60 * 60 * 24,
    db: {
        database: "fjuhealth",
        host: "127.0.0.1",
        user: "root",
        debug: true,
    },
};

module.exports = variables;