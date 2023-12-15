import Game from "../Game.js"
class Mover{
    constructor(){
        this.startTime = Date.now();
        this.lastTime = this.startTime;
    }
    start(game){
        requestAnimationFrame(this.update=this.update.bind(this,game));
        window.onkeydown=this.onKeyClick.bind(game,true);
        window.onkeyup=this.onKeyClick.bind(game,false);
    }
    /**@this {Game}
     * @param {boolean} isDown
     * @param  e*/
    onKeyClick(isDown,e){
        switch (e.key) {
            case "ArrowRight":
                this.duddle.moveRight(isDown);
                break;
            case "ArrowLeft":
                this.duddle.moveLeft(isDown);
                break;
        }
    }
    update(game){
        const timeSwamp = -this.lastTime+(this.lastTime = Date.now()),
            workingTime = this.lastTime - this.startTime;
        game.duddle.update(timeSwamp,workingTime);
        game.bricksController.update(timeSwamp,workingTime);
        game.update(timeSwamp);
        Game.drawer.redraw(game);
        if(game._isGameOver && workingTime - game.gameOverStart>2000) Game.gameOver();
        else requestAnimationFrame(this.update);
    }
}
export default Mover;