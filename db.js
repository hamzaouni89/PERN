const Pool = require('pg').Pool;

const pool = new Pool({
    user : 'postgres',
    password : 'hamza',
    host: 'localhost',
    port: 5432,
    database: 'emission'
});

module.exports= pool;