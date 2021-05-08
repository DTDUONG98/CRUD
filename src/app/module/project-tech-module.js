'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProjectTechModule = sequelize.define('projectTech', {
        id: {type: DataTypes.STRING, primaryKey: true},
        projectId: {type: DataTypes.STRING},
        techStackId: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return ProjectTechModule;
}