var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRoader = require('role.roader');
var roleTower = require('role.turret');
var roleRoomHarvester = require('role.roomharvester');
var roleReserve = require('role.reserve');
var roleWarrior = require('role.warrior');
var roleHealer = require('role.healer');

//Main loop handles finding all creeps and issuing orders
//This file also handles any spawning required.
module.exports.loop = function () {;
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var roads = Game.rooms.E47N9.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER);
                    }
            });
    if (roads.length > 0){
        roleTower.run(roads[0]);
        roleTower.run(roads[1]);
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var roaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'roader');
    var roomharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'roomharvester');
    var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');
    var warriors = _.filter(Game.creeps, (creep) => creep.memory.role == 'warrior');
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    
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
        if(creep.memory.role == 'roomharvester') {
            roleRoomHarvester.run(creep);
        }
        if(creep.memory.role == 'reserver') {
            roleReserve.run(creep);
        }
        if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
    }


    if(harvesters.length == 0 && harvesters2.length == 0){
        var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        return;
    }
    if(harvesters.length < 2){
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
        return;
    }
    if(harvesters2.length < 2){
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester2'});
        console.log('Spawning new harvester2: ' + newName);
        return;
    }
    if(warriors.length < 0){
        var newName = Game.spawns.Spawn1.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], undefined, {role: 'warrior'});
        console.log('Spawning new Warrior: ' + newName);
        return;
    }
    /*
    if(healers.length < 3){
        var newName = Game.spawns.Spawn1.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, HEAL, HEAL, HEAL, MOVE, MOVE, MOVE], undefined, {role: 'healer'});
        console.log('Spawning new Healer: ' + newName);
        return;
    }
    */
    if(upgraders.length < 3){
        //var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
        return;
    }
    var anySites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES);
    if(anySites.length > 0){
        if(builders.length < 0){
        //var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
            return;
        }
    }
    if(reservers.length < 0){
        var newName = Game.spawns.Spawn1.createCreep([MOVE, MOVE, CLAIM, CLAIM], undefined, {role: 'reserver'});
        console.log('Spawning new reserver: ' + newName);
        return;
    }
    if(roomharvesters.length < 0){
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'roomharvester'});
        console.log('Spawning new out of room harvester: ' + newName);
        return;
    }
    if(roaders.length < 0){
        var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'roader'});
        console.log('Spawning new roader: ' + newName);
        return;
    }

}