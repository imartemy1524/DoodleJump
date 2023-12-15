import Brick from "./Brick.js";
import BricksController from "./BricksController.js";
class OneTouchBrick extends Brick{

    /**@override
     * @param {BricksController} brickController*/
    jump(brickController) {
        brickController.remove(this);
        return super.jump(brickController);
    }
    model(){
        return 'no_brick';
    }
}
export default OneTouchBrick;