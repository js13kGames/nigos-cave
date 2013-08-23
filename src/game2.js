/**
*	@author: Felipe Alfonso
*	
*	Random Dungeon Game
*/

var ctx = document.getElementById("gc").getContext("2d"),
	c_width = 800,
	c_height = 480,
	doc = document,
	_win = window,
	explosion = new Audio(),
	coinSound = new Audio(),
	winSound = new Audio(),
	jumpSound = new Audio();
coinSound.src = "data:audio/wav;base64,UklGRuQAAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YcAAAACkpI9cXFxcXV1dXV1ehKGhal5fX19fYGBgYGifn4ZhYWFiYmJiY2NjjJ2cZGRkZGRlZWVlZXeamnpmZ2dnZ2doaGholpiLaWlpampqampra4aVlW5sbGxsbG1tbW16k5N8bm5ub29vb29wcZCQhXFxcXFxcXJycnKIjotzc3N0dHR0dHR1gYuLeHZ2dnZ2dnd3d32JiH14eHh4eXl5eXl7hoaAenp7e3t7e3x8fIODgX19fX19fX5+fn6AgYB/f38=";
jumpSound.src = "data:audio/wav;base64,UklGRoYBAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YWIBAACUlJSUlHFra2tra3CUlJSUkWtra2tra4CUlJSUfWtra2trcJSUlJSIa2tra2trk5SUlIpra2tra26UlJSUgmtra2tre5SUlJRya2tra2uQlJSUgWtra2trhZSUlIpra2tra4KUlJSJa2tra2uFlJSUgmtra2trkZSUlHRra2tre5SUlIdra2tra5SUlJNra2tra4uUlJRxa2trbImUlJNxbGxsbYyTk5FtbW1tcJKSkoVubm5uf5GRkXZvb29vkJCQhHBwcHCEj4+McHFxcX2Pjo5zcXFye46OjnVycnJ8jY2NdHNzc4CMjIh0dHR0houLgHR1dXiLiop3dXV1g4qKgXZ2dnuJiYh3d3d3h4iIe3d4eIOIh354eHiBh4d/eXl5gYaGf3l6eoGFhX16enqDhYV8e3t8hISCe3x8f4ODf3x8fIKDg319fX+Cgn99fn6BgYF+fn6AgYF/f39/gIB/f38=";
explosion.src = "data:audio/wav;base64,UklGRpEBAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YW0BAAAAAnxUhnfbbK9pdrJh///JIh8vjU9Ce76XsYQAXZRY2Q/QN2BctkN+rbVlkLfoLcNvlcrdwGyngEuAy8PAZmvigtb4tGGQaHhPUnGINo9aZXiWsmnMO1xhuS8rwrmZQj1IhV9QRVJ8uX+FodOWpViKqLy9d68ngNh6ld8cf9J4N7txdzNxZpOgRS6js4yVUGKK1z6ZtJ89osJyulg0UbupoXhuwKJ5pYpOeSmxUKJyLyZ0nlohOFxza3lTtm59V7Kib2y9eYeH04VVZJ9Id2idap99n1VIxnhQQ6DFe6+GSmxspc+nX8GjlIJIkY16u612RIl3e1d+srKTi4eCroxci3F6tIWlanqUsp16mIyQnZ5nWaVzlUpNl6+IkVtrp5tvgJJWY4p8a4uHeoKcoX5yd2t8kZGacmeEm351hHdqfpGUm5iNe3uEdouIc3FrbYR1jop8fYiDhoV7dn2Hg3t8goOFfn+DgoKCgoGAfw==";
winSound.src = "data:audio/wav;base64,UklGRtIBAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0Ya4BAACkpKSkpIhbW1tbW4mkpKSkiltbW1tboqSkpKFbW1tbW6CkpKSNW1tbW4GkpKSaW1tbW4akpKSEW1tbZKSkpJZbW1thpKSkjFtbW3mkpKRoW1thpKSkdFtbYKOjo2tcXHSjo5RdXV2boqJmXV2LoaFuXl6MoaFnX3dnX19fX1+boJ+fn4BgYGBhYZyenp6eaWFhYmKJnZ2dnWliYmNjm5ycnIFjY2Rkkpubm3tkZGVtm5qalGVlZWWWmpmVZmZma5mZmYNnZ2eGmJiRaGhof5eXkGhoaYaXloJpaWyWlpZqamqKlZV0amuHlJRya2uMlJSUlI9sbGxsbHeTk5KSkm9tbW1tf5KRkZGAbm5ubnuQkJCQem9vb3CKj4+Pg3BwcHCIjo6OfHFxcXiOjo2GcnJydo2NjYRzc3N9jIyMeXR0dIuLi390dHWJiop9dXV5ioqJdnZ2g4mJfnZ3foiIgHd3fYiIf3h4gYeHh4eHenl5eXl7hoaGhoV7enp6en+FhYWEgHt7e3t/hISDg358fHx8goOCgn99fX19goKCgX5+fn5/gYGBf39/f3+AgIB/";
function cls(c){
	c = c || "#000";
	var lc = ctx.fillStyle;
	ctx.fillStyle = c;
	ctx.fillRect(0,0,c_width,c_height);
	ctx.fillStyle = lc;
}

function ms(){
	return new Date().getTime();
}

function sc(c){
	ctx.fillStyle = c || "#fff";
}

function dr(x,y,w,h){
	ctx.fillRect(x,y,w,h);
}

function dI(img,x,y,a,scalex,scaley,handlex,handley,clipx,clipy,clipw,cliph){
	a = a || 0;
	scalex = scalex || 1;
	scaley = scaley || 1;
	handlex = handlex || 0;
	handley = handley || 0;
	clipx = clipx || 0;
	clipy = clipy || 0;
	clipw = clipw || 8
	cliph = cliph || 8;
	ctx.save();
	ctx.translate( x, y );
	ctx.rotate( a );
	ctx.scale( scalex, scaley );
	ctx.translate( -x-handlex, -y-handley );
	ctx.drawImage(img,clipx,clipy,clipw,cliph,x,y,clipw,cliph);
	ctx.restore();
}

function gmb(map,maxWidth,tile){
	var base = [];
	base[base.length] = [];

	for(var i=0;i<map.group[map.seed.charAt(0)][0].length*maxWidth+2;i++){
		base[0][base[0].length] = 1;
	}

	for(var o = 0;o<(map.group[map.seed.charAt(0)].length*map.seed.length)/maxWidth;o++){

		var arr = [];

		for(var j=0;j<base[0].length;j++){
			if(j==0 || j==base[0].length-1){
				arr[arr.length] = 1;
			}else{
				arr[arr.length] = 0;
			}
		}

		base[base.length] = arr;
	}

	base[base.length] = [];
	for(var i=0;i<map.group[map.seed.charAt(0)][0].length*maxWidth+2;i++){
		base[base.length-1][base[base.length-1].length] = 1;
	}

	return base;
}

