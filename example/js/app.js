var canvas, stage, af, stars=[], shelter, stats;

var STARS = 'assets/stars.png?v=4',
    STAR = 'assets/star.png?v=4',
    SHELTER = 'assets/shelter.png?v=4';
collisionMethod = ndgmr.checkPixelCollision;
function toggleCollisionMethod() {
   if ( collisionMethod == ndgmr.checkPixelCollision ) {
      collisionMethod = ndgmr.checkRectCollision;
   } else {
      collisionMethod = ndgmr.checkPixelCollision;
   }
}
window.alphaThresh = 0.75;
function onRangeChange() {
   var range = document.getElementById('alphaThres');
   window.alphaThresh = parseFloat(range.value);
   //console.log(window.alphaThresh);
}
function init() {
  // creating the canvas-element 
  canvas = document.createElement('canvas'); 
  canvas.width = getWidth(); 
  canvas.height = getHeight(); 
  document.body.appendChild(canvas); 
   
  // initializing the stage 
  stage = new createjs.Stage(canvas);
   
  // creating a new HTMLImage
  af = new AssetFactory();
  af.onComplete = function() {
     imagesLoaded();
  }
  af.loadAssets([STAR,STARS,SHELTER]);
}
 
// creating a Bitmap with that image 
// and adding the Bitmap to the stage 
function imagesLoaded(e) {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild( stats.domElement );
  var ss = new createjs.SpriteSheet({images:[af[STARS]],frames: {width:30, height:22, count:4, regX: 0, regY:0}, animations:{blink:[0,3]}});
  for ( var c = 0; c < 100; c++ ) {
     if ( Math.random() < 0.2 ) {
        var star = new createjs.Sprite(ss);
        star.spriteSheet.getAnimation('blink').speed = 1/((Math.random()*3+3)|0);
        star.gotoAndPlay('blink');
        if( Math.random() < 0.5 ) star.advance();
     } else {
        star = new createjs.Bitmap(af[STAR]);
        if ( Math.random() < 0.66 ) {
          star.sourceRect = new createjs.Rectangle(0,0,star.image.width/2,star.image.height/2);
        } else if ( Math.random() < 0.33 ) {
          star.sourceRect = new createjs.Rectangle(0,0,star.image.width/2,star.image.height);
        }
     }
     star.x = Math.random()*canvas.width;
     star.y = Math.random()*canvas.height;
     star.regX = 25;
     star.regY = 25;
     star.velY = Math.random()*1.5+1;
     star.rotVel = Math.random()*4-2;
     star.scaleX = star.scaleY = Math.random()*.5+.5;
     star.rotation = Math.random() * 360;
     stage.addChild(star);
     stars.push(star);
  }
  shelter = new createjs.Bitmap(af[SHELTER]);
  shelter.x = canvas.width/2;
  shelter.y = canvas.height/1.5;
  shelter.regX = shelter.image.width / 2;
  shelter.regY = shelter.image.height / 2;
  stage.addChild(shelter);

  // set the Ticker to 30fps 
  createjs.Ticker.setFPS(30); 
  createjs.Ticker.addEventListener('tick', this.onTick.bind(this)); 
}
 
// update the stage every frame 
function onTick(e) {
   stats.begin();
   for ( var c = 0; c < stars.length; c++ ) {
      var star = stars[c];
      star.y += star.velY;
      star.rotation += star.rotVel;
      
      var intersection = collisionMethod(shelter,star,window.alphaThresh);
      if ( intersection ) {
         //console.log(intersection.x,intersection.y,intersection.width,intersection.height);
         star.y = -15 - Math.random()*15;
         star.x = Math.random()*canvas.width;
      }
      if ( star.y > canvas.height ) {
        star.y = -15 - Math.random()*15;
        star.x = Math.random()*canvas.width;
      }
   }
  stage.update();
  //shelter.x = stage.mouseX;
  //shelter.y = stage.mouseY;
  stats.end();
}


function getWidth() {
  if( typeof( window.innerWidth ) == 'number' ) {
    return window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    return document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    return document.body.clientWidth;
  }
}

function getHeight() {
  if( typeof( window.innerWidth ) == 'number' ) {
    return window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    return document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientHeight || document.body.clientHeight ) ) {
    return document.body.clientHeight;
  }
}

window.onload = init;