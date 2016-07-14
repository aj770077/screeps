var roleTower = {

    //repairs only now
    /** @param {tower} tower **/
    run: function(tower) {

        //Repairs up to 5000 hp, prioritize everything but roads
        if(tower.energy > 0) {
            //Prioritize everything but walls
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
                    console.log(closest);
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