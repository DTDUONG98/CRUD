'use strict'

module.exports = (sequelize, DataTypes) => {
    const StaffModel = sequelize.define('staff', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        birthday: {type: DataTypes.DATE},
        phone: {type: DataTypes.INTEGER},
        techStack: {type: DataTypes.STRING},
        project: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return StaffModel;
}