function Lasor(shooter, target){
	var lasor = lasorData(shooter);

	this.draw = drawLasor;
	this.destroy = false;

	function drawLasor(canvas){
		
		var ctx = canvas;
		
		ctx.save()
		ctx.fillStyle = "#F00";
		if(lasor != null){ ctx.fillRect(lasor.x,lasor.y,3,3);}
		ctx.restore();
	}

	function updateLasor(){
		if(lasor.type != "PLAYER")
			updateEnemyLasorPosition();
		else
			updatePlayerLasor();
	}

	function lasorData(ship){
		return {
			type: ship.type(),
			angle: (target == null)? 0 : angleBetweenObjects(shooter, target),
			origin:{
				x: ship.locationX() + (ship.width()/2),
				y: ship.locationY() + ship.height()
			},
			x: ship.locationX() + (ship.width()/2),
			y: ship.locationY() + ship.height()
		};
	}

	function updateEnemyLasorPosition(){

		if(lasor == null) return;
		if(lasor.y > FRAMEHEIGHT){
			this.destroy = true;
			return;
		}

		var originY = lasor.origin.y;
    	var originX = lasor.origin.x;
		var angle = lasor.angle;
    	var lasorMoveY = lasor.y + 1;
    	lasor.y = lasorMoveY;

    	var lasorMoveX = originX + ((originY - lasorMoveY)*Math.tan(angle));
    	lasor.x = lasorMoveX;

	}

	function updatePlayerLasor(){
		if(lasor.y < 0){
			lasor.destroy = true;
			return;
		}
    	
    	lasor.y = lasor.y - 5;
	}	

	function angleBetweenObjects(obj1, obj2){
		var e1x = parseInt(Math.abs(obj1.locationX()));
		var e2x = parseInt(Math.abs(obj2.locationX()));
		var e1y = parseInt(Math.abs(obj1.locationY()));
		var e2y = parseInt(Math.abs(obj2.locationY()));

		var rise = e1y - e2y;
		var run = e1x - e2x;
		var angle = -Math.atan(run/rise);
		return angle;

	}																						
}

define(function(){ return Lasor; });