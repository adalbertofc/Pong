
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    velocidad:null,
    dirX:0,
    dirY:0,
    score1:0,
    score2:0,
    
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        this.dirX = this.random(-3,3);
        this.dirY = this.random(-3,3);
        this.velocidad = this.random(0.0001,0.0001);

        this.jugador1 =  new cc.DrawNode();
        this.jugador1.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 1);

        this.jugador2 =  new cc.DrawNode();
        this.jugador2.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.pelota =  new cc.DrawNode();
        this.pelota.drawCircle(cc.p(0,0),5,0,100,false,10,color);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 1);

        this.puntuacion1 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
    },
    
    move: function(keyCode, event){
        var size = cc.winSize;
        var evento = event.getCurrentTarget();
      
        //mover jugador 1    
        if(keyCode == cc.KEY.w){
            if(evento.jugador1.getPositionY() + 40 < size.height - 40)
                evento.jugador1.setPosition(evento.jugador1.getPositionX(), evento.jugador1.getPositionY() + 40);
        }
    
        if(keyCode == cc.KEY.s){
            if(evento.jugador1.getPositionY() - 40 > -40)
                evento.jugador1.setPosition(evento.jugador1.getPositionX(), evento.jugador1.getPositionY() - 40);
        }
        //mover jugador 2
        if(keyCode == cc.KEY.up){
            if(evento.jugador2.getPositionY() + 40 < size.height - 40)
                evento.jugador2.setPosition(evento.jugador2.getPositionX(), evento.jugador2.getPositionY() + 40);
        }
        
    
        if(keyCode == cc.KEY.down){
            if(evento.jugador2.getPositionY() - 40 > -40)
                evento.jugador2.setPosition(evento.jugador2.getPositionX(), evento.jugador2.getPositionY() - 40);
        }
    },
    
    actualizarBola: function(){
        var pos = this.pelota.getPosition();
        var bX=this.pelota.getPosition().x;
        var bY=this.pelota.getPosition().y;
        
        if(pos.x<=0){
            this.score2++;
            this.restart();
             
        }
        if(pos.x >= cc.winSize.width){
            this.score1++;
            this.restart();
        }
        if(pos.y <= 20 || pos.y >= cc.winSize.height - 40){
            this.dirY *= -1;
        }
        if(cc.rectIntersectsRect(this.pelota.getBoundingBox(), this.jugador1.getBoundingBox())){
            cc.log("collision");
            this.dirX *= -1.3;
        }
        if(cc.rectIntersectsRect(this.pelota.getBoundingBox(), this.jugador2.getBoundingBox())){
            cc.log("collision");
            this.dirX *= -1.3;
        }
        this.pelota.setPosition(bX+this.dirX, bY+this.dirY);
    },
    
    restart:function(){
        var size = cc.winSize;
        this.puntuacion1.setString(this.score1);
        this.puntuacion2.setString(this.score2);
        this.velocidad = this.random(0.001,0.01);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.MOVX = this.random(-3,3);
        this.MOVY = this.random(-3,3);
        
    },
    
    ctor:function () {
        this._super();
        this.inicializar();
        this.schedule(this.actualizarBola,this.velocidad);
        
        cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.move
		}, this);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

