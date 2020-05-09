const {sequelize} = require('./connexion');
const Emissions = sequelize.import(__dirname + '/models/emissions.model.js');
const Emissionchroniqueurs = sequelize.import(__dirname + '/models/emission_chroniqueurs_model.js');
const Chroniqueurs = sequelize.import(__dirname +'/models/chroniqueurs.model.js');


sequelize
.authenticate()
.then(async() =>{
    defineRelations ();
    console.log('Connected');
    await Emissions.sync({force : true});
    await Chroniqueurs.sync({force : true});
    await Emissionchroniqueurs.sync({force : true});
    //await sequelize.sync({force: true});
})
.catch(err => console.error(err));

const defineRelations =() => {
    const common = options => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

Emissions.belongsToMany(Chroniqueurs, common({
    through:'emissionChroniqueurs',
    foreignKey: 'emission_id',
    otherKey: 'chroniqueur_id',
}));

Chroniqueurs.belongsToMany(Emissions,common({
    through:'emissionChroniqueurs',
    foreignKey: 'chroniqueur_id',
    otherKey: 'emission_id',
}));

Emissionchroniqueurs.belongsTo(Chroniqueurs, {foreignKey: 'chroniqueur_id'});
Emissionchroniqueurs.belongsTo(Emissions, {foreignKey: 'emission_id'});
Emissions.hasMany(Emissionchroniqueurs , common({foreignKey: 'emission_id'}));
Chroniqueurs.hasMany(Emissionchroniqueurs , common({foreignKey: 'chroniqueur_id'}));

};