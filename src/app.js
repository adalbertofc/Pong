
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    
    
    
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);

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
    
    ctor:function () {
        this._super();
        this.inicializar();

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

