const variables = {
    domainName: "https://localhost:3001",
    hostName: "localhost:3001",
    dockerfileCmd: "[\"nodemon\",\"index.js\"]",
    apiDocUrl: "http://localhost:3001/api/",

    db: {
        database: "fjuhealth",
        host: "127.0.0.1",
        user: "root",
    },
};

module.exports = variables;