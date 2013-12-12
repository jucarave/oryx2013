var FOV = {
	position: null,
	map: null,
	distance: 0,
	nodes: [],
	
	getFOV: function(position, map, distance){
		this.nodes = [];
		this.position = position;
		this.map = map;
		this.distance = distance;
		
		this.createNode(position.clone(), new Position(0, -1), distance);
		this.createNode(position.clone(), new Position(0, 1), distance);
		
		this.execute();
	},
	
	createNode: function(position, dir, dis){
		var node = {
			position: position,
			dir: dir,
			life: dis
		};
		
		this.nodes.push(node);
	},
	
	createSideNode: function(parentNode){
		if (parentNode.life <= 1) return;
		
		if (parentNode.dir.y != 0){
			var pos = parentNode.position.clone(); pos.sum(1, 0);
			this.createNode(pos, parentNode.dir, parentNode.life - 1);
			
			pos = parentNode.position.clone(); pos.sum(-1, 0);
			this.createNode(pos, parentNode.dir, parentNode.life - 1);
		}
	},
	
	execute: function(){
		while (this.nodes.length > 0){
			var node = this.nodes[0];
			
			while (node.life > 0){
				this.map.setVisible(node.position, 2);
				if (this.map.isSolid(node.position, true)){
					node.life = 0;
				}
				
				this.createSideNode(node);
				
				node.position.sum(node.dir);
				node.life--;
			}
			
			this.nodes.splice(0,1);
		}
	}
};
