import HighJumpBrick from "./bricks/HighJumpBlock.js";
const jumpTime = 1000,
    V0 = 5000n,
    BIG_V0 = 10000n,
    moveSpeed = 1.0;
class Duddle{
    /**@param {Game} game*/
    constructor(game){
        this.game=game;
        this.yPos = 0n;
        this.xPos = this.game.xWidth/2;
        this.startJumpTime = 0;
        this.startJumpPosY = 0n;
        this.lastUpdateJumpPosY = 0n;
        this.direction = Duddle.DIRECTION_NONE;
        this.isHighJump = false;
    }
    get screenY(){
        const screenPercent = Number(this.yPos - this.game.yOffset) / this.game.yHeight;
        return this.game.canvasHeight*(1-screenPercent)
    }
    get screenX(){
        return this.xPos/this.game.xWidth * this.game.canvasWidth;
    }
    jumpTime(time){
        return time - this.startJumpTime;
    }
    isGoingDown(time){
        return this.jumpTime(time) > jumpTime/2
    }
    update(updateTime,time) {
        this.jump(time);
        this.moveX(updateTime);
        this.verifyJump(time);
        this.game.score = Number(this.yPos / 100000n );
        if(this.isGoingDown(time) && this.game.isGameOver(time) !== false);
    }

    jump(time){
        this.lastUpdateJumpPosY = this.yPos;
        let t = this.jumpTime(time);
        /*while(t > jumpTime){
            this.startJumpTime += jumpTime;
            t = this.jumpTime(time);
        }*/
        t=BigInt(t);
        this.yPos = this.startJumpPosY + t*((this.isHighJump?BIG_V0:V0) - 5n*t);//this.startJumpPosY + V0 * t - 10n*t*t/2n;
    }
    moveX(updateTime){
        if (this.direction !== Duddle.DIRECTION_NONE) {
            if(this.direction === Duddle.DIRECTION_LEFT) {
                this.xPos -= updateTime * this.game.xWidth / 1000 * moveSpeed;
            } else{
                this.xPos += updateTime * this.game.xWidth / 1000 * moveSpeed;
            }
            while(this.xPos<0)this.xPos += this.game.xWidth;
            while(this.xPos>this.game.xWidth)this.xPos -= this.game.xWidth;
        }
    }
    verifyJump(time){
        if(!this.isGoingDown(time))return ;
        for (let /**@type {Brick}*/brick of this.game.bricksController.iterator()) {
            if (brick.y >= this.yPos) {
                if (brick.isJumped(this)) {
                    //todo: check if few bricks jumped
                    this.isHighJump = brick instanceof HighJumpBrick;
                    brick.jump(this.game.bricksController);
                    this.startJumpPosY = brick.y;
                    this.startJumpTime = time;
                    this.game.yOffsetTo = this.isHighJump?brick.y + BigInt(this.game.yHeight*3/4):brick.y - BigInt(this.game.yHeight / 4);
                    this.game.bricksController.reSpam();

                }
                break;
            }
        }


    }

    moveRight(startMove) {
        if(startMove)
            this.direction = Duddle.DIRECTION_RIGHT;
        else if(this.direction !== Duddle.DIRECTION_LEFT)
            this.direction = Duddle.DIRECTION_NONE;
    }
    moveLeft(startMove){
        if(startMove)
            this.direction=Duddle.DIRECTION_LEFT;
        else if(this.direction !== Duddle.DIRECTION_RIGHT)
            this.direction = Duddle.DIRECTION_NONE;
    }
}
Duddle.WIDTH = 60;
Duddle.DIRECTION_NONE = 0;
Duddle.DIRECTION_RIGHT = 1;
Duddle.DIRECTION_LEFT = 2;
export default Duddle;