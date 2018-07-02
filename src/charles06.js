var Charles06Layer = cc.Layer.extend({
    isDrag:false,
    bg:null,
    dx:10,
    man:null,
    manFrame:new Array(4),
    action:0,
    manUp:new Array(1),
    manDown:new Array(1),
    isRight:true,
    ctor:function () {

        this._super();
        // 載入背景圖 , 最先寫會在最底層
        this.bg = new cc.Sprite(res.bg_png);
        this.bg.x = this.bg.width/2;
        this.bg.y = cc.winSize.height/2;

        cc.log(cc.winSize.width/2+1200);




        this.addChild(this.bg);



        // 載入人物動作圖
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.man_plist,res.man_png);
        var img79 = frameCache.getSpriteFrame("image79.png");
        var img80 = frameCache.getSpriteFrame("image80.png");
        var img81 = frameCache.getSpriteFrame("image81.png");
        var img82 = frameCache.getSpriteFrame("image82.png");
        this.manFrame =[img79,img80,img81,img82];

        //人物往上看
        var frameCache1 = cc.spriteFrameCache;
        frameCache1.addSpriteFrames(res.manup_plist,res.manup_png);
        var img3 = frameCache1.getSpriteFrame("image3.png");
        this.manUp =[img3];
        this.manUp[0].x = cc.winSize.width/2;
        this.manUp[0].y = cc.winSize.height/2+80;

        // 人物趴下
        var frameCache2 = cc.spriteFrameCache;
        frameCache2.addSpriteFrames(res.mandown_plist,res.mandown_png);
        var img74 = frameCache1.getSpriteFrame("image74.png");
        this.manDown =[img74];
        this.manDown[0].x = cc.winSize.width/2;
        this.manDown[0].y = cc.winSize.height/2+80;



        this.man = new cc.Sprite(this.manFrame[this.action]);
        this.man.x = cc.winSize.width/2;
        this.man.y = cc.winSize.height/2+60;
        this.man.runAction(cc.flipX(true));



        this.addChild(this.man);




        // 事件添加管理
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            // 按鍵按壓
            onKeyPressed:function(keyCode,event){
                var target = event.getCurrentTarget();
                switch(keyCode){
                    case 38: //up
                        target.watchUp();
                        break;

                    case 40: //down
                        target.getDown();
                        break;
                    case 39: //right
                        target.goForward();

                        break;
                    case 37: //left
                        target.goBack();

                        break;

                }
            },
            // 按鍵放開
            onKeyReleased:function(keyCode,event){

            }
        },this);





        return true;
    },



    goForward:function(){
        if (this.bg.x + this.bg.width/2 - this.dx >= cc.winSize.width) {
            this.bg.x -= this.dx;
            this.isRight= true;
            this.man.runAction(cc.flipX(true));
            this.action = this.action == 3 ? 0 : this.action + 1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
        }
        // 走到最右邊時候 , 人繼續走
        else{
            this.man.x +=this.dx;
            this.action = this.action == 3 ? 0 : this.action + 1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
            this.isRight= true;
        }
    },
    goBack:function(){
        if(this.bg.x - this.bg.width/2 +this.dx <= 0 ){
            this.bg.x += this.dx;
            this.man.runAction(cc.flipX(false));
            this.action = this.action==3?0:this.action+1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
            this.isRight= false;
        }



    },

    watchUp:function(){
        this.man.setSpriteFrame(this.manUp[0]);
    },

    getDown:function(){
        this.man.setSpriteFrame(this.manDown[0]);
    }

});

var Charles06Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Charles06Layer();
        this.addChild(layer);
    }
});
