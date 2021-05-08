'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProjectTypeModel = sequelize.define('projectType', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
        priortity: {type: DataTypes.INTEGER},
        status: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return ProjectTypeModel;
}