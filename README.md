# CommandBus
Command bus, require.js enabled.

## Installation

### Via Bower

	bower install command-bus --save
	
## Usage

	require([
		'command-bus'
	], function (CommandBus) {
		var bus = new CommandBus();
		
		bus.setGlobalDependencies({
			sdk: {...}
		});
		
		bus.setHandlers({
			'get-user': {
				'dependencies': {},
				handler: function (dependencies, args, callback) {
					[...]
				}
			}
		});
		
		bus.handle('get-user', function (data, err) {
			[...]
		});
	});
