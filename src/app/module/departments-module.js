'use strict'

module.exports = (sequelize, DataTypes) => {
    const DepartmentModel = sequelize.define('department', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        mission: {type: DataTypes.STRING},
        techStack: {type: DataTypes.STRING},
        project: {type: DataTypes.STRING},
        staff: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return DepartmentModel;
}