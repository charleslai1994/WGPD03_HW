var Charles06Layer = cc.Layer.extend({
    isDrag:false,
    bg:null,
    dx:10,
    man:null,
    manFrame:new Array(4),
    action:0,
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
        var img37 = frameCache.getSpriteFrame("image37.png");
        var img38 = frameCache.getSpriteFrame("image38.png");
        var img39 = frameCache.getSpriteFrame("image39.png");
        var img40 = frameCache.getSpriteFrame("image40.png");
        this.manFrame =[img37,img38,img39,img40];



        this.man = new cc.Sprite(this.manFrame[this.action]);
        this.man.x = cc.winSize.width/2;
        this.man.y = cc.winSize.height/2+44;



        this.addChild(this.man);




        // 事件添加管理
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            // 按鍵按壓
            onKeyPressed:function(keyCode,event){
                var target = event.getCurrentTarget();
                switch(keyCode){
                    case 39: //right
                        target.goForward();
                        target.man.runAction(cc.flipX(true));
                        break;
                    case 37: //left
                        target.goBack();
                        target.man.runAction(cc.flipX(false));
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

            this.action = this.action == 3 ? 0 : this.action + 1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
        }
        // 走到最右邊時候 , 人繼續走
        else{
            this.man.x +=this.dx;
            this.action = this.action == 3 ? 0 : this.action + 1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
        }
    },
    goBack:function(){
        if(this.bg.x - this.bg.width/2 +this.dx <= 0 ){
            this.bg.x += this.dx;

            this.action = this.action==3?0:this.action+1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
        }



    }

});

var Charles06Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Charles06Layer();
        this.addChild(layer);
    }
});
