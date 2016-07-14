var roleRoader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building2 && creep.carry.energy == 0) {
            creep.memory.building2 = false;
            creep.memory.target = null;
        }
        if(!creep.memory.building2 && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building2 = true;
        }

        if(creep.memory.building2) {
            //Prioritize everything but walls
            var roads = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType != STRUCTURE_WALL) && (structure.hits < 5000));
                        //return (structure.hits < structure.hitsMax);
                    }
            });
            if(roads.length > 0) {
                var closest = roads[0];
                    for(i = 0; i < roads.length; i++){
                        if(creep.pos.getRangeTo(roads[i]) < creep.pos.getRangeTo(closest)){
                            closest = roads[i];
                        }
                    }
                    creep.memory.target = closest;
            }
            else{
                //now check if there is a wall that could be repaired
                var roads = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < 5000);
                        //return (structure.hits < structure.hitsMax);
                    }
                });
                if(roads.length > 0) {
                    var closest = roads[0];
                    for(i = 0; i < roads.length; i++){
                        if(creep.pos.getRangeTo(roads[i]) < creep.pos.getRangeTo(closest)){
                            closest = roads[i];
                        }
                    }
                    creep.memory.target = closest;
                }
                else{
                    creep.moveTo(Game.flags.Rest1);
                }
            }
            if(creep.memory.target != null && creep.repair(creep.memory.target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.memory.target);
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
            
            if(Game.spawns.Spawn1.energy > 310){
                if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY,50 - creep.carry.energy) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.spawns.Spawn1);
                }
            }
            else{
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 50);
                    }
                });
                if(targets.length > 0) {
                    //This code finds the closest object from a target list
                    var closest = targets[0];
                    for(var container in targets){
                        if(creep.pos.getRangeTo(container) < creep.pos.getRangeTo(closest)){
                            closest = container;
                        }
                    }
                    if(creep.withdraw(closest, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest);
                    }
                }
                else{
                    creep.moveTo(Game.flags.Rest1);
                }
            }
        }
    }
};

module.exports = roleRoader;