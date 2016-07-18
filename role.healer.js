var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.room != Game.flags.moveTo3.room){
            creep.moveTo(Game.flags.moveTo3);  
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
            }*/
            var targets = creep.room.find(FIND_MY_CREEPS);
            if(targets.length > 0) {
                var best = targets[0];
                var heur = 0;
                for(i = 0; i < targets.length; i++){
                    var thisheur = 0
                    if(targets[i] == creep){
                        continue;
                    }
                    if(creep.pos.getRangeTo(targets[i]) <= 1){
                    }
                    else{
                        thisheur = thisheur + 5 + creep.pos.getRangeTo(targets[i]);
                    }
                    if(targets[i].hitsMax - targets[i].hits <= 20){
                        thisheur = 999;
                    }
                    else{
                        thisheur = thisheur + 100*(1/(targets[i].hitsMax - targets[i].hits))
                    }
                    if(thisheur < heur){
                        heur = thisheur;
                        best = targets[i];
                    }
                }
                if(creep.heal(best) != 0){
                    creep.moveTo(best);
                }
                else{
                    creep.moveTo(best);
                }
            }
            else{
                creep.moveTo(Game.flags.moveTo3);
            }
        }
    }
};

module.exports = roleHealer;