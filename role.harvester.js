var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.carry.energy == 0 && creep.memory.hauling == true){
            creep.memory.hauling = false;
        }
        if(creep.carry.energy < creep.carryCapacity && creep.memory.hauling == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            creep.memory.hauling = true;
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity);
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
                    if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest);
                    }
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
                    if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest);
                    }
                }
                else{
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        if(creep.build(targets[targets.length - 1]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[targets.length - 1]);
                        }
                    }
                    else{
                        creep.memory.hauling = false;
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;