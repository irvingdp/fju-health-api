const PackageModel = require('./models/package');
const PackageData = require('../data/packageData');

class DomainPackage {
    async getPackage({id}) {
        return await PackageModel.query().where({id}).first();
    }
    async listPackages() {
        return await PackageModel.query().orderBy('group').orderBy('order');
    }
    getPackagesDetail() {
        return PackageData;
    }
}

module.exports = DomainPackage;