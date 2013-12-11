var RDG = {
	newMap: function(level){
		var numberOfRooms = level * 2; + Math.round(Math.random()*3);
		
		var rooms = [];
		var root = this.newRoom();
		for (var i=0;i<numberOfRooms-1;i++){
			rooms.push(this.newRoom());
		}
		rooms.push(root);
		
		this.checkCollisions(rooms);
		
		return rooms;
	},
	
	newRoom: function(){
		var x = Math.round(Math.random()*100);
		var y = Math.round(Math.random()*100);
		var width = Math.round(Math.random()*10);
		var height = Math.round(Math.random()*10);
		
		var room = {
			x: x,
			y: y,
			w: width,
			h: height
		};
		
		return room;
	},
	
	roomsCollide: function(room1, room2){
		console.log("f");
		if (room1.x+room1.w < room2.x || room1.x > room2.x+room2.w || room1.y+room1.h < room2.y || room1.y > room2.y+room2.h){
			return false;
		}
		return true;
	},
	
	checkCollisions: function(rooms){
		for (var i=0;i<rooms.length;i++){
			for (var j=0;j<rooms.length;j++){
				if (i == j) continue;
				
				var room1 = rooms[i];
				var room2 = rooms[i];
				
				while (this.roomsCollide(room1, room2)){
					if (room1.y+room1.h < room2.y){ room1.y = room2.y - room1.h - 5; }else
					if (room1.x+room1.w < room2.x){ room1.x = room2.x - room1.w - 5; }else
					if (room1.y > room2.y + room2.h){ room1.y = room2.y + room2.h + 5; }else
					if (room1.x > room2.x + room2.w){ room1.x = room2.x + room2.w + 5; }
				}
			}
		}
	}
};
