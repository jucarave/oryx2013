var RDG = {
	rooms: [],
	map: [],
	conn: [],
	level: 0,
	
	newMap: function(level){
		var numberOfRooms = level * 2 + Math.iRandom(2);
		var minSize = 5;
		var maxSize = 10;
		
		this.level = level;
		this.rooms = [];
		this.map = [];
		this.con = [];
		
		var width = 60;
		var height = 60;
		
		if (level < 6){
			width = 30;
			height = 30;
		}
		
		var fail = 0;
		for (var i=0;i<numberOfRooms;i++){
			if (fail == 20){
				fail = 0;
				continue;
			}
			var x = Math.iRandom(2, width - 4);
			var y = Math.iRandom(2, height - 4);
			var w = Math.iRandom(minSize, maxSize);
			var h = Math.iRandom(minSize, maxSize);
			
			var room = {
				x: x,
				y: y,
				w: w,
				h: h
			};
			
			if (this.roomCollides(room, i)){
				fail++;
				i--;
				continue;
			}
			
			this.rooms.push(room);
		}
		
		this.squashRooms();
		
		var roomSize = this.getMapSize();
		
		for (var y=0;y<roomSize.h;y++){
			this.map[y] = [];
			for (var x=0;x<roomSize.w;x++){
				this.map[y][x] = 0;
			}
		}
		
		this.buildCorridors();
		this.fillRooms();
		this.buildWalls();
		this.setPlayer();
		this.setExit();
		this.setGarbage();
		
		return this.map;
	},
	
	roomCollides: function(room, ignore){
		for (var i=0;i<this.rooms.length;i++){
			if (i == ignore) continue;
			
			var room2 = this.rooms[i];
			
			if (!(room.x+room.w < room2.x || room.y+room.h < room2.y || room.x > room2.x+room2.w || room.y > room2.y+room2.h)){
				return true;
			}
		}
		
		return false;
	},
	
	squashRooms: function(){
		for (var j=0;j<5;j++){
			for (var i=0,len=this.rooms.length;i<len;i++){
				var room = this.rooms[i];
				
				var oldPos = {
					x: room.x,
					y: room.y
				};
				
				if (room.x > 2) room.x -= 1;
				if (room.y > 2) room.y -= 1;
					
				if (this.roomCollides(room, i)){
					room.x = oldPos.x;
					room.y = oldPos.y;
				}
			}
		}
	},
	
	buildCorridors: function(){
		for (var j=0;j<2;j++){
			for (var i=0,len=this.rooms.length;i<len;i++){
				var room1 = this.rooms[i];
				var room2 = this.findNearestRoom(room1, i);
				
				if (!room2) continue;
				
				var pointA = {
					x: Math.iRandom(room1.x + 1, room1.x + room1.w - 2),
					y: Math.iRandom(room1.y + 1, room1.y + room1.h - 2)
				};
				
				var pointB = {
					x: Math.iRandom(room2.x + 1, room2.x + room2.w - 2),
					y: Math.iRandom(room2.y + 1, room2.y + room2.h - 2)
				};
				
				while ((pointA.x != pointB.x) || (pointA.y != pointB.y)){
					if (pointA.x != pointB.x){
						if (pointA.x < pointB.x) pointA.x += 1; else pointA.x -= 1;
					}else if (pointA.y != pointB.y){
						if (pointA.y < pointB.y) pointA.y += 1; else pointA.y -= 1;
					}
					
					this.map[pointA.y][pointA.x] = 1;
				}
			}
		}
	},
	
	isConnected: function(room1, room2){
		var con1 = room1 + "_" + room2;
		var con2 = room2 + "_" + room1;
		for (var i=0;i<this.con.length;i++){
			if (this.con[i] == con1 || this.con[i] == con2){
				return true;
			}
		}
		
		return false;
	},
	
	findNearestRoom: function(room, ignore){
		var minDist = -1;
		var nearRoom = null;
		var con = -1;
		
		var mid = {
			x: room.x + (room.w / 2),
			y: room.y + (room.h / 2)
		};
		
		for (var i=0;i<this.rooms.length;i++){
			if (i == ignore) continue;
			
			var r = this.rooms[i];
			var mid2 = {
				x: r.x + (r.w / 2),
				y: r.y + (r.h / 2)
			};
		
			var dist = Math.abs(mid.x - mid2.x) + Math.abs(mid.y - mid2.y);
			if (this.level >= 10 && dist > 23) continue;
			
			if (this.isConnected(ignore, i))
				continue;
			
			if (minDist == -1 || dist < minDist){
				minDist = dist;
				nearRoom = r;
				con = i;
				continue;
			}
		}
		
		this.con.push(ignore + "_" + con);
		return nearRoom;
	},
	
	fillRooms: function(){
		for (var i=0,len=this.rooms.length;i<len;i++){
			var room = this.rooms[i];
			
			for (var y=room.y;y<room.y+room.h;y++){
				for (var x=room.x;x<room.x+room.w;x++){
					this.map[y][x] = 1;
				}
			}
		}
	},
	
	setPlayer: function(){
		var room;
		while (!room){
			room = this.rooms[Math.iRandom(0, this.rooms.length)];
		}
		
		room.f = 'p';
		
		while (true){
			var x = Math.iRandom(room.x+1, room.x+room.w-2);
			var y = Math.iRandom(room.y+1, room.y+room.h-2);
			
			var t1 = this.map[y][x];
			var t2 = this.map[y][x+1];
			var t3 = this.map[y+1][x];
			
			if (t1 == t2 && t1 == t3){
				this.map[y][x] = -3;
				this.map[y][x+1] = -1;
				break;
			}
		}
	},
	
	setExit: function(){
		var room;
		while (!room){
			room = this.rooms[Math.iRandom(0, this.rooms.length)];
			if (room && room.f == 'p') room = null;
		}
		
		room.f = 'e';
		
		var x = Math.iRandom(room.x+1, room.x+room.w-2);
		var y = Math.iRandom(room.y+1, room.y+room.h-2);
		
		this.map[y][x] = -2;
	},
	
	buildWalls: function(){
		var player = false;
		for (var y=1;y<this.map.length-1;y++){
			for (var x=1;x<this.map[y].length-1;x++){
				var tile = this.map[y][x];
				if (tile != 0){ continue; }
				var tileN = (Math.iRandom(5) == 3)? 4 : 2;
				
				var lt = this.map[y][x-1];
				var rt = this.map[y][x+1];
				var tt = this.map[y-1][x];
				var bt = this.map[y+1][x];
				
				if (bt != 1){ tileN = 2; }
				
				if (lt == 1 || rt == 1 || tt == 1 || bt == 1){
					this.map[y][x] = tileN;
					continue;
				}
				
				var lt = this.map[y-1][x-1];
				var rt = this.map[y-1][x+1];
				var tt = this.map[y+1][x-1];
				var bt = this.map[y+1][x+1];
				
				if (lt == 1 || rt == 1 || tt == 1 || bt == 1){
					this.map[y][x] = tileN;
					continue;
				}
			}
		}
	},
	
	getMapSize: function(){
		var maxW = this.rooms[0];
		var maxH = this.rooms[0];
		
		for (var i=1,len=this.rooms.length;i<len;i++){
			var room = this.rooms[i];
			
			if (room.x >= maxW.x + maxW.w){
				maxW = room;
			}else if (room.x + room.w >= maxW.x + maxW.w){
				maxW = room;
			}
			
			if (room.y >= maxH.y + maxH.h){
				maxH = room;
			}else if (room.y + room.h >= maxH.y + maxH.h){
				maxH = room;
			}
		}
		
		if (maxW.x < 20) maxW.x = 22;
		if (maxH.y < 8) maxH.x = 9;
		
		return {w: maxW.x + maxW.w + 5, h: maxH.y + maxH.h + 5};
	},
	
	setGarbage: function(){
		var n = this.rooms.length + Math.iRandom(this.rooms.length * 3);
		
		var room;
		for (var i=0;i<n;i++){
			while (!room){
				room = this.rooms[Math.iRandom(0, this.rooms.length)];
			}
			
			var x = Math.iRandom(room.x, room.x + room.w - 1);
			var y = Math.iRandom(room.y, room.y + room.h - 1);
			
			var tile = this.map[y][x];
			if (tile <= 0) continue;
			
			var nTile = Math.iRandom(5, 9);
			if (this.map[y][x] instanceof Array){
				this.map[y][x].push(nTile);
			}else{
				this.map[y][x] = [this.map[y][x], nTile];
			}
			
			room = null;
		}
	}
};


function mapToText(map){
	var text = "";
	for (var y=0;y<map.length;y++){
		for (var x=0;x<map[y].length;x++){
			text += map[y][x];
		}
		
		text += "\n";
	}
	
	console.log(text);
}

