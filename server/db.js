//Pool module from pg to interact with PostgreSQL
const Pool = require("pg").Pool;

//INTENTIONALLY hardcoded connection config for examiners convenvience
const PGHOST = "ep-little-union-a5jr52qp.us-east-2.aws.neon.tech";
const PGDATABASE = "eventsdb";
const PGUSER = "eventsdb_owner";
const PGPASSWORD = "4NT6QurskbLA";
const ENDPOINT_ID = "ep-little-union-a5jr52qp";

//create instance of Pool with config
const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER, 
    password: PGPASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false 
    },
    //connection string for PostgreSQL
    connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}?sslmode=require&options=project=${ENDPOINT_ID}`
  });
  
module.exports = pool;
