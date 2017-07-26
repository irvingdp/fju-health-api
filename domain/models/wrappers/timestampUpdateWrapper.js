/**
 * Function that will set timestamp for the following column for wrapped model:
 * - updatedAt: set with time now
 *
 * @param model - objection.js Model that will be wrapped
 * @returns model - wrapped model
 */
const timestampUpdateWrapper = function(model) {
    //Instead of replacing wrapped model's $beforeUpdate, we call it
    let originalBeforeInsert = model.prototype.$beforeInsert || (()=>{});
    let originalBeforeUpdate = model.prototype.$beforeUpdate || (()=>{});

    model.prototype.$beforeInsert = function (queryContext) {
        originalBeforeInsert.bind(this)(queryContext);
        let now = new Date().toISOString();
        this.createdAt = now;
        this.updatedAt = now;
    };

    //Edit the class function for this model to call the original $beforeUpdate and set 'now' to column: 'updatedAt'
    model.prototype.$beforeUpdate = function (queryContext) {
        originalBeforeUpdate.bind(this)(queryContext);
        this.updatedAt = new Date().toISOString();
    };

    return model;
};

module.exports = timestampUpdateWrapper;