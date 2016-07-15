var roleReserve = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room != Game.flags.moveTo1.room){
            creep.moveTo(Game.flags.moveTo1);  
            return;
        }
        else{
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleReserve;