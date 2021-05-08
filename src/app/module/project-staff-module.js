'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProjectStaffModule = sequelize.define('projectstaff', {
        id: {type: DataTypes.STRING, primaryKey: true},
        projectId: {type: DataTypes.STRING},
        staffId: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return ProjectStaffModule;
}