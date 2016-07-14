var roleTower = {

    //repairs only now
    /** @param {tower} tower **/
    run: function(tower) {

        //Repairs up to 5000 hp, prioritize everything but roads
        if(tower.energy > 0) {
            var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
            if(enemies.length > 0){
                var best = enemies[0];
                var bestheur = 0;
                for(i = 0; i < enemies.length; i++){
                    var distance = tower.pos.getRangeTo(enemies[i]);
                    var dps = 600 - 30*(distance - 5);
                    if(dps < 150){
                        dps = 150;
                    }
                    var enemyHits = enemies[i].hits;
                    var temp = 0;
                    if(distance <= 5){ temp += 3; } //If its close, assign high priority (High threat, and high DPS)
                    if(distance > 5) { temp += (1/(distance - 5)); } //Assign priority scaling with distance (farther away, lower priority)
                    temp += 1/(~~(enemyHits/dps));
                    if(temp > bestheur){
                        bestheur = temp;
                        best = enemies[i];
                    }
                }
                tower.attack(best);
                return;
            }
            //Prioritize everything but roads
            var roads = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType != STRUCTURE_TOWER && structure.structureType != STRUCTURE_ROAD) && (structure.hits < structure.hitsMax) && structure.hits < 5000);
                        //return (structure.hits < structure.hitsMax);
                    }
            });
            if(roads.length > 0) {
                var closest = roads[0];
                    for(i = 0; i < roads.length; i++){
                        if(tower.pos.getRangeTo(roads[i]) < tower.pos.getRangeTo(closest)){
                            closest = roads[i];
                        }
                    }
                    tower.repair(closest);
            }
            else{
                var roads = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_ROAD) && (structure.hits < structure.hitsMax));
                        //return (structure.hits < structure.hitsMax);
                    }
                });
                if(roads.length > 0) {
                    var closest = roads[0];
                        for(i = 0; i < roads.length; i++){
                            if(tower.pos.getRangeTo(roads[i]) < tower.pos.getRangeTo(closest)){
                                closest = roads[i];
                            }
                        }
                    tower.repair(closest);
                }
            }
        }
        else {
            return;
        }
    }
};

module.exports = roleTower