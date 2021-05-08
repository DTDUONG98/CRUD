'use strict'

module.exports = (sequelize, DataTypes) => {
    const StaffTechModule = sequelize.define('staffTech', {
        id: {type: DataTypes.STRING, primaryKey: true},
        staffId: {type: DataTypes.STRING},
        techStackId: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return StaffTechModule;
}