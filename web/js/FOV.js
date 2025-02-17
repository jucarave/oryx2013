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
		
		this.createNode(position.clone(), new Position(0, -1), distance, false);
		this.createNode(position.clone(), new Position(0, 1), distance, false);
		this.createNode(position.clone(), new Position(1, 0), distance, false);
		this.createNode(position.clone(), new Position(-1, 0), distance, false);
		
		this.createNode(position.clone(), new Position(-1, -1), distance - 2, true);
		this.createNode(position.clone(), new Position(1, -1), distance - 2, true);
		this.createNode(position.clone(), new Position(-1, 1), distance - 2, true);
		this.createNode(position.clone(), new Position(1, 1), distance - 2, true);
		
		this.execute();
	},
	
	createNode: function(position, dir, dis, sibling){
		var node = {
			position: position,
			dir: dir,
			life: dis,
			sibling: sibling
		};
		
		this.nodes.push(node);
	},
	
	isNodeAt: function(position){
		for (var i=0,len=this.nodes.length;i<len;i++){
			if (this.nodes[i].position.equals(position)){
				return true;
			}
		}
		
		return false;
	},
	
	createSideNode: function(parentNode){
		if (!parentNode.sibling) return;
		if (parentNode.life <= 1) return;
		
		var pos = parentNode.position.clone();
		var dir = new Position(parentNode.dir.x, 0);
		var life = (parentNode.life % 2 == 0)? parentNode.life : parentNode.life + 1;
		this.createNode(pos, dir, life);
		
		pos = parentNode.position.clone();
		dir = new Position(0, parentNode.dir.y);
		this.createNode(pos, dir, life);
	},
	
	execute: function(){
		while (this.nodes.length > 0){
			var node = this.nodes[0];
			
			while (node.life > 0){
				this.map.setVisible(node.position, 2);
				
				if (this.map.isSolid(node.position, true)){
					node.life = 0;
				}else{
					this.createSideNode(node);
				}
				
				node.position.sum(node.dir);
				node.life--;
			}
			
			this.nodes.splice(0,1);
		}
	}
};
