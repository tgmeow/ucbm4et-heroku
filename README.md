# UCBMFET Website

The continued development of my Memes website. This and [dnrm-heroku](https://github.com/tgmeow/dnrm-heroku) are essentially the same thing, just different sources and different names. However, development on dnrm-heroku has been paused since I am not currently an admin of the group.

## What is this

A website to view memes better. Pulls data from Facebok groups using Graph API and stores data into an SQL server. Serves the data back as from a Node server in Heroku.

## Major checkpoints reached
* Set up working SQL database and table
* Set up working server that parses user requests and relays the data from SQL to user
* Set up usable front end, leaving some room for growth
* Make front end infinitely scrollable or paginated
* Set up automated method of updating the database
* Add automated error reporting to help maintain the site and watch for any issues


## TODO
* Clean up the server side code and make it more robust/reliable/maintainable !!! (I DON'T KNOW HOW TO JAVASCRIPT HELP)
* Get a bigger SQL server
* Add more options for sorting
* Add more options for dates
* Get an actual url/better hosting (not important)

## How can I make my own version of this?

(Order is not very important, but MUST complete all steps. And I may be missing something...)
* Make a clone of this repo

* Link the application to your clone either by making a new repository on Github or using one of Heroku's tools
* SET UP THE HEROKU APPLICATION
	* Create an Node application on Heroku
	* Add a JawsDB server (the free 5MB is enough for smaller groups)
	* Store the JawsDB login details in the Heroku Config Variables named EXACTLY as shown (SEE IMAGE)
	![CONFIG VARS](https://raw.githubusercontent.com/tgmeow/ucbmfet-heroku/master/pics/ConfigVars.PNG)
	* Add Airbrake for error reporting (optional, but would need changes to this code if it's not included)
	* Store the Airbrake details into the Heroku Config Variables named EXACTLY as shown (SEE IMAGE)
	* Create a table in JawsDB with the following mess. (How to do this? Well.... I used MySQL Workbench to log in to the server. Login details can be found in Heroku by clicking on JawsDB. After logging in to MySQL Workbench, you can see your empty database. Run the following mess in the SQL query tab to create your table.)
	```
	CREATE TABLE `memes` (
  `id` bigint(20) unsigned NOT NULL,
  `message` mediumtext,
  `updated_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  `created_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  `likes` int(8) unsigned NOT NULL,
  `from_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `type` varchar(45) NOT NULL DEFAULT 'Unknown',
  `full_picture` text,
  `last_updated` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `likes` (`likes`),
  KEY `updated_time` (`updated_time`),
  KEY `created_time` (`created_time`,`likes`),
  KEY `from_id` (`from_id`),
  KEY `last_updated` (`last_updated`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 PACK_KEYS=1
	```

	* Log in to Facebook Developers and create an application. 
	* Store the APP ID and APP SECRET in the Heroku Config Variables named EXACTLY as shown (SEE IMAGE)
	* Find the permalink ID of the facebook group that you want to pull data from and store that in the Heroku Config Variables. If it is a public group, you only need to be a member of the group. If it is a closed group, you have to be an admin of the group. If it is a secret group, I THINK you have to be an admin but I am not certain if it will still work.
	* Rename the site titles and headers to what you want
	* Rename the data source URL in MemesList.js
	* Link the clone to the Heroku app by making your own repository (and linking to the original) or using one of the other Heroku tools
	* Pray everything works
	
## License
	I don't really know how this works but
	You may: copy, share, modify, use privately
	You may not: modify these licensing terms, use anything here for commercial purposes, hold anyone liable for anything related to this, or expect any kind of warranty.
	Note: I may be violating some terms and services of the Facebook API with this application but I have no idea if I actually am.
	
