var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] > creep.carryCapacity - creep.carry.energy));
                }
            });
            if(targets.length > 0) {
                var closest = targets[0];
                for(i = 0; i < targets.length; i++){
                    if(creep.pos.getRangeTo(targets[i]) < creep.pos.getRangeTo(closest)){
                        closest = targets[i];
                    }
                }
                if(creep.withdraw(closest, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }
            }
            else{
                creep.moveTo(Game.flags.Rest1);
                /*if(Game.spawns.Spawn1.energy > 199 && creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
                }
                else{
                    creep.moveTo(Game.flags.Rest1);
                }*/
            }
        }
    }
};

module.exports = roleUpgrader;