//heroku deployment specific config file

//holds data for node server
var config = {};

// FB GRAPH info
config.graph = {};
config.graph.perma_token = process.env.GRAPH_ID + "|" + process.env.GRAPH_SECRET;

//facebook directory
config.fb = {};
config.fb.groupID = process.env.FB_GROUP_ID;
config.fb.groupPath = '/feed';		//where I'm getting data from.

//feed options
config.feed = {};
config.feed.limitCount = 100;     //how many feed items per page
//What data to request from facebook
config.feed.groupOptions = '?fields=from,created_time,updated_time,message,object_id,type,full_picture,reactions.limit(0).summary(1)&limit=' + config.feed.limitCount;

//options for updating data
config.update = {};
config.update.minLikes = 500;	//GIVEN THE 5MB LIMIT AND NUMBER OF POSTS, I NEED A MIN NUMBER OF LIKES TO STAY UNDER THE LIMIT
config.update.increment = 100;
config.update.likesOptions = '?fields=reactions.limit(0).summary(1)';	//likes for each post

//options for http requests
config.http = {};
config.http.options = {
    timeout:  15000,
    pool:     { maxSockets:  Infinity }, //Infinity
    headers:  { connection:  'keep-alive' }
};


//DB info
config.db = {};

//db table name
config.db.tableName = process.env.JAWSDB_TBNAME;

//db login info
config.db.connectionOp =
    {
        connectionLimit: 10,			//Max connections default 10
        host: process.env.JAWSDB_HOST,	//Host URL for the db
        port: process.env.JAWSDB_PORT,	//database port
        timezone: '-0000',				//conversion to local time is done on client side
        user: process.env.JAWSDB_USER,				//db user
        password: process.env.JAWSDB_PASS,			//db pass
        database: process.env.JAWSDB_DEFAULTDB,		//db name
        charset: 'utf8mb4'				//utf8mb4 allows for emojis, whereas utf8 does not
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