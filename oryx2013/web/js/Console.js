var Console = {
	messages: [],
	
	newMessage: function(text, color, type){
		var m = {
			text: text,
			color: color,
			repeats: 1,
			base: text,
			type: type
		};
		
		if (this.getLastMessageType() == type && type == "stepped"){
			this.messages[this.messages.length - 1].text = "You stepped on various items!";
		}else{
			this.messages.push(m);
		}
		
		while (this.messages.length > 3){
			this.messages.splice(0,1);
		}
	},
	
	addMessage: function(text, color, type){
		if (!type) type = "";
		if (this.messages.length > 0){
			var lm = this.messages[this.messages.length - 1];
			if (lm.base == text){
				lm.repeats++;
				lm.text = lm.base + " (x" + lm.repeats + ")";
			}else{
				this.newMessage(text, color, type);
			}
		}else{
			this.newMessage(text, color, type);
		}
	},
	
	removeLastMessage: function(){
		if (this.messages.length == 0) return;
		
		return this.messages.pop();
	},
	
	getLastMessageType: function(){
		if (this.messages.length == 0) return "";
		
		return this.messages[this.messages.length - 1].type;
	}
};
