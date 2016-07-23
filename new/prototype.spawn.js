module.exports = function() {
	
	StructureSpawn.prototype.createBalancedWorkerCreep =
		function(energy, roleName) {
			var numberOfParts = Math.floor(energy / 200);
			var body = [];
			for (var  i = 0; i < numberOfParts; i++){
				body.push(WORK);
			} 
			for (var  i = 0; i < numberOfParts; i++){
				body.push(CARRY);
			} 
			for (var  i = 0; i < numberOfParts; i++){
				body.push(MOVE);
			} 

			if(numberOfParts >= 1){
				this.createCreep(body, undefined, {role: roleName, room: this.room.name, working: false});
			}
		};

}