function mm(map,maxWidth,size,offx,offy,pad,tiles,map_group,base_group,bg){

	var _x = 0, _y = 0;
	offx = offx || 0;
	offy = offy || 0;
	pad = pad || 0;
	var base = gmb(map,maxWidth);

	for(var i=0;i<map.seed.length;i++){
		var m = map.group[map.seed.charAt(i)];
		for(var y = 0; y< m.length;y++){
			
			for(var x=0;x<m[y].length;x++){
				switch(m[y][x]){
					case 1:
						var t = new tl(offx+_x+x*(size+pad),offy+_y+y*(size+pad),tiles[0],1,16,16);
						t.alpha = 1;
						map_group.push(t);
						break;
					default:
						break;
				}
			}
		}
		_x+=m[0].length*(size+pad);
		if(_x>=maxWidth*m[0].length*(size+pad)){
			_x = 0;
			_y+=m.length*(size+pad);
		}
	}

	if(base){
		for(var y = 0;y<base.length;y++){
			for(var x=0;x<base[y].length;x++){
				if(base[y][x]==1){
					var t =new tl(offx-(size+pad)+x*(size+pad),offy-(size+pad)+y*(size+pad),tiles[0],1,16,16);
					t.alpha = 1;
					base_group.push(t);
				}else{
					var t = new tl(offx-(size+pad)+x*(size+pad),offy-(size+pad)+y*(size+pad),tiles[1],2,16,16);
					t.alpha = 1;
					bg.push(t);	
				}
			}
		}
	}


}

