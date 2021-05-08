'use strict'

module.exports = (sequelize, DataTypes) => {
    const DepartmentTechModule = sequelize.define('departmentTech', {
        id: {type: DataTypes.STRING, primaryKey: true},
        departmentId: {type: DataTypes.STRING},
        techStackId: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return DepartmentTechModule;
}