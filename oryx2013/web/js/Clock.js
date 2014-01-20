var Clock = {
	day: 1,
	hour: 8,
	minute: 0,
	
	addMinute: function(){
		this.minute += 1;
		
		if (this.minute == 60){
			this.minute = 0;
			this.hour += 1;
			
			if (this.hour == 24){
				this.hour = 0;
				this.day += 1;
			}
		}
	},
	
	addHours: function(amount){
		this.hour += amount;
		this.minute = 0;
		while (this.hour >= 24){
			this.hour -= 24;
			this.day += 1;
		}
	}
};
