var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.room != Game.flags.moveTo1.room){
            creep.moveTo(Game.flags.moveTo1);  
            return;
        }
        else{
            
            /*
            if(Game.getObjectById('5784b540b7439dcc48f8ebea') != null){
                if(creep.attack(Game.getObjectById('5784b540b7439dcc48f8ebea') == ERR_NOT_IN_RANGE)){
                    creep.moveTo(Game.getObjectById('5784b540b7439dcc48f8ebea'));
                    return;
                }
            }
            if(Game.getObjectById('5784b549510d5dbd5c847181') != null){
                if(creep.attack(Game.getObjectById('5784b549510d5dbd5c847181') == ERR_NOT_IN_RANGE)){
                    creep.moveTo(Game.getObjectById('5784b549510d5dbd5c847181'));
                    return;
                }
            }
            */
            var targets = creep.room.find(FIND_HOSTILE_CREEPS);
            if(targets.length > 0) {
                var best = targets[0]
                for(i = 0; i < targets.length; i++){
                    if(targets[i].owner.username == "Nataru"){
                        continue;
                    }
                    if(creep.pos.getRangeTo(targets[i]) < creep.pos.getRangeTo(best)){
                        best = targets[i]
                    }
                }
                if (best.owner.username != "Nataru"){
                    if (creep.attack(best == ERR_NOT_IN_RANGE)){
                        creep.moveTo(best);
                    }
                }
            }
            else{
                creep.moveTo(Game.flags.moveTo1);
            }
        }
    }
};

module.exports = roleWarrior;