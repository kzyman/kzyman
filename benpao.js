
  // $.getScript('http://s2.d2scdn.com/2016/11/22/20ed2d2a-b21a-4dde-930d-6fb83569c470/lufylegend-1.10.1.js',function(){
$timeout(function(){
  D.go_go = function(){
  $(".timeUpImg").hide();
  g_rem = parseFloat($('html').css('font-size').replace('px',''));
  height = $(window).height();
 
  width = $(window).width();
  frash = 10
  if (!D.can_load){
  init(frash ,"legend",width,height,main_fake);
    D.can_load = true
    
  }
  function main_fake(){}
  g_rem = parseFloat($('html').css('font-size').replace('px',''));
  var ratio =g_rem/41.4;
  var ratio_y = height/736
  count =1;
  var point = 0;
  var imglist;
  var game_stop;
  var tishi1_done;
  var tishi2_done;
  var has_tishi1=false;
  var has_tishi2=false;
  var rightback_lock;
  var leftback_lock;
  var pointY = 2*g_rem;
  var htree_timeout=false;
  var stree_timeout = false;
  var stree_hit = false;
  var index_set = true;
  var has_chang_img;
  var left_flag;
  var add_st;
  var delta = 17;
  var add_side = 0;
  var right_flag;
  var jump_flag;
  var down_flag ;
  var MySoundPlayer;
  var stepindex = 0;
  var playerindex = 0;
  var step=50;
  var createTime = 80;
  var speed_goods = 0;
  var speed =LGlobal.width / 1500;
  var cowboyY = LGlobal.height / 2;
  var gcurrentTime = 0
  var score_list = []
  var time_limit = 30 * 1000;
  if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
		LSystem.screen(LStage.FULL_SCREEN);
	}
	loadData = [
   	{name:"back",path:"http://s2.d2scdn.com/2016/11/13/Fq5fa3CAkFLyhiYiYY1QRVtxEVds.png"},
  	{name:"tishi1",path:"http://s2.d2scdn.com/2016/11/11/FhhoaW8j7s7pssXAVhtA0ycZs0r5.png"},
  	{name:"tishi2",path:"http://s2.d2scdn.com/2016/11/11/FgJaRRXki3Rus3Q-DSpqd10yd4OT.png"},
  	{name:"player1",path:D.image_data.img0},
  	{name:"player2",path:D.image_data.img1},
  	{name:"player3",path:D.image_data.img2},
  	{name:"xrz",path:D.image_data.img7},
  	{name:"st",path:D.image_data.img8},
  	{name:"beer",path:D.image_data.img4},
  	{name:"gold",path:D.image_data.img3},
  	{name:"htree",path:D.image_data.img6},
  	{name:"stree",path:D.image_data.img5},
    {name:"avatar", path:D.gameuser_avatar}

];

  
		function main(){
    	var loadsound = true;
    	var protocol = location.protocol;
    	loadData.push({name : "sound_background",path : "http://s2.d2scdn.com/2016/11/19/FhyrM2U-jykBeb-SpHMJskGg8I6P.mp3"});
    	loadData.push({name : "sound_good",path : "http://s2.d2scdn.com/2016/11/19/FhT0iYP7o9ZqB7CtbIa5vRfEWrk-.mp3"});
    	loadData.push({name : "sound_bad",path : "http://s2.d2scdn.com/2016/11/22/FiwIFkB16Y-dQEaKXkL58LaJFJuk.mp3"});

		  LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
		  LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
		  LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
			LLoadManage.load(loadData,null,gameInit);
		};
		
		function gameInit(result){
    	imglist = result;
    	
    	backLayer = new LSprite();
    	addChild(backLayer);
    	addBackGround();
    	goodsLayer= new LSprite();
    	backLayer.addChild(goodsLayer);
    	itemLayer= new LSprite();
    	backLayer.addChild(itemLayer);
    	cover = new LSprite()
      cover.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width, LGlobal.height], true, "back");
      cover.alpha =0
      backLayer.addChild(cover)
    	addPlayer();
    	MySoundPlayer = new SoundPlayer();

    	MySoundPlayer.loadSound();


    	startTime = new Date().getTime();
    	addText();
    	pointLayer = new LSprite();
    	backLayer.addChild(pointLayer);
      addEvent();
    	addAvatar();
    	MySoundPlayer.playSound("background");
    	addGoods(0,'st',height*6/8);
      addGoods(4,'st',height*6/8);
      addGoods(0,'xrz',height*5/8);
      addGoods(4,'xrz',height*5/8);

    }

  function SoundPlayer(){
  	var self = this;
  	self.loadIndex = 0;
  	self.background = new LSound();
  	self.background.parent = self;
  	self.background.addEventListener(LEvent.COMPLETE,self.backgroundLoadComplete);
  	self.background.load(imglist["sound_background"]);

  	self.good = new LSound();
  	self.good.parent = self;
  	self.bad = new LSound();
  	self.bad.parent = self;


  	self.good.addEventListener(LEvent.COMPLETE,self.goodLoadComplete);
  	self.good.load(imglist["sound_good"]);
  	self.bad.addEventListener(LEvent.COMPLETE,self.badLoadComplete);
  	self.bad.load(imglist["sound_bad"]);
  }
  SoundPlayer.prototype.loadSound = function(){
  	var self = this;
  	//如果PC环境，或者支持WebAudio，则已经预先读取了音频，无需再次读取
  	if(LSound.webAudioEnabled || LGlobal.os == OS_PC){
  		if (LGlobal.mobile){
  			switch(self.loadIndex++){
  				case 0:
  					self.good.play(self.good.length);
  					break;
  				case 1:
  					self.bad.play(self.bad.length);
  					break;
  				case 2:
  					self.gameover.play(self.gameover.length);
  					break;
  			}
  		}
  		return;
  	}
  	//已读取音频，无需再次读取
  	if(self.loadIndex > 0 ){
  		return;
  	}
  	self.loadIndex++;
  	self.good.addEventListener(LEvent.COMPLETE,self.goodLoadComplete);
  	self.good.load(imglist["sound_good"]);
  	self.bad.addEventListener(LEvent.COMPLETE,self.badLoadComplete);
  	self.bad.load(imglist["sound_bad"]);
  };
  SoundPlayer.prototype.playSound = function(name){
  	var self = this;
  	switch(name){
  		case "good":
  			if(!self.goodIsLoad)return;
  			self.good.play(0,1);
  			break;
  		case "bad":
  			if(!self.badIsLoad || self.bad.playing)return;
  			self.bad.play(0,1);
  			break;
  		case "background":
  			if(!self.backgroundIsLoad)return;
  			self.background.close();
  			self.background.play(0,100);
  			break;
  	}
  };
  SoundPlayer.prototype.backgroundLoadComplete = function(event){
  	var self = event.currentTarget;
  	self.parent.backgroundIsLoad = true;
  	self.play(0,100);
  };
  SoundPlayer.prototype.goodLoadComplete = function(event){
  	var self = event.currentTarget;
  	self.parent.goodIsLoad = true;
  };
  SoundPlayer.prototype.badLoadComplete = function(event){
  	var self = event.currentTarget;
  	self.parent.badIsLoad = true;
  };

  SoundPlayer.prototype.gameoverLoadComplete = function(event){
  	var self = event.currentTarget;
  	self.parent.gameoverIsLoad = true;
  };
   function geName(){
    var random = Math.random(),name;
    for(var i =0;i < GameArg.nameList.length;i++) {
        var tem = GameArg.nameList[i];
        if(random <= tem[1]){
            name = tem[0];
            break;
        }
    }
    if((name === 'stree' || name === 'htree') &&  name === GameArg.lastGoods){
        return arguments.callee();
    }
    GameArg.lastGoods = name;
    return name;
}
		function addEvent(){
      backLayer.addEventListener(LEvent.ENTER_FRAME,onframe1);
  		backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
  	  cover.addEventListener(LMouseEvent.MOUSE_MOVE,onMove);
  		backLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onMove);
  		
	  }
	  function onMove(event){
	   // event.preventDefault();
	   // event.stopPropagation();
	    var limit = 7 *ratio
	    if (currentX - event.offsetX >limit){
	     if (jump_flag || down_flag &&  currentX - event.offsetX <9*ratio){
        return
	     }
	     	if(game_stop && has_tishi2){
	     	  cover.removeEventListener(LMouseEvent.MOUSE_MOVE,onMove);
          cover.remove ()
	        game_stop = false
	      }
	      backLayer.removeChild(tishi2)
	      left_flag = true;
	      right_flag = false;
	      rightback_lock = false;

	    }
	    else if (event.offsetX - currentX >limit){
	     if (jump_flag || down_flag && event.offsetX - currentX <9*ratio){
        return
	       
	     }
	     	if(game_stop && has_tishi2){
	     	  backLayer.removeChild(tishi2)
	     	  cover.removeEventListener(LMouseEvent.MOUSE_MOVE,onMove);
          cover.remove () 
	        game_stop = false
	      }
	      left_flag = false;
	      leftback_lock = false;
	      right_flag = true;
	    }
	    if (currentY - event.offsetY >30*ratio){
	     	if(game_stop && has_tishi1){
	     	 // backLayer.removeChild(tishi1)
	     	  cover.alpha = 0
	        game_stop = false;
	      }
	      backLayer.removeChild(tishi1)
	      if (down_flag)return
	      jump_flag = true
	    }
	  }

		function onDown(event){
      currentX = event.offsetX
      currentY = event.offsetY
    }
		function onUp(event){
    }
    function tishi1(){
      tishi1_done = true
      has_tishi1 = true
      game_stop = true
      tishi1 = new LBitmap(new LBitmapData(imglist["tishi1"]));
      tishi1.x = 4*g_rem;
      tishi1.scaleX = 2 *g_rem/tishi1.getWidth();
      tishi1.scaleY = 5 *g_rem/tishi1.getHeight();
      tishi1.y = (LGlobal.height - tishi1.getHeight())/2;
      cover.alpha = 0.6
      addItem('htree',8,2)
      backLayer.addChild(tishi1)

    }
    function tishi2(){
      tishi2_done = true
      has_tishi2 = true
      game_stop = true
      tishi2 = new LBitmap(new LBitmapData(imglist["tishi2"]));
      tishi2.x =  2*g_rem;
      tishi2.scaleX = 6 *g_rem/tishi2.getWidth();
      tishi2.scaleY = 3 *g_rem/tishi2.getHeight();
      tishi2.y = (LGlobal.height - tishi2.getHeight())/2;
      cover.alpha = 0.6
      backLayer.addChild(tishi2);
      addItem('stree',8,3)
      
      // game_stop = false
    }
		function onframe1 (event){
      if (!game_stop){
		    time_limit = 30 * 1000 - new Date().getTime() + startTime
    
		  if (!tishi1_done && time_limit <29 * 1000 &&time_limit >28 * 1000){
		    tishi1()
		  }
		  if (!tishi2_done && time_limit <26 * 1000 &&time_limit >24 * 1000){
		    tishi2()
		  }
		  hero.run();
		  if (add_side ++ > 70/ratio){
		    add_side = 0 
		    addGoods(0,'st',height*6/8);
        addGoods(4,'st',height*6/8);
		    addGoods(0,'xrz',height*5/8);
        addGoods(4,'xrz',height*5/8); 

		  }

		  for (var i =0;i<goodsLayer.childList.length;i++){
		    goodsLayer.childList[i].run();
		    if(goodsLayer.childList[i].y < goodsLayer.childList[i].died){
      		 goodsLayer.removeChild(goodsLayer.childList[i])
      	}
		  }
			if (time_limit <20*1000 && time_limit>10 *1000){
			  createTime = 40;
			}
			if (time_limit <10 *1000 && time_limit>0){
			  createTime = 30;
			}
		  if (jump_flag){
		    hero.jump();
		  }
		  if (down_flag){
		    hero.down();
		  }
			if (left_flag){
			  hero.move('left')
			}
			if (right_flag){
			  hero.move('right')
			}
		}
			if (!game_stop ){
  			for(var m=0;m<itemLayer.childList.length;m++){
  			  if (itemLayer.childList[m].name != "hero"){
  				itemLayer.childList[m].run();}
  			}
			  
			}
  			if (!game_stop && time_limit <26 *1000){
  			var step = GetRandomNum(createTime/2,createTime);
  			if(stepindex++ > step){
  				stepindex = 0;
  				  addItem();
  			}
			  
			}
			showText();
		}
		
    function addGoods(type,name,offsetY){
      var goods = new Goods(name,type,offsetY)
      goodsLayer.addChild(goods)
      // goods.graphics.drawRect(1, "#ff0000", [0, 0, goods.getWidth(), goods.getHeight()], false, "#880088");
    }
		function addItem(name,index,index1){
    	var item=new Item(name,index,index1);
    	if (ratio<0.8){
    	item.scaleX = 0.6;
    	item.scaleY = 0.6;}
    	itemLayer.addChild(item);
    // 	if (item.index1 ==1 || item.index1 ==3){
    // 	item.graphics.drawRect(1, "#ff0000", [0, 0, item.getWidth(), item.getHeight()], false, "#880088");}
    }
   function addAvatar(){
      var avatar = new LBitmap(new LBitmapData(imglist['avatar']));
      a_width_ratio = 72/avatar.getWidth();
      a_height_ratio = 72/avatar.getHeight();
      if (a_width_ratio >1){
        a_width_ratio = avatar.getWidth()/72;
      } 
      if (a_height_ratio >1){
        a_width_ratio = avatar.getHeight()/72;
      } 
      pointLayer.x = 20;
      pointLayer.y = 20;
      var mask = new LSprite()
      mask.graphics.drawArc(2,"white",[36,36,34,0,Math.PI*2]);
      pointLayer.addChild(avatar);
      avatar.scaleX = a_width_ratio
      avatar.scaleY = a_height_ratio
      avatar.mask = mask


      
    }
		function addText(){
			hpTxt = new LTextField();
			hpTxt.color = "white";
			hpTxt.weight = "bolder"
			hpTxt.size = 15*ratio;
			hpTxt.x = g_rem*5;
			hpTxt.y = 10;
			backLayer.addChild(hpTxt);
			
			pointTxt = new LTextField();
			pointTxt.color = "white";
			pointTxt.weight = "normal";
			pointTxt.size = 15*ratio;
			pointTxt.x = g_rem*3;
			pointTxt.y = 40;
			backLayer.addChild(pointTxt);
			
			timeTxt = new LTextField();
			timeTxt.color = "white";
			timeTxt.weight = "normal"
			timeTxt.size = 25*ratio;
			timeTxt.x = g_rem*5;
			timeTxt.y = 50;
			backLayer.addChild(timeTxt);
			showText();
		}
		function showText(){
  		hpTxt.text = "时间";
  		pointTxt.text = point;
  		var str = time_limit + "";
  		if (time_limit>0 && time_limit <1000){
  		  timeTxt.text = "0" + str.substr(0,str.length - 3) + "." + str.substr(str.length - 3,2);
  		}
  		else if (time_limit>0){
	      timeTxt.text = str.substr(0,str.length - 3) + "." + str.substr(str.length - 3,2);}
	    else{
	      timeTxt.text = "0.00"
	      backLayer.removeEventListener(LEvent.ENTER_FRAME,onframe1);
	      backLayer.removeAllEventListener();
	      backLayer.die();
    		D.score = point;
    		MySoundPlayer.background.stop()
    		$('.timeUpImg').show();
    		$timeout(function(){
    		  D.game_end();
      		removeChild(backLayer)
      		$(".timeUpImg").hide();

    		},1500)

        
	    }
	  }
		function addPoints(type,goods){

      var getpoint = new GetPoint(type,goods)
      backLayer.addChild(getpoint)
		}
		function GetPoint(type,goods){
    	var self = this;
    	base(self,LSprite,[]);
		  var goodpointer = new LTextField();
			
			goodpointer.size = 15;
      if(type =='good'){
        goodpointer.text ="+5";
        goodpointer.color = "yellow";
      }
      if (type=='bad'){
        goodpointer.text ="-20";
        goodpointer.color = "red";
      }
    	self.x = goods.x+5;
    	self.y = goods.y-10;
    	self.addChild(goodpointer)
    	LTweenLite.to(self,2,
    	{ 
    		y:goods.y-20,
    		alpha:0,
    		delay:0.3,
    		onComplete:function(obj){
    			obj.parent.removeChild(obj);
    		},
    		ease:Strong.easeOut
    	});
    }

		function addPlayer(){
  		hero = new Player(1);
  		itemLayer.addChild(hero);
	  }
	 function GetRandomNum(Min, Max){
      var Range = Max - Min;
      var Rand = Math.random();
      return(Min + Math.round(Rand * Range));
    }
    function Goods(name,type,offsetY) {
      base(this,LSprite,[]);
      var self = this;
      self.name =name;
      self.nite = 0
      self.bitmap = new LBitmap(new LBitmapData(imglist[name]));


      self.type = type;
      self.nite = 0
      self.died = g_rem*3
      self.inity = offsetY
      if (type ==0){
        self.x = -self.bitmap.getWidth()
        // console.log (self.bitmap.getWidth())
        self.y = offsetY
      }
      else if (type == 4){
        self.y = offsetY
        self.x = width

      }
        if (self.name == 'xrz'){
        self.width = self.bitmap.getWidth()
        self.height = self.bitmap.getHeight()
        self.bitmap.scaleX = 3*g_rem/self.bitmap.getWidth()
        self.bitmap.scaleY = 3.75*g_rem/self.bitmap.getHeight()
        self.initscaleX = self.bitmap.scaleX
        self.initscaleY = self.bitmap.scaleY
        // console.log (self.bitmap.getWidth())
        }
        else if (self.name == 'st'){
        self.bitmap.scaleX = 1.2*g_rem/self.bitmap.getWidth()
        self.bitmap.scaleY = 0.8*g_rem/self.bitmap.getHeight()
        self.died = g_rem*4
        self.nite = 0.6*g_rem
        }
      self.sspeed = (self.y - pointY)/(cowboyY - pointY)*speed

      self.addChild(self.bitmap);

    }
    Goods.prototype.update = function(type,offsetY,flag){

        var self = this;
        self.sspeed = (self.y- pointY)/(cowboyY - pointY)*speed;
        var k = (self.y - pointY)/(self.inity - pointY)*1.5;

        var nite =self.nite *k;
        var extar = 0;
        if (ratio>1){
          extar = 0.06
        }
        switch(self.type){
            case 0:
                self.x = 5.75*g_rem - 0.63*self.y -self.width*k
                break;
            case 4:

                self.x = 3.8*g_rem+ 0.73*self.y - nite
                break;
        }
        // console.log (self.bitmap.scaleX)
        self.bitmap.scaleX = k
        self.bitmap.scaleY = k

    }
    Goods.prototype.run = function(type,offsetY,flag){
        var self = this;
        self.y -= self.sspeed*delta/ratio/2
        self.update();
      }

		function Item(name,index,index1){
    	base(this,LSprite,[]);
    	var self = this;
    	if (!index1){
    	  self.y = LGlobal.height-10;
    	  
    	}
    	else{
    	  self.y = LGlobal.height/2+10;
    	}
    	self.sspeed = 0;
    	self.mode="";
    	self.nite = 0;
    	self.name = name || "";
    	if (!index){
      	if (htree_timeout){
      	  self.index = Math.floor(Math.random()*7)+1;
      	  
      	}
      	else if (stree_timeout){
      	  self.index = Math.floor(Math.random()*7)+1;
      	}
        else {
          self.index = Math.floor(Math.random()*9)+1;
        }
    	  
    	}
    	else{
    	  self.index = index;
    	}
      
    	self.value = self.index <=7 ? 1:-1;
    	if (self.index <= 7 && self.index > 3){
    	  self.bitmap = new LBitmap(new LBitmapData(imglist["gold"]));
    	}
    	else if (self.index <= 3){
    	  self.bitmap = new LBitmap(new LBitmapData(imglist["beer"]));
    	}
    	else if(self.index >7){
    	  htree_timeout = true
    	  self.bitmap = new LBitmap(new LBitmapData(imglist["htree"]));
    	 self.bitmap.x  = -self.bitmap.getWidth()*0.5;
    	 self.bitmap.y = -self.bitmap.getHeight()*0.5;
    	 self.index1 = 2
    	 self.name ="htree"
    	 self.x =  g_rem*5.1
    	 $timeout(function(){
    	   htree_timeout = false
    	 },1000)
    	}
    	if (self.index <= 7 ){
    	   self.bitmap.scaleX = 0.8*ratio;
         self.bitmap.scaleY = 0.8*ratio_y;
      	  self.index1 = Math.floor(Math.random()*3)+1
      	  if(self.index1 ==1){
      	    self.x = 2*g_rem
      	  }
      	  else if (self.index1  == 2){
        	   self.x = g_rem*5.1
        	   self.bitmap.x = -self.bitmap.getWidth()*0.5
        	   self.bitmap.y = -self.bitmap.getHeight()*0.5
      	   
      	  }
      	  else if  (self.index1  == 3){
            self.x = g_rem*8
  
        	  }
    	  }
    	  else{
    	    if(!index1){
      	    self.random = Math.floor(Math.random()*2)+1;
    	      
    	    }
    	    else{
    	      self.random = index1
    	    }
      	    if (self.random==2){
      	     htree_timeout = true
          	 self.bitmap = new LBitmap(new LBitmapData(imglist["htree"]));
          	 self.bitmap.scaleX = 0.5
          	 self.bitmap.scaleY = 0.5
          	 self.bitmap.x  = -self.bitmap.getWidth()*0.5;
          	 self.bitmap.y = -self.bitmap.getHeight()*0.5;
          	 self.index1 =2
          	 self.name ="htree"
          	 self.x =  g_rem*5.1
          	 $timeout(function(){
          	   htree_timeout = false
          	 },1000)
      	    }
      	    else{
      	      if (!index1){
      	        self.index1 = Math.floor(Math.random()*3)+1
      	        
      	      }
      	      else{
      	        self.index1 =2
      	      }
      	     stree_timeout = true
          	 self.bitmap = new LBitmap(new LBitmapData(imglist["stree"]));
          	 self.name ="stree"
          	 if(self.index1 ==1){
          	 self.x =  g_rem*2
          	 self.nite = 0.5*g_rem
          	   
          	 }
          	 else if (self.index1 ==2){
          	   if (index1){
          	     self.bitmap.scaleX = 0.5
          	     self.bitmap.scaleY = 0.5
          	   }
            	 self.bitmap.x  = -self.bitmap.getWidth()*0.5;
            	 self.bitmap.y = -self.bitmap.getHeight()*0.5;
          	   self.x =  g_rem*5.1

          	 }
          	 else if (self.index1 ==3){
          	   self.x =  g_rem*8
          	 }
          	 $timeout(function(){
          	   stree_timeout = false
          	 },500)
      	    }
    	      
    	    }

    	  
      k1 = (self.y - pointY)/(LGlobal.height-10 - pointY)*2.5
    	self.addChild(self.bitmap);
		  
		}

    Item.prototype.update =  function(){
      var self = this
      self.sspeed = (self.y- pointY)/(cowboyY - pointY)*speed
      k1 = (self.y - pointY)/(LGlobal.height-10 - pointY)

      if (k1 >1){
          k1 =1
        }
      switch(self.index1){
          case 1:
              self.x = 5.7*g_rem - 0.373*self.y - self.nite*k1;
              break;
          case 3:
              self.x = 4.65*g_rem + 0.225*self.y;
              break;
      }
      
    }
    Item.prototype.run=function(){
    	var self=this;

      self.y -= self.sspeed*delta/2
      self.update();
      self.bitmap.scaleX = k1
      self.bitmap.scaleY = k1
    	if (self.index1 ==2){
  	     self.bitmap.x = -self.bitmap.getWidth()*0.5
    	   self.bitmap.y = -self.bitmap.getHeight()*0.5
    	}
    	var hit = self.checkHit();
    	if(hit || self.y < 3*g_rem){
    		self.mode="die";
    		itemLayer.removeChild(self)
    	}
    	if (!self.has_set && self.name == 'htree' && self.mode != "die" && self.y <= hero.inity+hero.data.getHeight()){
    	  self.has_set = true
    	  itemLayer.setChildIndex(self, 0);
    	}
    	else if (!self.has_set && self.mode != "die" && self.y <= hero.inity+hero.data.getHeight()/2 + 10){
    	  self.has_set = true
        itemLayer.setChildIndex(self, 0);
    	}
    }
    Item.prototype.checkHit=function(){
    	var self=this;
    	if (self.name =="htree"){
    	  if(self.y <= (hero.inity+hero.data.getHeight()) && !has_chang_img && self.y > (hero.inity+hero.data.getHeight()-10) ){
    	     if (point <= 20){
    		    point = 0;
    		  }
    		  else{
    		    point -= 20;
    		  }
    			addPoints('bad',self)
    			MySoundPlayer.playSound("bad");
    		  return true
    	  }
    	}
    	else {
    	  stree_hit = false
    	  if(self.name=="stree"){
    	    if (hero.in_road == self.index1 && self.y <= (hero.inity+hero.data.getHeight()/2) && self.y > (hero.inity+hero.data.getHeight()/2 -0.12*g_rem)){
    	      stree_hit = true
    	    }
    	  }
    	  else{
      	  if (hero.in_road == self.index1 && self.y <= (hero.inity+hero.data.getHeight()) && self.y > (hero.inity + 2*g_rem)){
      	    stree_hit = true
      	  }
    	  }
    		if (stree_hit){
      		if(self.value >0){
      			point += 5;
      			addPoints('good',self)
      			MySoundPlayer.playSound("good");
      		}else{
      		  if (point <= 20){
      		    point = 0;
      		  }
      		  else{
      		    point -= 20;
      		  }
      			addPoints('bad',self)
      			MySoundPlayer.playSound("bad");
      		}
      		return true;
      	}
    	  
    	}
    	return false;
    }
		function Player(mode){
    	base(this,LSprite,[]);
    	var self = this;
    	self.mode = mode;
    	self.name = "hero"
    	self.type =2;
    	self.xspeed = -10;
    	self.in_road = 2
    	var list = LGlobal.divideCoordinate(256,256,4,4);
    	if (mode ==1){
    	  self.data = new LBitmap (new LBitmapData(imglist["player1"]));
    	  
    	}
    	if (mode ==2){
    	  self.data = new LBitmap (new LBitmapData(imglist["player2"]));
    	  
    	}
    	if (mode ==3){
    	  self.data = new LBitmap (new LBitmapData(imglist["player3"]));
    	  
    	}
    	
    	self.addChild(self.data);

    	self.data.scaleX=125 *ratio/self.data.getWidth();
    	self.data.scaleY = 180*ratio/self.data.getHeight();
    	var width = $('.front-game-page').width();
    	self.x = g_rem*3.5;

      self.y = LGlobal.height/2 - self.data.getHeight();
      self.inity = self.y;
      self.middle = self.x
      self.left = g_rem*1.4
      self.right = g_rem*5.3
    	self.step = 2,self.stepindex = 0;
    	self.moveEndTime = 400;
    }
    Player.prototype.run = function(){
      
      if (playerindex++ > 25){
        playerindex = 0;
        if (!down_flag && !has_chang_img){
          if (hero.mode ==1){
            hero.data.bitmapData = new LBitmapData(imglist["player2"]);
            hero.mode = 2
          }
          else if (hero.mode ==2){
      		  hero.data.bitmapData = new LBitmapData(imglist["player1"]);
            hero.mode = 1
          }
        }
			}

    }
    Player.prototype.jump = function(){
      var self = this;
      if (!has_chang_img){
         self.data.bitmapData = new LBitmapData(imglist["player3"]);
         has_chang_img = true
      }

      if(parseFloat(self.y) <=parseFloat(self.inity - g_rem*2)){
        jump_flag = false
        down_flag = true
        return
      }
      self.y -= 2
    }
    Player.prototype.down = function(){

      var self = this;
      self.y +=2*ratio
      if (parseFloat(self.y) >=self.inity){
        down_flag = false
        has_chang_img = false
      }
    }
    Player.prototype.move = function(type){
      var self = this;

      if (type == "left"  && self.x >= self.left){
        self.x -=2*ratio
        if (leftback_lock){
          self.in_road =2
          if (self.x <self.middle +1){
            self.type =2
            left_flag = false
            leftback_lock = false
            return
          }
        }
        else{
          if (self.type ==2 && self.in_road != 3){
            self.in_road =1
            if (self.x <=self.left){
              self.type =1
              left_flag = false
              return
            }
          }
          else if (self.type ==3 ){
            self.in_road =2
            if (self.x <self.middle +1){
              self.type =2
              left_flag = false
              return
            }
          }
          else{

            leftback_lock = true
            self.in_road =2
            if (self.x <self.middle +1){
              self.type =2
              left_flag = false
              return
            }
          }
        }
      }
      else if (type == "right" && self.x<=self.right){
        self.x +=2*ratio
        if (rightback_lock){
          self.in_road =2
      	  if (self.x >self.middle){
      	    self.type =2
      	    right_flag = false
      	    rightback_lock = false
      	    return
      	  }
        }
        else{
          if (self.type == 2 && self.in_road!=1){
            self.in_road =3
            if (self.x >=self.right){
              self.type =3
              right_flag = false
              return
            } 
          }
        	else if (self.type == 1 ){
        	  self.in_road =2
        	  if (self.x >self.middle){
        	    self.type =2
        	    right_flag = false
        	    return
        	  }
        	}
        	else{
        	  rightback_lock = true
        	  self.in_road =2
        	  if (self.x >self.middle){
        	    self.type =2
        	    right_flag = false
        	    return
        	  }
        	}
      	}
      } 
    }
  	function addBackGround(){
      var bitmap=new LBitmap(new LBitmapData(imglist["back"]));
      backLayer.addChild(bitmap);
      bitmap.alpha = 0
      }
      main()
  }
  },0)



