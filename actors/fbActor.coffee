{Actor} = require "hubiquitus"
class fbActor extends Actor
	
	constructor: (topology) ->
		super
		@type = "fbActor"
	
	onMessage: (hMessage) ->
		@log "info", hMessage.payload.name + "'likes : " + hMessage.payload.likes

module.exports = fbActor