import Brick from "./bricks/Brick.js";
import Duddle from './Duddle.js'
import Game from "../Game.js";
class Drawer{
    constructor(){
        this.imagesSrc = ['hero1','brick','no_brick','jump_brick','wall','wall2'];
        this.images = {};
        this.canvas = this.ctx = undefined
    }
    update(canvas,w,h){
        this.canvas = canvas;
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx =canvas.getContext('2d');
    }
    get w(){return this.canvas.width}
    get h(){return this.canvas.height}
    redraw(game){
        this.ctx.clearRect(0,0,this.w,this.h);
        this.drawBg(game);
        this.drawBricks(game);
        this.drawDuddle(game.duddle);
    }
    /**
     * @param {Duddle} duddle*/
    drawDuddle(duddle){
        //this.ctx.fillStyle = "red";
        this.ctx.drawImage(this.images['hero1'],duddle.screenX-Duddle.WIDTH/2,
            duddle.screenY-100,
            Duddle.WIDTH,
            100)
    }
    /**
     * @param {Game} game*/
    drawBricks(game){
        for(let i of game.bricksController.iterator()){
            const x = i.xScreen(game)-Brick.WIDTH/2,
                y = i.yScreen(game) +5,
                width=i.width(),
                height=i.height(),
                model = i.model();
            if(y + height < 0) break;
            this.ctx.drawImage(
                this.images[model],x,y,width,height);
            //this.ctx.drawImage(this.images['brick'],x,y,width,height);
            /*if(!(i instanceof MovingBrick)) {
                if (x < 0) this.ctx.fillRect(x + this.w, y, width, height);
                if (x + width > this.w) this.ctx.fillRect(x - this.w, y, width, height);
            }*/
        }
    }
    loadImages(){
        return Promise.all(
            this.imagesSrc.map(title => new Promise((success,fail)=>{
                let image = new Image;
                image.src=`./img/${title}.png`;
                image.addEventListener('load', success);
                image.addEventListener('error',fail);
                this.images[title] = image;
            }))
        );
    }
    drawBg(game){
        const f = Number(game.yOffset % BigInt(game.yHeight)),
            deltaY = f/game.yHeight * this.h,
            isFirst = game.yOffset / BigInt(game.yHeight)%2n;
        this.ctx.drawImage(this.images[isFirst?'wall':'wall2'],0,deltaY,this.w,this.h);
        this.ctx.drawImage(this.images[isFirst?'wall2':'wall'],0,deltaY+(game.yOffset < 0?this.h:-this.h),this.w,this.h);
        //this.ctx.drawImage(this.images['wall'],0,deltaY+this.h,this.w,this.h);
    }
}
export default Drawer;
