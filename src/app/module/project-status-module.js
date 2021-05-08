'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProjectStatusModel = sequelize.define('projectStatus', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return ProjectStatusModel;
}