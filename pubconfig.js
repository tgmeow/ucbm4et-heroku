//heroku deployment specific config file

//holds data for node server
var config = {};

//DB info
config.db = {};

//Max connections default 10
config.db.conlimit = 10;
//database port
config.db.port = 3306;
//conversion to local time is done on client side
config.db.timezone = '-0000';
//utf8mb4 allows for emojis, whereas utf8 does not
config.db.charset = 'utf8mb4';


//Host URL for the db
config.db.host = process.env.JAWSDB_HOST;
//db table name
config.db.tableName = process.env.JAWSDB_TBNAME;
//db name
config.db.dbName = process.env.JAWSDB_DEFAULTDB;
//db login info
config.db.dbUser = process.env.JAWSDB_USER;
config.db.dbPass = process.env.JAWSDB_PASS;


config.db.connectionOp =
    {
        connectionLimit: config.db.conlimit,
        host: config.db.host,
        port: config.db.port,
        timezone: config.db.timezone,
        user: config.db.dbUser,
        password: config.db.dbPass,
        database: config.db.dbName,
        charset: config.db.charset
    };


//airbrake config
config.ab = {};
config.ab.projectId = process.env.AIRBRAKE_PROJECT_ID; // Project ID
config.ab.projectKey = process.env.AIRBRAKE_API_KEY; // Project key


//Bounds for queries
config.queryBound = {};
config.queryBound.NUMBER_MIN = 0;
config.queryBound.NUMBER_MAX = 100; //max entries requestable in one query
config.queryBound.NUMBER_DEFAULT = 20; //default number of entries

//how many entries to skip for pagination
config.queryBound.SKIP_MIN = 0;
config.queryBound.SKIP_DEFAULT = 0;

config.queryBound.YEAR_MIN = 1970;
config.queryBound.YEAR_MAX = 9990;



module.exports = config;