import Duddle from "../Duddle.js";
//import Game from "../../Game.js";
class Brick{
    //TODO: add Node item from LinkedList to brick constructor for faster delete
    constructor(x,y){
        this._x=x;
        this._y=y;
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    width(){
        return Brick.WIDTH;
    }
    height(){
        return 20;
    }
    model(){
        return 'brick';
    }
    equals(other){
        return other.x===this.x && other.y===this.y;
    }
    toString(){
        return `{x: ${this.x}, y: ${this.y}}`
    }
    /**@param {Game} game*/
    xScreen(game){
        return this.x/game.xWidth*game.canvasWidth
    }
    /**@param {Game} game*/
    yScreen(game){
        return (1 - Number(this.y - game.yOffset)/game.yHeight)*game.canvasHeight
    }
    update(_,time){}
    jump(brickController){
        return true;
    }
    /**@param {Duddle} duddle*/
    isJumped(duddle){
        return (Math.abs(duddle.xPos-this.x) <=
            duddle.game.xWidth /duddle.game.canvasWidth * (Brick.WIDTH + Duddle.WIDTH)/2 &&
            this.y >= duddle.yPos &&
            this.y <= duddle.lastUpdateJumpPosY);
    }

}
Brick.WIDTH = 100;
export default Brick;