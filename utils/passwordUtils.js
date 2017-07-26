const bcrypt = require('bcrypt')

/**
 * Note:
 * We don't need to store a separate salt as node.bcrypt.js stores it along
 * with the hash. See: https://github.com/kelektiv/node.bcrypt.js/issues/496
 */
class PasswordUtils {
    /**
     * Hash a plain text password
     * @param password - plain text password
     * @returns hash - result in hash that is to be stored
     */
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    /**
     * Check if password is correct, compared to its hash
     * @param password - plain text password
     * @param hash - hash to be compared with
     */
    static isPasswordCorrect(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = PasswordUtils;