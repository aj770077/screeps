var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var roads = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD) && (structure.hits < structure.hitsMax * 0.5);
                    }
            });
            if(roads.length > 0) {
                if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roads[0]);
                }
            }
            else{
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                else{
                    creep.moveTo(Game.flags.moveTo2);
                }
            }
        }
        else {
            /*
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
            });
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            */
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 50);
                }
            });
            if(targets.length > 0) {
                //This code finds the closest object from a target list
                var closest = targets[0];
                for(i = 0; i < targets.length; i++){
                    if(creep.pos.getRangeTo(targets[i]) < creep.pos.getRangeTo(closest)){
                        closest = targets[i];
                    }
                }
                if(creep.withdraw(closest, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }
            }
            else{
                creep.moveTo(Game.flags.Rest1);
                /*if(Game.spawns.Spawn1.energy > 199 && creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
                }*/
            }
        }
    }
};

module.exports = roleBuilder;