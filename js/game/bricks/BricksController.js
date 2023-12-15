import LinkedList from "../../utils/linkedList.js";
import Brick from "./Brick.js";
import MovingBrick from "./MovingBrick.js";
import Utils from "../../utils/Utils.js";
import OneTouchBrick from "./OneTouchBrick.js";
import HighJumpBrick from "./HighJumpBlock.js";
import Game from "../../Game.js";

class BricksController extends LinkedList{
    /**
     * @param {Game} game*/
    constructor(game) {
        super(
            new Brick(game.xWidth/2,BigInt(game.yHeight/4)),
            new MovingBrick(game.xWidth/3,BigInt(game.yHeight/3),game.xWidth,2500,MovingBrick.DIRECTION_RIGHT),
        );
        this.game=game;
        this.reSpam();
    }
    update(timeSwamp,workingTime){
        for(let i of this.iterator())
            i.update(timeSwamp,workingTime);
    }
    reSpam(){
        this.spamRandomBricks();
        this.removeBottomItems();
    }
    /**@private*/
    removeBottomItems(){
        for(let it=this.iterator(),item,q;!(item = it.next(q)).done;){
            if(item.value.y <= this.game.yOffset)
                q = LinkedList.CALLBACK_REMOVE;
            else q = LinkedList.CALLBACK_BREAK;
        }
    }
    spamRandomBricks(){
        /**@type {BigInt}*/let y = this.at(-1).y;
        while(y < (this.game.yOffset>this.game.yOffsetTo?this.game.yOffset:this.game.yOffsetTo)+ BigInt(this.game.yHeight*2)){
            y += BigInt(~~(Utils.randomFloat(1/16,1/4) * this.game.yHeight));
            let x = Utils.randomInt(0,this.game.xWidth),
                BLOCK_TYPE = Utils.random(),
                block;
            if(BLOCK_TYPE < 1/6) block = new MovingBrick(x,y,
                this.game.xWidth,Utils.randomInt(1000,4000),
                ~~(BLOCK_TYPE*24));
            else if(BLOCK_TYPE <= 1/3) block = new OneTouchBrick(x,y);
            else if(BLOCK_TYPE <= 6/15) block = new HighJumpBrick(x,y);
            else block = new Brick(x,y);
            this.push(block);
        }
    }
}
export default BricksController;