var defaultLocale = "zh-tw"
const locale = {
    setLocale: (locale) => {
        defaultLocale = locale;
    },
    getLocale: () => {
        return defaultLocale;
    }
};
module.exports = locale