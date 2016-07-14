var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRoader = require('role.roader');
var roleTower = require('role.turret');

//Main loop handles finding all creeps and issuing orders
//This file also handles any spawning required.
module.exports.loop = function () {;
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    roleTower.run(Game.structures["5786da4721f6060d39b2452a"]);
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var roaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'roader');
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'roader') {
            roleRoader.run(creep);
        }
    }
    if(harvesters.length == 0 && harvesters2.length == 0){
        var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        return;
    }
    if(harvesters.length < 3){
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
        return;
    }
    if(harvesters2.length < 3){
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'harvester2'});
        console.log('Spawning new harvester2: ' + newName);
        return;
    }
    if(upgraders.length < 2){
        //var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
        return;
    }
    if(builders.length < 2){
        //var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
        return;
    }
    if(roaders.length < 0){
        var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'roader'});
        console.log('Spawning new roader: ' + newName);
        return;
    }
}