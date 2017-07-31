const bcrypt = require('bcrypt')
/*
/**
 * Note:
 * We don't need to store a separate salt as node.bcrypt.js stores it along
 * with the hash. See: https://github.com/kelektiv/node.bcrypt.js/issues/496
 */
const PasswordUtils = {
    hashPassword: (password) => {
        return bcrypt.hashSync(password, 10);
    },
    isPasswordCorrect: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
};
module.exports = PasswordUtils;