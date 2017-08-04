const PackageModel = require('./models/package');

class DomainPackage {
    async getPackage({id}) {
        return await PackageModel.query().where({id}).first();
    }
    async listPackages() {
        return await PackageModel.query().orderBy('group').orderBy('order');
    }
}

module.exports = DomainPackage;