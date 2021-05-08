'use strict'

module.exports = (sequelize, DataTypes) => {
    const CustomerGroupModel = sequelize.define('customerGroup', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
        priortity: {type: DataTypes.INTEGER},
        status: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return CustomerGroupModel;
}