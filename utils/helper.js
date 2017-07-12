
const helper = {
    errorHandle: function (error) {
        return {
            status: error.status || 500,
            code: error.code || "",
            message: error.message || "",
            stack: error.stack || "",
        }
    },
}

module.exports = helper;