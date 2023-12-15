import Brick from "./Brick.js";
import Utils from "../../utils/Utils.js";

class MovingBrick extends Brick{
    constructor(x,y,maxX,movingDelay,moveDirection=MovingBrick.DIRECTION_LEFT){
        super(x,y);
        this.movePercent = 0;
        this.movingDelay = movingDelay;
        this.startTime = null;
        this.moveDirection = moveDirection;
        this.maxX = maxX;
    }
    /**@override*/
    update(_, time) {
        if(this.startTime===null) this.startTime = time;
        else{
            let timeSwamp = time - this.startTime;
            this.movePercent = (timeSwamp % this.movingDelay) / this.movingDelay;
        }
    }
    /**@override*/
    get x(){
        let x = this._x;
        switch(this.moveDirection ){
            case MovingBrick.DIRECTION_LEFT:
                let startLeftP = x/(2*this.maxX);
                if(this.movePercent < startLeftP) {
                    x = this.maxX*(startLeftP - this.movePercent)*2;
                }else{
                    x = this.maxX * (this.movePercent - startLeftP)*2;
                    if(x>this.maxX)x = 2 * this.maxX - x
                }
                break;
            case MovingBrick.DIRECTION_RIGHT:
                let startRightP = (this.maxX-x)/(2*this.maxX);
                if(this.movePercent < startRightP) {
                    x = this.maxX * ( 1 - (startRightP - this.movePercent)*2);
                } else {
                    x = this.maxX * (1- (this.movePercent - startRightP)*2);
                    if(x<0)x =-x;
                }
                break;
            case MovingBrick.DIRECTION_ONLY_LEFT:
                x = Utils.overRange(this.maxX * (1-this.movePercent) + x, this.maxX);
                break;
            case MovingBrick.DIRECTION_ONLY_RIGHT:
                x = Utils.overRange(this.maxX * this.movePercent + x, this.maxX);
                break;
        }
        return x;
    }
    /**@override*/
    xScreen(game) {
        return this.x/this.maxX*game.canvasWidth;
    }
}
MovingBrick.DIRECTION_LEFT=0;
MovingBrick.DIRECTION_RIGHT=1;
MovingBrick.DIRECTION_ONLY_RIGHT=2;
MovingBrick.DIRECTION_ONLY_LEFT=3;


export default MovingBrick;