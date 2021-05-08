'use strict'

module.exports = (sequelize, DataTypes) => {
    const TechStackModel = sequelize.define('techStack', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING},
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return TechStackModel;
}