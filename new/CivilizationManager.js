var RoomManager = require('RoomManager');


var CivilizationManager = {

    /** @param {Creep} creep **/
    run: function() {


    //IF this is the first of the new civilization...  
    if(Memory.activeRooms == null){
        var jsonObj = JSON.parse('{ "activeRooms": [' +
                     '{"roomName":"' + Game.spawns.Spawn1.room.name + '" , "spawnID":"' + Game.spawns.Spawn1.id '" }]}' );

        Memory.activeRooms = jsonObj;
    }

    var rooms = JSON.parse(Memory.activeRooms);

    //Run each Rooms own manager (maybe add extra values later for Civilization Requests)
    for(var i; i < rooms.activeRooms.length; i++){
        RoomManager.run(rooms.activeRooms[i].spawnID);
    }


};

module.exports = CivilizationManager;