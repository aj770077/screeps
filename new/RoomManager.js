require('protoype.spawn')();
var RoomManager = {

    /** @param {Creep} creep **/
    run: function(spawnID) {

        var roomSpawn = Game.getObjectById(spawnID);
        var thisRoom = roomSpawn.room;
        if(thisRoom.memory.stage == null){
            var jsonObj = JSON.parse({"stage":1 , "limit": {"energy":200, "harvesters":4, "upgraders":1, "builders":1, "roaders":1} });
            thisRoom.memory.stage = jsonObj;
        }
        var stage = thisRoom.memory.stage;
    
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.room == roomSpawn.room.name);

        var harvesters = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester');
        var harvesters2 = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester2');
        var builders = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(roomCreeps, (creep) => creep.memory.role == 'upgrader');
        var roaders = _.filter(roomCreeps, (creep) => creep.memory.role == 'roader');

        for(i = 0; i < harvesters.length; i++) {
            roleHarvester.run(harvesters[i]);
        }
        for(i = 0; i < harvesters2.length; i++) {
            roleHarvester2.run(harvesters2[i]);
        }
        for(i = 0; i < upgraders.length; i++) {
            roleUpgrader.run(upgraders[i]);
        }
        for(i = 0; i < builders.length; i++) {
            roleBuilder.run(builders[i]);
        }
        for(i = 0; i < roaders.length; i++) {
            roleRoader.run(roaders[i]);
        }


        if(harvesters.length == 0 && harvesters2.length == 0){
            var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
            return;
        }
        if(harvesters.length < thisRoom.memory.stage.limit.harvesters/2){
            var newName = Game.spawns.Spawn1.createBalancedWorkerCreep(stage.limit.energy, 'harvester');
            console.log('Spawning new harvester: ' + newName);
            return;
        }
        if(harvesters2.length < thisRoom.memory.stage.limit.harvesters/2){
            var newName = Game.spawns.Spawn1.createBalancedWorkerCreep(stage.limit.energy, 'harvester2');
            console.log('Spawning new harvester2: ' + newName);
            return;
        }
        if(upgraders.length < thisRoom.memory.stage.limit.upgraders){
            var newName = Game.spawns.Spawn1.createBalancedWorkerCreep(stage.limit.energy, 'upgrader');
            console.log('Spawning new upgrader: ' + newName);
            return;
        }
        if(builders.length < thisRoom.memory.stage.limit.builders){
            var newName = Game.spawns.Spawn1.createBalancedWorkerCreep(stage.limit.energy, 'builder');
            console.log('Spawning new builder: ' + newName);
            return;
        }
        if(roaders.length < thisRoom.memory.stage.limit.roaders){
            var newName = Game.spawns.Spawn1.createBalancedWorkerCreep(200, 'roader');
            console.log('Spawning new roader: ' + newName);
            return;
        }



};

module.exports = RoomManager;