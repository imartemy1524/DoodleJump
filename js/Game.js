import Mover from "./game/Mover.js";
import Duddle from "./game/Duddle.js";
import $ from "./utils/jsq.js";
import BricksController from "./game/bricks/BricksController.js";
import Utils from "./utils/Utils.js";
class Game{
    constructor(canvas) {
        this._isGameOver = false;
        this.gameOverStart = null;

        this.yHeight = 3750000;
        this.xWidth = 8000;
        this.yOffset = 0n;
        this.yOffsetTo = 0n;
        this.mover = new Mover();
        this.duddle = new Duddle(this);
        this.bricksController = new BricksController(this);
        Game.drawer.update(canvas,400,800);
        this._score = 0n;
        this.scoreEl = $("#score b");
    }
    set score(value){
        if(value>this._score) {
            this._score = value;
            this.scoreEl.innerText=(value);
        }
    }
    get canvasWidth(){
        return Game.drawer.w;
    }
    get canvasHeight(){
        return Game.drawer.h;
    }
    startGame(){
        this.mover.start(this);
    }
    update(timeSwamp){
        if(this._isGameOver) this.yOffsetTo = this.duddle.yPos - BigInt(this.yHeight);
        if(this.yOffset !== this.yOffsetTo){
            if(this.yOffsetTo > this.yOffset) {
                const delta = this.yOffsetTo -this.yOffset;
                this.yOffset += BigInt(this.yHeight * timeSwamp / (this.duddle.isHighJump?500:2000));
                if(this.yOffset > this.yOffsetTo) this.yOffset = this.yOffsetTo;
            }
            else{
                this.yOffset -= BigInt(this.yHeight * timeSwamp / (this._isGameOver?300:1000));
                if(this.yOffset < this.yOffsetTo) this.yOffset = this.yOffsetTo;
            }
        }
    }
    isGameOver(time){
        if(!this._isGameOver) {
            if(this._isGameOver = this.bricksController.at(0).y > this.duddle.yPos)
                this.gameOverStart = time;

        }
        return this._isGameOver;
    }
    static gameOver() {
        Utils.fadeIn($("#end-game"),$("#start-btn"));
        $("#pause-btn").style['display']="";
    }
}
export default Game;