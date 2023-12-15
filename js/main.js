import Duddle from './game/Duddle.js'
import Drawer from './game/Drawer.js'
import Mover from './game/Mover.js'
import Game from "./Game.js";
import Utils from "./utils/Utils.js";
import $ from "./utils/jsq.js";
const isDebugging = true;
let game, sid;
Game.drawer =new Drawer();
function start(){
    Utils.seed = BigInt('0x'+Utils.MD5(sid.value));
    // const bg_styles = ['linear-gradient(#673ab769, #00bcd44f)',
    //     'linear-gradient(#ffc107, #8200d473)',
    //     'radial-gradient(transparent,#2af3e742)',
    //     '#d2d1ff'
    // ];
    //$(".game-container").style[('background')]=(bg_styles[Utils.randomInt(0,bg_styles.length)]);
    game = new Game($("#drawer"));
    game.startGame();
    if(Utils.isMobile()){
        let btns = $(".move-buttons");
        Utils.fadeIn(btns);
        for(let i=0,ch;i<2;i++){
            let ev = new Event('e');
            ev['key']=i?'ArrowRight':'ArrowLeft';
            (ch=btns.children[i]).ontouchstart=window.onkeydown.bind(window,ev);
            ch.ontouchend=window.onkeyup.bind(window,ev);
        }
    }
    if(isDebugging) window['game'] = game;
}
document.addEventListener("DOMContentLoaded",()=>{
    sid=$('#sid');
    Game.drawer.loadImages().then(()=>{
        $("#start-btn").addEventListener('click',function(){
            document.querySelectorAll("#start-btn,#end-game").forEach(e=>e.style['display']='none');
            Utils.fadeIn($("#pause-btn")).then(
                ()=>$("#start-btn").innerHTML='Restart'
            );
            start();
        });
    });


    sid.value = (Utils.MD5(Utils.seed+''));
});
