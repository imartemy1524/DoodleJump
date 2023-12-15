import Brick from "./Brick.js";

class HighJumpBrick extends Brick{
    model(){
        return 'jump_brick'
    }
    height() {
        return 30;
    }
}
export default HighJumpBrick;