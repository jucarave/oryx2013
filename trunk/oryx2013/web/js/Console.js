var Console = {
	messages: [],
	
	newMessage: function(text, color){
		var m = {
				text: text,
				color: color,
				repeats: 1,
				base: text
			};
			
			this.messages.push(m);
	},
	
	addMessage: function(text, color){
		if (this.messages.length > 0){
			var lm = this.messages[this.messages.length - 1];
			if (lm.base == text){
				lm.repeats++;
				lm.text = lm.base + " (x" + lm.repeats + ")";
			}else{
				this.newMessage(text, color);
			}
		}else{
			this.newMessage(text, color);
		}
	}
};
