const PropertiesReader = require('properties-reader');
const config = PropertiesReader('src/config/config.properties');

var	nMemcached = require('memcached');
	memcached = new nMemcached(config.get("cache_server") , {poolSize:25 , retries:10 , failures:20});
//	console.log(nMemcached); 
	// each time a server fails 
	memcached.on( "issue", function( issue ){
		console.log( "Issue occured on server " + issue.server + ", " + issue.retries  + " attempts left untill failure" );
	});

	memcached.on( "failure", function( issue ){
		console.log( issue.server + " failed!" );
	});

	memcached.on( "reconnecting", function( issue ){
		console.log( "reconnecting to server: " + issue.server + " failed!" );
	})

/*
	memcached.items( function( err, result ){
		if( err ) console.error( err );
		
		// for each server... 
		result.forEach(function( itemSet ){
			var keys = Object.keys( itemSet );
				keys.pop(); // we don't need the "server" key, but the other indicate the slab id's
				
			keys.forEach(function( stats ){
				
				// get a cachedump for each slabid and slab.number
				memcached.cachedump( itemSet.server, stats, itemSet[stats].number, function( err, response ){
					// dump the shizzle
					console.info( JSON.stringify( response ) );
					console.log( response.key );
				})
			})
		})
	});
*/
	module.exports = memcached;