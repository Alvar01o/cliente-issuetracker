var	nMemcached = require( '../' ),
	memcached;

	// Set a global configuration:
	nMemcached.config.poolSize = 25;
	
	memcached = new nMemcached( "10.211.55.5:11211" );
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