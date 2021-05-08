'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProjectsModel = sequelize.define('projects', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        projectType: {type: DataTypes.STRING},
        projectStatus: {type: DataTypes.STRING},
        techStack: {type: DataTypes.STRING},
        department: {type: DataTypes.STRING},
        staff: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return ProjectsModel;
}