var PathFinder = {
	path: null,
	nodes: null,
	position: null,
	destiny: null,
	map: null,
	total: 0,
	
	newNode: function(x, y, parent){
		var id = this.nodes.length;
		var node = new Position(x, y);
		node.parent = parent;
		node.id = id;
		
		if (this.getNodeAt(node)) return;
		this.nodes.push(node);
	},
	
	setMainNodes: function(){
		this.nodes = [];
		this.newNode(this.position.x, this.position.y, null);
		
		this.total += 5;
	},
	
	getNodeAt: function(node){
		for (var i=0;i<this.nodes.length;i++){
			if (this.nodes[i].id == node.id) continue;
			
			if (this.nodes[i].equals(node)){
				return this.nodes[i];
			}
		}
		
		return null;
	},
	
	createSiblings: function(node){
		this.newNode(node.x, node.y - 1, node);
		this.newNode(node.x + 1, node.y, node);
		this.newNode(node.x, node.y + 1, node);
		this.newNode(node.x - 1, node.y, node);
		
		this.total += 4;
	},
	
	getPath: function(position, destiny, map){
		this.position = position;
		this.destiny = destiny;
		this.map = map;
		
		this.setMainNodes();
		var path = this.exec();
		
		return path;
	},
	
	makePath: function(node){
		var path = [];
		while (node != null){
			path.push(node);
			node = node.parent;
		}
		
		path.pop();
		return path.reverse();
	},
	
	exec: function(){
		var path = null;
		while (this.nodes.length > 0){
			var node = this.nodes[0];
			
			if (this.destiny.equals(node)){
				path = node;
				break;
			}
			
			if (!this.map.isSolid(node, true))
				this.createSiblings(node);
				
			this.nodes.splice(0,1);
		}
		
		if (path != null){
			path = this.makePath(path);
			this.total = 0;
			this.nodex = null;
		}
		
		return path;
	}
};
