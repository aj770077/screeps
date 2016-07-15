var roleroomharvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.room != Game.flags.moveTo1.room && creep.carry.energy == 0){
            creep.moveTo(Game.flags.moveTo1);  
            return;
        }
        else if(creep.room != Game.spawns.Spawn1.room && creep.carry.energy == creep.carryCapacity){
            creep.moveTo(Game.spawns.Spawn1)
            return;
        }
        
        if(creep.carry.energy == 0 && creep.memory.hauling == true){
            creep.memory.hauling = false;
            creep.memory.target = null;
        }
        if(creep.carry.energy < creep.carryCapacity && creep.memory.hauling == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if (creep.memory.target == null) {
            creep.memory.hauling = true;
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                var closest = targets[0];
                for(i = 0; i < targets.length; i++){
                    if(creep.pos.getRangeTo(targets[i]) < creep.pos.getRangeTo(closest)){
                        closest = targets[i];
                    }
                }
                creep.memory.target = closest;
            }
            else{
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
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
                    creep.memory.target = closest;
                }
                else{
                    creep.memory.hauling = false;
                }
            }
        }
        if(creep.memory.target){
            var target = Game.getObjectById(creep.memory.target.id);
            var err = creep.transfer(target, RESOURCE_ENERGY);
            if(err == OK){
                creep.memory.target = null;
            }
            else if(err == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                if(target.structureType != STRUCTURE_CONTAINER){
                    if(target.energy = target.energyCapacity){
                        creep.memory.target = null;
                    }
                }
                else{
                    if(target.store[RESOURCE_ENERGY] = target.storeCapacity){
                        creep.memory.target = null;
                    }
                }
            }
            else if(err == ERR_FULL){
                creep.memory.target = null;
            }
        }
    }
};

module.exports = roleroomharvester;