function dC(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function intr(r1,r2,handlex,handley,hx,hy){
	handlex = handlex || 0;
	handley = handley || 0;
	hx = hx || 0;
	hy = hy || 0;
	return  r1.last.x+r1.width-handlex>r2.last.x &&
			r1.last.x-handlex<r2.last.x+r2.width-hx && 
			r1.last.y+r1.height-handley>r2.last.y && 
			r1.last.y-handley<r2.last.y+r2.height-hy;
}

function inx(r1,r2,handlex,handley){
	handlex = handlex || 0;
	handley = handley || 0;
	var x=Math.max(r1.last.x-handlex,r2.last.x),
		y=Math.max(r1.last.y-handley,r2.last.y),
		w=Math.min(r1.last.x+r1.width-handlex,r2.last.x+r2.width)-x,
		h=Math.min(r1.last.y+r1.height-handley,r2.last.y+r2.height)-y;
	return {x:x,y:y,width:w,height:h};
}

function dLn(x1,y1,x2,y2)
{
	var deltax,deltay,x,y,xinc1,yinc1,xinc2,yinc2,den,num,numadd,numpixels;
	
	deltax = Math.abs(x2-x1);
	deltay = Math.abs(y2-y1);
	x = x1;
	y = y1;
	
	if(x2>=x1)
	{
		xinc1 = 1;
		xinc2 = 1;
	}
	else
	{
		xinc1 = -1;
		xinc2 = -1;
	}
	
	if(y2>=y1)
	{
		yinc1 = 1;
		yinc2 = 1;
	}
	else
	{
		yinc1 = -1;
		yinc2 = -1;
	}
	
	if(deltax >= deltay)
	{
		xinc1 = 0;
		yinc2 = 0;
		den = deltax;
		num = deltax/2;
		numadd = deltay;
		numpixels = deltax;
	}
	else
	{
		xinc2 = 0;
		yinc1 = 0;
		den = deltay;
		num = deltay/2;
		numadd = deltax;
		numpixels = deltay;
	}
	
	for(var curpixel = 0;curpixel<=numpixels;curpixel++)
	{
		ctx.fillRect(x,y,1,1);
		num+=numadd;
		if(num>=den)
		{
			num-=den;
			x+=xinc1;
			y+=yinc1;
		}
		x+=xinc2;
		y+=yinc2;
	}
}

function rI(l,m){
	return Math.floor(Math.random()*(m-l+1)+l);
}

function rF(l,m){
	return (Math.random()*(m-l+1)+l);
}

function gM(seed,maps){
	var sa = seed.split("");
	var s = "";
	while(sa.length){
		s+=sa.splice(rI(0,sa.length),1);
	}
	var map = {
		seed:s,
		group:{}
	};
	for(var i=0;i<s.length;i++){
		map.group[s.charAt(i)] =  maps[s.charAt(i)];

	}
	seed = s;
	return map;
}

var playWalk = true;

var py = {
	vl:{
		x:0,
		y:0
	},
	gr:{
		x:0,
		y:0
	},
	x:0,
	y:0,
	a:0,
	scale:{
		x:1,
		y:1
	},
	width:0,
	height:0,
	image:null,
	done:false,
	alpha:1.0,
	last:{
		x:0,
		y:0
	},
	frame:0,
	walk:[0,1],
	jump:[1],
	idle:[0],
	isColliding:false,
	animCount:0,
	animTime:100,
	currentAnim:[0],
	facing:1,
	jumpTimer:0,
	lightAngle:0,
	exploTimer:-1,
	expAlpha:1.0,
	life:10,
	maxLife:10,

	sides:{
		left:false,
		right:false,
		top:false,
		bottom:false
	},

	animFlag:0, // 0 = idle | 1 = walk | 2 = jump

	init:function(x,y){
		py.image = new Image();
		py.image.src = "player.png";
		this.image.onload = function(){
			py.done = true;
			py.width = 6;
			py.height = 8;
		};
		py.x = x || 0;
		py.y = y || 0;
		py.last.x = py.x;
		py.last.y = py.y;

	},
	dr:function(map,base){
		if(py.done){
			ctx.globalAlpha = py.alpha;
			
			dI(py.image,py.x,py.y,0,py.facing,1,3,4,py.currentAnim[py.frame]*6,0,6,8)
			ctx.globalAlpha = 1.0;

			if(py.exploTimer>0){
				ctx.globalAlpha = py.expAlpha;
				dC(py.x,py.y,12);
				py.expAlpha-=.05;
				if(py.expAlpha<0) py.expAlpha = 0;
				if(ms()-py.exploTimer>500) py.exploTimer = -1;
			}
		}
	},
	distanceToPoint:function(x,y){
		return Math.sqrt((x-py.x)*(x-py.x)+(y-py.y)*(y-py.y));
	},
	aTo:function(x,y){
		return Math.atan2(x-py.x,y-py.y)+(90*Math.PI/180)
	},

	pu:function(map,base) {
		if(py.done){
			
			playWalk = true;

			py.vl.x+=py.gr.x;
			py.last.x+=py.vl.x;
			if(!gm) py.vl.y+=py.gr.y;
			if(py.vl.y>py.height/2) py.vl.y = py.height/2;
			py.last.y+=py.vl.y;

			py.sides.left = py.sides.right = py.sides.top = py.sides.bottom = false;

			if(!gm){
				for(var i=0;i<base.length;i++){
					if(base[i].id == 1){
						if(intr(py,base[i],3,4)){
							var r = inx(py,base[i],3,4);
							if(r.width>r.height){
								if(py.last.y<base[i].y){
									py.last.y-=r.height;
									if(!jump) {
										if(r.width>1 || py.animFlag != 2)py.vl.y = 0;
									}
									jump = false;
									py.sides.bottom = true;
								}else{
									py.last.y+=r.height;
									if(r.width>1 || py.animFlag != 2) py.vl.y = 0;
									py.sides.top = true;
								}
							}else{
								if(py.last.x<base[i].x){
									py.last.x-=r.width;
									py.vl.x = 0;
									py.sides.right = true;
								}else{
									py.last.x+=r.width;
									py.vl.x = 0;
									py.sides.left = true;
								}
							}
						}
					}
				}


				for(var i=0;i<map.length;i++){
					if(map[i].id == 1){
						if(intr(py,map[i],3,4)){
							var r = inx(py,map[i],3,4);
							if(r.width>r.height){
								if(py.last.y<map[i].y){
									py.last.y-=r.height;
									if(!jump){
									
										if(r.width>1 || py.animFlag != 2) py.vl.y = 0;
									
									}
									py.sides.bottom = true;
								}else{
									py.last.y+=r.height;
									if(r.width>1 || py.animFlag != 2) py.vl.y = 0;
									py.sides.top = true;
								}

							}else{
								if(py.last.x<map[i].x){
									py.last.x-=r.width;
									py.vl.x = 0;
									py.sides.right = true;
								}else{
									py.last.x+=r.width;
									py.vl.x = 0;
									py.sides.left = true;
									
								}
							}
						}
					}
				}
			}

			

			


		}
	},
	ud:function(){

		if(jump && ms()-py.jumpTimer>100 && !jumphit) jump = false;

		if(py.vl.y!=0 || jump || py.sides.top){
			py.currentAnim = py.jump;
			py.animFlag = 2;
		}else if(py.vl.x==0 && !jump){ 
			py.currentAnim = py.idle;
			py.animFlag = 0;
		}else if(py.vl.x!=0 && !jump){
			py.currentAnim = py.walk;
			py.animFlag = 1;
		}

		if(py.frame<py.currentAnim.length && ms()-py.animCount>py.animTime){
			py.frame++;
			py.animCount = ms();	
		}

		if(py.frame>py.currentAnim.length-1) py.frame = 0;

		py.x = py.last.x;
		py.y = py.last.y;


		if(py.sides.bottom){
			jump = false;
		}
		
	}
};


function pointOverMap(x,y,map){
	for(var i=0;i<map.length;i++){
		var t = map[i];
		var _x = (x);
		var _y = (y);
		var tx = (t.x);
		var ty = (t.y);

		if(_x>tx && _x<tx+(t.width) && _y>ty && _y<ty+(t.height) && t.id>0){
			return t;
		}


	}
	return null;
}

function pointOverPlayer(x,y,l){
	if(x<py.x+py.width/2 && x>py.x-py.width/2 && y<py.y+py.height/2 && y>py.y-py.height/2){
		py.life = l;
		return true;
	}
	return false;
}

function pointOverEnemy(x,y,e){
	if((x-e.x)*(x-e.x)+(y-e.y)*(y-e.y) <= (e.radius)*(e.radius) && e.visible){
		e.kill();
		return true;
	}
	return false;
}

var jump = false;
var jumphit = false;

var keys = {};
var exp = false;
var walkTimer = 0;

var gm = false;
var allowLeft = true;
var allowRight = true;

function handleKeys(){

	if(currentState==GAME_STATE){
		if(keys["27"]){
			resetMenu();
		}
	}
	
	if(!gm){
		if(keys["87"] || keys["38"] || keys["90"]){
			if(py.vl.y == 0 && !jump && !jumphit && py.sides.bottom){
				py.vl.y = -2;
				jump = true;
				py.jumpTimer = ms();
				jumphit = true;
				jumpSound.play();
			}
		}

		if(keys["65"] || keys["37"] || keys["81"]){
			if(!py.sides.left){
				py.vl.x = -1;
				py.facing = -1;
				py.lightAngle = Math.PI;
			}
		}else if(keys["68"] || keys["39"]){
			if(!py.sides.left){
				py.vl.x = 1;
				py.facing = 1;
				py.lightAngle = 0;
			}
		}

		if(py.sides.left || py.sides.right){
			py.vl.x = 0;
		}

	}else{
		if(keys["87"] || keys["38"]  || keys["90"]){
			py.vl.y = -2.5;
		}else if(keys["83"] || keys["40"]){
			py.vl.y = 2.5;
		}
		
		if(keys["65"] || keys["37"]  || keys["81"]){
			py.vl.x = -2.5;
			py.facing = -1;
		}else if(keys["68"] || keys["39"]){
			py.vl.x = 2.5;
			py.facing = 1;
		}
	}

	
}

doc.onkeydown = function(e){
	var k = e.keyCode || e.which;
	keys[k] = true;

	return;
};

doc.onkeyup = function(e){
	var k = e.keyCode || e.which;
	delete keys[k];

	if(!gm){
		if(e.keyCode == 87 || k == 38 || k == 90){
			jump = false;
			jumphit = false;
		}
		if(e.keyCode == 65 || e.keyCode == 68  || k==37 || k==39 || k==81){
			py.vl.x = 0;
		}
		if(k==32) exp = false;
	}else{
		if(k==87 || k == 83 || k == 38 || k == 40 || k==90){
			py.vl.y = 0;
		}
		
		if(k==65 || k==63 || k==37 || k==39 || k==81){
			py.vl.x = 0;
		}
	}
};

function tr(base,a,x,y){
	this.image = base;
	this.a = a;
	this.alpha = 1.0;
	this.x = x;
	this.y = y;
	this.rest = 0.1;
}

tr.prototype.dr = function(){
	if(this.alpha>this.rest){
		ctx.globalAlpha = this.alpha;
		var x = this.x*zoom,
			y = this.y*zoom,
			py = 16*zoom,
			px = 16*zoom;
		if(x>trans.x-px && y>trans.y-py && x<trans.x+c_width && y<trans.y+c_height){
			dI(this.image,this.x,this.y,this.a,1,1,1,1,0,0,2,2);
		}
		ctx.globalAlpha = 1.0;
	}
}

tr.prototype.ud = function(){
	this.alpha-=this.rest;
	if(this.alpha<this.rest) this.alpha = 0;
};

function pr(color){
	this.a = 0;
	this.image = doc.createElement("canvas");
	this.ctx = this.image.getContext("2d");
	
	this.image.width = this.image.height = 2;
	this.ctx.fillStyle = color || "#9c775a";
	this.ctx.fillRect(0,0,2,2);
	this.vl = {x:0,y:0};
	this.active = false;
	this.gr = {x:0,y:0.1};
	this.x = 0;
	this.y = 0;
	this.alpha = 1.0;
	this.aSub = rI(1,4);
	this.alphaSub = .01;
	this.last = {x:0,y:0};
	this.p = [];
	this.width = this.height = 2;
}

pr.prototype.dr = function(){
	if(this.active){
		
		
		this.x = this.last.x;
		this.y = this.last.y;
		ctx.globalAlpha = this.alpha;
		dI(this.image,this.x,this.y,this.a,1,1,1,1,0,0,2,2);
		ctx.globalAlpha = 1.0;
	}
};

pr.prototype.pDraw = function(){
	for(var i=0;i<this.p.length;i++){
		this.p[i].ud();
		this.p[i].dr();
	}
};

pr.prototype.ud = function(){
	if(this.active){
		this.p[this.p.length] = new tr(this.image,this.a,this.last.x,this.last.y);
		for(var i=0;i<this.p.length;i++){
			
			if(this.p[i].alpha<0){
				this.p.splice(i,1);
			}
		}
		this.alpha-=this.alphaSub;
		this.a+=this.aSub;
		this.vl.x += this.gr.x;
		this.vl.y += this.gr.y;
		this.last.x+=this.vl.x;
		this.last.y+=this.vl.y;
		if(this.alpha<this.alphaSub){
			this.p.splice(0,this.p.length);
			this.active = false;
		}
		
	}
};

pr.prototype.hrt = function(){
	if(!this.active) return;
	if(intr(py,this,py.width/2,py.height/2,1,1)){
		this.p.splice(0,this.p.length);
		this.active = false;
		py.life-=1;
	}
};

pr.prototype.start = function(x,y){
	if(!this.active){
		this.vl.x = rF(-2,2);
		this.vl.y = rF(-2,-0.1);
		this.last.x = x;
		this.last.y = y;
		this.x = x;
		this.y = y;
		this.alpha = 1.0;
		this.a = 0;
		this.active = true;
	}
};

function bm(){
	this.image = doc.createElement("canvas");
	this.image.width = this.image.height = 3;
	this.ctx = this.image.getContext("2d");
	this.ctx.fillStyle = "#000";
	this.ctx.fillRect(0,0,3,3);
	this.bounce = {
		x:0.4,
		y:0.4
	};
	this.gr = {
		x:0,
		y:.2
	};
	this.vl = {
		x:0,
		y:0
	};
	this.last = {
		x:0,
		y:0
	};
	this.x = 0;
	this.y = 0;
	this.radius = 12;
	this.active = false;
	this.lifeTimer = 0;
	this.alpha = 0;
	this.width = this.height = 3;
	this.col = 0;
	this.colTim = 0;
}

bm.prototype.pu = function(map,base,enes){
	if(!this.active) return;

	if(ms()-this.lifeTimer>600){
		var n = py.distanceToPoint(this.x,this.y);
		var v = (n/100)*50;
		if(v>100) v = 100;
		var fv = ((100-v)/100)*1;
		explosion.volume = 1.0;
		explosion.play();
		this.makeExplotion(map,enes);
		startShake = true;
		shakeTimer = ms();
		this.active = false;
		exp = false;
		var sh = ((100-v)/100)*4;
		shake.x = shake.y = sh;
	}

	this.vl.x += this.gr.x;
	this.vl.y += this.gr.y;
	this.last.x += this.vl.x;
	this.last.y += this.vl.y;

	for(var i=0;i<base.length;i++){
		var t = base[i];
		if(t.id == 1){
			if(intr(this,t,0,0)){
				if(Math.abs(this.vl.x+this.vl.y)>1){
					coinSound.play();
				}
				var r = inx(this,t,0,0);
				if(r.width>r.height){
					if(this.last.y>t.y){
						this.last.y+=r.height;
						this.vl.y = 0;
					}else{
						this.last.y-=r.height;
						this.vl.y *= -this.bounce.y;
						this.vl.x *= this.bounce.x;

					}
				}else{
					if(this.last.x>t.x){
						this.last.x+=r.width;
						this.vl.x *= -this.bounce.y;
					}else{
						this.last.x-=r.width;
						this.vl.x *= -this.bounce.y;
					}
				}
			}
		}
	}

	for(var i=0;i<map.length;i++){
		var t = map[i];
		if(t.id == 1){
			if(intr(this,t,0,0)){
				if(Math.abs(this.vl.x+this.vl.y)>1){
					coinSound.play();
				}
				var r = inx(this,t,0,0);
				if(r.width>r.height){
					if(this.last.y>t.y){
						this.last.y+=r.height;
						this.vl.y = 0;
					}else{

						this.last.y-=r.height;
						this.vl.y *= -this.bounce.y;
						this.vl.x *= this.bounce.x;
					}
				}else{
					if(this.last.x>t.x){
						this.last.x+=r.width;
						this.vl.x *= -this.bounce.y;
					}else{
						this.last.x-=r.width;
						this.vl.x *= -this.bounce.y;
					}
				}
			}
		}
	}
};

bm.prototype.makeExplotion = function(map,enes){
	var o = 0;
	for(var i=0;i<8;i++){
		var p = this.castRay(0.785*i,this.radius,map,[]);
		this.castRayToPlayer(0.785*i,this.radius)
		if(enes){
			for(var j=0;j<enes.length;j++){
				this.castRayEnemy(0.785*i,this.radius, enes[j]);
			}
		}
		this.killtl(p.x,p.y,map);
		o+=45;
	}
};

bm.prototype.killtl = function(x,y,map){
	var t = pointOverMap(x,y,map);

	if(t){
		t.kill();
		t.id = 0;
	}
};

bm.prototype.castRayEnemy = function(a,distance,e){
	var r = x = y = 0, a = a;
	while(r<=distance){
		x = this.x+Math.cos(a)*r;
		y = this.y+Math.sin(a)*r;
		if(pointOverEnemy(x,y,e)) break;
		r++;
	}
	return {x:x,y:y};
};

bm.prototype.castRayToPlayer = function(a,distance){
	var r = x = y = 0, a = a;
	while(r<=distance){
		x = this.x+Math.cos(a)*r;
		y = this.y+Math.sin(a)*r;
		if(pointOverPlayer(x,y,py.life-1)) break;
		r++;
	}
	return {x:x,y:y};
};

bm.prototype.castRay = function(a,distance,map,base){
	var r = x = y = 0, a = a;
	while(r<=distance){
		x = this.x+Math.cos(a)*r;
		y = this.y+Math.sin(a)*r;
		if(pointOverMap(x,y,map) || pointOverMap(x,y,base)) break;
		r++;
	}
	return {x:x,y:y};
};

bm.prototype.ud = function(){
	if(!this.active) return;
	this.x = this.last.x;
	this.y = this.last.y;
};

bm.prototype.dr = function(){
	if(this.active){
		ctx.drawImage(this.image,this.x,this.y);
		if(this.col==0){
			ctx.fillStyle = "#ffff00";
			dr(this.x,this.y,3,3)
			ctx.fillStyle = "#fff";
			this.col == 1;
		}

		if(ms()-this.colTim>50){
			if(this.col == 0) this.col = 1;
			else this.col = 0;
			this.colTim = ms();
		}
	}else if(!this.active && this.alpha>0){
		ctx.globalAlpha = this.alpha;
		dC(this.x,this.y,this.radius);
		ctx.globalAlpha = 1.0;
		this.alpha-=.02;
	}
};

bm.prototype.start = function(forcex,forcey,x,y){
	if(!this.active){
		this.active = true;
		this.alpha = 1.0;
		this.vl.x = forcex;
		this.vl.y = forcey;
		this.last.x = x;
		this.last.y = y;
		this.lifeTimer = ms();
		this.colTim = ms();
	}
};

function en(x,y){
	this.image = doc.createElement("canvas");
	this.ctx = this.image.getContext("2d");
	this.image.width = this.image.height = 5;
	this.part = [];
	this.ctx.fillStyle = "#e04d4d";
	this.ctx.fillRect(0,0,5,5);
	this.a = 0;
	this.s = {x:1,y:1};
	this.mid = 2.5;
	this.last = {x:x,y:y};
	this.x = x;
	this.y = y;
	this.visible = true;
	this.shake = .5;
	this.life = 5;
	this.radius = 2.5;
	for(var i=0;i<10;i++){
		this.part[this.part.length] = new pr("#e04d4d");
	}
	this.speed = 0.7;
	this.et = 0;
	this.dead = false;
	this.hitTimer = 0;
}

en.prototype.preUpdate = function(){
	if(this.dead) return;
	if(this.visible){
		this.a+=.01;
		if(py.distanceToPoint(this.last.x,this.last.y)<40 || this.et>0){
			var a = -py.aTo(this.last.x,this.last.y);
			this.last.x+=Math.cos(a)*this.speed;
			this.last.y+=Math.sin(a)*this.speed;
			this.s.x+=.004;
			this.s.y+=.004;
			this.radius*this.s.x;
			if(intr(py,this,py.width/2,py.height/2,this.mid,this.mid)){
				py.life-=.5;
			}
			if(this.et==0) this.et = ms();
			if(ms()-this.et>3000){
				explosion.volume = 1.0;
				explosion.play();
				for(var i=0;i<this.part.length;i++){
					this.part[i].start(this.last.x,this.last.y);
					this.visible = false;
				}
			}
		}
	}else{
		for(var i=0;i<this.part.length;i++){
			this.part[i].ud();
			this.part[i].hrt();
		}
	}
};

en.prototype.kill = function(){
	if(this.dead) return;

		this.visible = false;
		this.dead = true;
		explosion.volume = 1.0;
		explosion.play();
};

en.prototype.update = function(){
	if(this.dead) return;
	this.x = this.last.x;
	this.y = this.last.y;
};

en.prototype.draw = function(){
	if(this.dead) return;
	if(this.visible) dI(this.image,this.x,this.y,this.a,this.s.x,this.s.y,this.mid,this.mid,0,0,5,5);
	else{
		for(var i=0;i<this.part.length;i++){
			this.part[i].pDraw();
			this.part[i].dr();
		}
	}
};


function Door(x,y){
	this.image = doc.createElement("canvas");
	this.ctx = this.image.getContext("2d");
	this.width = this.image.width = 6;
	this.height = this.image.height = 8;
	this.ctx.fillStyle = "#84cce1";
	this.last = {
		x:x,
		y:y
	};
	this.ctx.fillRect(0,0,this.width,this.height);
	this.ctx.fillStyle = "#1a1a1a";
	this.ctx.fillRect(this.width-2,this.height/2,1,1);
}

Door.prototype.dr = function(){
	ctx.drawImage(this.image,this.last.x,this.last.y)
	if(intr(py,this,py.width/2,py.height/2) && !winGame){
		winGame = true;
		winSound.play();
	}
};



function tl(x,y,img,id,w,h){
	this.x = x;
	this.y = y;
	this.image = img;
	this.over = doc.createElement("canvas");
	this.over.width = this.over.height = w;
	this.ctx =this.over.getContext("2d");
	this.width = w;
	this.height = h;
	this.scale = {x:1,y:1};
	this.alpha = 1.0;
	this.id = id;
	this.last = {x:x,y:y};
	this.visible = true;
	this.part = [];
	for(var i=0;i<5;i++){
		this.part[this.part.length] = new pr();
	}
	this.partTimer = 0;
	if(this.id==1) this.coin = new Coins(x+w/2-1,y+h/2-1,this);
	this.showCoin = false;
	this.life = 100;
	this.digTimer = 0;
	this.isDigging = false;
}

tl.prototype.digging = function(){
	this.isDigging = true;
	this.life--;
	if(this.life==75){
		for(var i=0;i<20;i++){
			this.ctx.fillStyle="#2f251d";
			this.ctx.fillRect(rI(0,this.width-1),rI(0,this.height-1),1,1);
		}
	}
	if(this.life==25){
		for(var i=0;i<20;i++){
			this.ctx.fillStyle="#2f251d";
			this.ctx.fillRect(rI(0,this.width-1),rI(0,this.height-1),1,1);
		}
	}
	if(this.life<0){
		this.kill();
	}
};

tl.prototype.dr = function() {
	ctx.globalAlpha = this.alpha;
	ctx.drawImage(this.image,this.x,this.y);
	ctx.drawImage(this.over,this.x,this.y);
	ctx.globalAlpha = 1.0;
};

tl.prototype.drCoin = function(){
	if(this.showCoin){
		if(this.coin) this.coin.dr();
	}
};

tl.prototype.kill = function(){
	if(!this.visible) return;
	this.visible = false;
	for(var i=0;i<this.part.length;i++){
		this.part[i].start(this.x+this.width/2,this.y+this.height/2);
	}
	this.visible = false;
	this.id = 0;
	this.partTimer = ms();
	var max = 950;
	var r = rI(0,1000);
	if(bIndex <= 2){
		max = 700;
	}

	if(bIndex==bombs.length-1) max = 1000;

	if(this.coin && r>max) this.showCoin = true;
};

tl.prototype.ud = function(){

	if(!this.visible && ms()-this.partTimer<2000){
		for(var i=0;i<this.part.length;i++){
			this.part[i].ud();
		}
	}
	if(this.showCoin){
		if(this.coin) this.coin.ud();
	}
};

tl.prototype.drprs = function(){
	if(!this.visible && ms()-this.partTimer<2000){
		for(var i=0;i<this.part.length;i++){
			var x = this.part[i].x*zoom,
				y = this.part[i].y*zoom,
				py = 16*zoom,
				px = 16*zoom;
			this.part[i].pDraw();
			if(x>trans.x-px && y>trans.y-py && x<trans.x+c_width && y<trans.y+c_height)	this.part[i].dr();
		}
	}
};

function Coins(x,y,parent){
	this.image = doc.createElement("canvas");
	this.image.width = this.image.height = 2;
	this.ctx = this.image.getContext("2d");
	this.width = this.height = 2;
	this.ctx.fillStyle = "#ffff00";
	this.ctx.fillRect(0,0,2,2);
	this.x = x;
	this.y = y;
	this.last = {
		x:x,
		y:y
	}
	this.visible = true;
}

Coins.prototype.ud = function(){
	if(!this.visible) return;
	if(intr(py,this,py.width/2,py.height/2)){
		if(bIndex<bombs.length-1 && this.visible){
			coinSound.play();
			bIndex++;
			this.visible = false;
			parent.showCoin = false;
		}
	}
};

Coins.prototype.dr = function(){
	if(!this.visible) return;
	ctx.drawImage(this.image,this.x,this.y);
};
var count = 0;

function drtls(tiles){
	for(var i=0;i<tiles.length;i++){
		var t = tiles[i];
		var x = t.x*zoom,
			y = t.y*zoom,
			py = t.width*zoom,
			px = t.height*zoom;
		t.ud();
		if(x>trans.x-px && y>trans.y-py && x<trans.x+c_width && y<trans.y+c_height){
			if(t.visible) t.dr();
		}
		if(!t.visible) t.drprs();
		t.drCoin();
	}
}

// bombs test

var bombs = [];

for(var i=0;i<5;i++){
	bombs[bombs.length] = new bm();
}
var bIndex = bombs.length-1;
var bTimer = 0;

function shootbm(x,y,_x,_y){
	if(ms()-bTimer> 1000 && bIndex>=0)
	bombs[bIndex].start(x,y,_x,_y);
	bIndex--;
	if(bIndex<=0) bIndex = 0;
	bTimer = ms();
	bombBar = 0;
	sec = ms();
}

// game
var frameRate = 1000/60;
var seed = "aecefgeaahdhbbdhcgbgcdhcecfgbdafhfghfggbgcdhcgbgcdhcecfgbdafhfghfggbgcbgfeaebdgaedbbcchgdhcecfgbdafhccfghfggbgcbgfeaebdg";
var max_width = 5;
var map = gM(seed,levels);
var map_base = gmb(map,max_width)

var tile = doc.createElement("canvas");
tile.width = tile.height = 16;
var t1 = tile.getContext("2d");
t1.fillStyle = "#5a4738";
t1.fillRect(0,0,16,16);
t1.fillStyle = "#9c775a";

var h1 = rI(2,4);
t1.fillRect(0,0,16,h1);

for(var i=0;i<20;i++){
	var x = rI(0,16);
	var y = rI(h1,16/2-2);
	t1.fillRect(x,y,2,2);
}

for(var i=0;i<10;i++){
	var x = rI(0,16);
	var y = rI(16/2,16-2);
	var s = rI(1,2);
	t1.fillRect(x,y,s,s);
}

var tile2 = doc.createElement("canvas");
tile2.width = tile2.height = 16;
var t2 = tile2.getContext("2d");

t2.fillStyle = "#2f251d";
t2.fillRect(0,0,16,16);
t2.fillStyle = "#523e2f";

for(var i=0;i<10;i++){
	var x = rI(1,16-1);
	var y = rI(1,16-1);
	var s = rI(1,2);
	t2.fillRect(x,y,s,s);
}

var arrow ={
	img:doc.createElement("canvas"),
	ctx:null,
	a:0,
	handle:{
		x:0,
		y:0
	},
	x:0,
	y:0,
	init:function(){
		arrow.img.width = 10;
		arrow.img.height = 5;
		arrow.ctx = arrow.img.getContext("2d");
		arrow.handle = {x:5,y:2.5};
		arrow.ctx.fillStyle = "#fff";
		arrow.ctx.fillRect(0,1,7,3);
		arrow.ctx.beginPath();
		arrow.ctx.moveTo(10,2.5);
		arrow.ctx.lineTo(7,5);
		arrow.ctx.lineTo(7,0);
		arrow.ctx.lineTo(10,2.5);
		arrow.ctx.fill();
		arrow.ctx.closePath();
	},
	dr:function(){
		ctx.globalAlpha = .5;
		arrow.a=Math.atan2(door.last.x+door.width/2-arrow.x,door.last.y+door.height/2-arrow.y)+(90*Math.PI/180);
		dI(arrow.img,arrow.x,arrow.y-20,-arrow.a,-1,1,arrow.handle.x,arrow.handle.y,0,0,arrow.img.width,arrow.img.height);
		ctx.globalAlpha = 1.0;
	}
}

var tiles = [];
var base_tiles = [];
var background = [];

mm(map,max_width,16,0,0,0,[tile,tile2],tiles,base_tiles,background);

py.init(17,17);
py.gr.y = .05;
var zoom = 10;

ctx.imageSmoothingEnabled = false;	
ctx.mozImageSmoothingEnabled = false;
ctx.oImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;

var trans = {x:0,y:0};

var shakeTimer = 0;
var shake = {x:4,y:4};
var startShake = false;
var follow = {x:0,y:0};
var lock = false;
var bombBar = 10;
var maxbmBar = 10;
var sec = 0;

var mouse = {
	x:0,
	y:0,
	isDown:false
};
var startDigg = false;
var diggPower = 100;

ctx.canvas.onmousedown = function(e){
	if(e.button == 0){
		lock = true;
		mouse.isDown = true;
		startDigg = false;
	}else if(e.button == 2){
		lock = false;
		mouse.isDown = true;
		startDigg = true;
	}
};

ctx.canvas.onmousemove = function(e){
	mouse.x = e.clientX - ctx.canvas.offsetLeft;
	mouse.y = e.clientY - ctx.canvas.offsetTop;
};

ctx.canvas.onmouseup = function(e){
	mouse.isDown = false;
	startDigg = false;
};

function resetGame(){
	if(max_width>1){
		max_width--;
		maxTime+=7000;
		levelShow.clearRect(0,0,levelShow.canvas.width,levelShow.canvas.height);
		var lvl = 1;
		if(max_width==3){
			lvl = 2;
		}else if(max_width==2){
			lvl = 3;
		}else if(max_width == 1){
			lvl = 4;
		}
		levelShow.fillText("Level "+lvl,levelShow.canvas.width/2,levelShow.canvas.height/2+18)
	}else{
		resetMenu();
		alert("Congratulations! you've made it. Now breath in peace.");
		return;
	}
	map = null;
	map = gM(seed,levels);
	map_base = null;
	map_base = gmb(map,max_width);
	tiles.splice(0,tiles.length);
	base_tiles.splice(0,base_tiles.length);
	background.splice(0,background.length);

	mm(map,max_width,16,0,0,0,[tile,tile2],tiles,base_tiles,background);
	py.last.x = ((max_width*7)*16)/2;
	py.last.y = 17;
	py.life = py.maxLife;
	bombs.splice(0,bombs.length);
	for(var i=0;i<5;i++){
		bombs[bombs.length] = new bm();
	}
	bIndex = bombs.length-1;
	fr =0;
	follow.x = follow.y = 0;
	killAlpha = 0;
	_TimerLife = ms();
	var d = rI((base_tiles.length-1)-max_width*7,(base_tiles.length-2));
	var t = base_tiles[d];
	door.last.x = t.x+8-door.width/2;
	door.last.y = t.y-door.height;
	winAlpha = 0;
	winGame = false;
	levelAlpha = 1.0;
	d = rI((base_tiles.length-1)-max_width*7,(base_tiles.length-2));
	t = base_tiles[d];
	enemies.splice(0,enemies.length);
	for(var i=0;i<40;i++){
		var e = new en(rI(20,(max_width*7)*16-20),rI(200,door.last.y));
		enemies[enemies.length] = e;
	}

};

var fr = 0;

var deadprs = [];
var dpartTimer = 0;
for(var i=0;i<50;i++){
	deadprs[deadprs.length] = new pr("#ff0000");
}

function resetMenu(){
	change = false;
	changeAlpha = 0;
	py.alpha =0;
	menuAlpha = 0;
	max_width = 5;
	pdone = false;
	currentState = MENU_STATE;
}
var enemies = [];
var resets = false;
var resAlpha = 0;
var MENU_STATE = 0;
var GAME_STATE = 1;
var currentState = 0;
var menuAlpha = 0;
ctx.textAlign = "center";
ctx.font = "1px Verdana";
py.alpha = 0;
var logo = new Image();
logo.src = "logo.png";
var change = false;
var changeAlpha = 0;
var _TimerLife = 0;
var diggTimer = 0;
var killAlpha = 0;
var winGame = false;
var door = new Door(py.x,py.y);
var winAlpha = 0;
var maxTime = 20000;
var levelAlpha = 1.0;
var levelShow = doc.createElement("canvas").getContext("2d");
levelShow.canvas.width = c_width/zoom;
levelShow.canvas.height = c_height/zoom;
levelShow.font = "10px Verdana";
levelShow.textAlign = "center";
levelShow.fillStyle = "#ffffff";

levelShow.fillRect(0,0,2,2);
levelShow.fillText("Level 1",levelShow.canvas.width/2,levelShow.canvas.height/2+18);
var click = doc.createElement("canvas").getContext("2d");
click.canvas.width = (c_width/8);
click.canvas.height = (c_height/8);
click.fillStyle = "#bc3a3a";
click.font = "7px Verdana";
click.textAlign = "center";
click.fillText("click to play",click.canvas.width/2,click.canvas.height/2+18);

var distance = doc.createElement("canvas").getContext("2d");
distance.canvas.width = c_width/zoom;
distance.canvas.height = c_height/zoom;
distance.fillStyle ="#fff";
distance.font = "7px Verdana";
distance.textAlign = "right";

digSTimer = 0;

arrow.init();

var enem = new en(0,0);
var pdone = false;

function gameLoop(){
	cls();
	switch(currentState){
		case MENU_STATE:
			ctx.save();
			ctx.scale(8,8);
			
			py.x = (c_width/8)/2;
			py.y = (c_height/8)/2+4;
			py.currentAnim = py.walk;
			py.frame = 1;
			if(!change) py.dr();
			ctx.globalAlpha = menuAlpha;
			ctx.drawImage(logo,py.x-logo.width/2,py.y-logo.height/2-py.height*2);
			ctx.drawImage(click.canvas,0,0);
			py.alpha +=.01;
			if(py.alpha>=1){
				py.alpha = 1;
				menuAlpha+=.01;
				if(!pdone){
					winSound.play();
					pdone = true;
				}
			}
			if(menuAlpha>1){
				menuAlpha = 1;

				if(mouse.isDown && !change){
					change = true;
					explosion.volume = 1.0;
					explosion.play();
					for(var i=0;i<deadprs.length;i++){
						deadprs[i].start(py.x,py.y);
					}

				}

				if(change){
					for(var i=0;i<deadprs.length;i++){
						
						deadprs[i].ud();
						deadprs[i].pDraw();
						deadprs[i].dr();

					}
				}
			}

			if(change){
				sc("#000");
				ctx.globalAlpha = changeAlpha;
				dr(0,0,c_width,c_height);
				changeAlpha+=.01;
				if(changeAlpha>1){
					mouse.isDown = false;
					lock = false;
					resetGame();
					currentState = GAME_STATE;
				}
			}
			
			ctx.restore();
			break;

		case GAME_STATE:

			if(ms()-_TimerLife>maxTime && !winGame){
				_TimerLife = ms();
				py.life-=1
			}

			handleKeys();
			sc();
			
			if(py.life>0 && !winGame) py.pu(tiles,base_tiles);
			
			ctx.save();

			if(follow.x == 0 && follow.y == 0){
				follow.x = py.last.x;
				follow.y = base_tiles[0].y+4+(c_height/zoom)/2;
			}

			if(py.last.x>base_tiles[0].x+3+(c_width/zoom)/2 && py.last.x<base_tiles[max_width*7+1].x+16-(c_width/zoom)/2){
				follow.x = py.last.x;
			}
			if(py.last.y>base_tiles[0].y+4+(c_height/zoom)/2 && py.last.y<base_tiles[base_tiles.length-1].y+16-(c_height/zoom)/2){
				follow.y = py.last.y;
			}

			trans.x = (follow.x-py.width/2)*zoom-(c_width/2);
			trans.y = (follow.y-py.height/2)*zoom-(c_height/2);
			
			if(startShake){
				trans.x+=shake.x;
				trans.y+=shake.y;
				shake.x*=-1;
				shake.y*=-1;
				if(ms()-shakeTimer>500){
					startShake = false;
				}
			}
			ctx.translate(-trans.x,-trans.y);
			ctx.scale(zoom,zoom);
			drtls(background);
			if(py.life>0 && !winGame){
				py.ud();

				py.dr(tiles,base_tiles);
				if(lock && ms()-bTimer> 1000 && bIndex>0){
						var mx = trans.x+mouse.x;
						var my = trans.y+mouse.y;
						mx /= zoom;
						my /= zoom;

						var a = -py.aTo(mx,my);
						var dist = py.distanceToPoint(mx,my);
						if(dist>10) dist = 10;
						var cx = py.x+Math.cos(a)*-dist;
						var cy = py.y+Math.sin(a)*-dist;
						ctx.fillStyle = "#ffff00";
						dLn(py.x,py.y,cx,cy);
						ctx.fillStyle = "#ffffff";
						if(!mouse.isDown){
							lock = false;
							var mx = trans.x+mouse.x;
							var my = trans.y+mouse.y;
							mx /= zoom;
							my /= zoom;
							var a = -py.aTo(mx,my);
							var fx = Math.cos(a)*-(dist*0.29);
							var fy = Math.sin(a)*-(dist*0.29);
							shootbm(fx,fy,py.last.x,py.last.y);
						}
				}else if(startDigg){
						var mx = trans.x+mouse.x;
						var my = trans.y+mouse.y;
						mx /= zoom;
						my /= zoom;

						var a = -py.aTo(mx,my);
						var dist = py.distanceToPoint(mx,my);
						if(dist>10) dist = 10;
						var cx = py.x+Math.cos(a)*-dist;
						var cy = py.y+Math.sin(a)*-dist;
						ctx.fillStyle = "#00ffff";
						dLn(py.x,py.y,cx,cy);
						ctx.fillStyle = "#ffffff";
						var t = pointOverMap(cx,cy,tiles);
						var e = false;
						for(var i=0;i<enemies.length;i++){
							e = pointOverEnemy(cx,cy,enemies[i]);
						}
						if(t || e){
							startShake = true;
							shakeTimer = ms();
							if(t)t.digging();
							if(t)t.isDigging = true;
							diggPower--;
							if(digSTimer=0) digSTimer = ms();

							if(ms()-digSTimer>100){
								explosion.volume = .5;
								explosion.play();
							}

							if(diggPower<0){
								diggTimer = ms();
								diggPower = 0;
								startDigg = false;
								startShake = false;
							}
						}
						if(!mouse.isDown && t) t.isDigging = false;
				}else{
					if(ms()-diggTimer>100 && diggPower<100){
						if(diggPower<100){
							diggPower++;
						}else{
							diggPower = 100;
						}
						diggTimer = ms();
					}
				}

				for(var i=0;i<bombs.length;i++){
					bombs[i].pu(tiles,base_tiles,enemies);
					bombs[i].ud();
					bombs[i].dr();
				}
			}
			drtls(base_tiles);
			drtls(tiles);

			for(var i=0;i<enemies.length;i++){
				enemies[i].preUpdate();
				enemies[i].update();
				enemies[i].draw();
			}

			door.dr();
			arrow.x = py.x;
			arrow.y = py.y;
			arrow.dr();
			
			ctx.restore();

			ctx.save();
			ctx.scale(zoom,zoom);
			ctx.globalAlpha = 1.0;
			distance.clearRect(0,0,c_width/zoom,c_height/zoom)
			distance.fillText(Math.floor(py.distanceToPoint(door.last.x,door.last.y)),c_width/zoom-1,7);
			ctx.drawImage(distance.canvas,0,0);
			ctx.restore();

			if(levelAlpha>0.01){
				ctx.save();
				ctx.scale(zoom,zoom);
				ctx.globalAlpha = levelAlpha;
				ctx.drawImage(levelShow.canvas,0,0);
				ctx.globalAlpha = 1.0;
				ctx.restore();
				levelAlpha-=.01;
			}

			if(bombBar<maxbmBar){
				if(ms()-sec>100){
					bombBar++;
					if(bombBar>maxbmBar) bombBar = maxbmBar;
					sec = ms();
				}
			}

			if(py.life<=0 && !resets){
				resets = true;
				for(var i=0;i<deadprs.length;i++){
					deadprs[i].start(py.x,py.y);
				}
				dpartTimer = ms();
				fr++;
			}else{

				if(py.life>py.maxLife/1.5 && py.life>py.maxLife/2) sc("#00ff00");
				else if(py.life>py.maxLife/2) sc("#ffff00");
				else sc("#ff0000");
				ctx.globalAlpha = 0.5;
				dr(zoom,zoom,py.maxLife*zoom,zoom);
				ctx.globalAlpha = 1;

				var lf = py.life;
				if(lf<0) lf = 0;
				dr(zoom,zoom,lf*zoom,zoom);
				sc("#00ffff");
				ctx.globalAlpha = 0.5;
				dr(zoom,zoom*3,100,zoom);
				ctx.globalAlpha = 1.0;
				dr(zoom,zoom*3,diggPower,zoom);
				for(var i=0;i<bombs.length-1;i++){
					ctx.globalAlpha = 0.2;
					sc("#ffff00");
					dr(zoom+i*(20),(zoom*5),18,18);
				}

				for(var i=0;i<bIndex;i++){
					ctx.globalAlpha = 1.0;
					dr(zoom+i*(20),(zoom*5),18,18);
				}
			}

			if(py.life<2){
				if(killAlpha<.2){
					killAlpha+=.005;
				}else killAlpha = .2;
				ctx.globalAlpha = killAlpha;
				sc("#ff0000");
				dr(0,0,c_width,c_height);
				ctx.globalAlpha = 1.0;
			}

			if(resets){
				ctx.globalAlpha = resAlpha;
				sc("#000");
				dr(0,0,c_width,c_height)
				ctx.globalAlpha = 1.0;
				resAlpha+=.015;
				if(resAlpha>1){
					
					fr++
					if(fr>1){
						resetMenu();
						resets = false;
						resAlpha = 0;
						for(var i=0;i<deadprs.length;i++){
							deadprs[i].active = false;
						}
					}

				}
				for(var i=0;i<deadprs.length;i++){
					
					deadprs[i].ud();
					ctx.save()
					trans.x = (follow.x-py.width/2)*zoom-(c_width/2);
					trans.y = (follow.y-py.height/2)*zoom-(c_height/2);
					ctx.translate(-trans.x,-trans.y);
					ctx.scale(zoom,zoom);
					deadprs[i].pDraw();
					deadprs[i].dr();
					ctx.restore()
				}
			}

			if(winGame){
				sc("#fff");
				ctx.globalAlpha = winAlpha;
				dr(0,0,c_width,c_height);
				ctx.globalAlpha = 1.0;
				if(winAlpha<1){
					winAlpha+=.01;
				}else{
					winAlpha = 1;
					resetGame();
				}
			}

			sc("#fff");
			break;
	}
	setTimeout(gameLoop,frameRate);
}


function start(){
	gameLoop();
}

_win.onload = start;