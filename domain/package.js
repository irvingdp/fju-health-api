const PackageModel = require('./models/package');
const PackageData = require('../data/packageDetailData');
const Locale = require('../locale');

class DomainPackage {
    async getPackage({id}) {
        return await PackageModel.query().where({id}).first();
    }
    async listPackages() {
        return await PackageModel.query().orderBy('group').orderBy('order');
    }
    getPackagesDetail() {
        return PackageData[Locale.getLocale()];
    }
}

module.exports = DomainPackage;