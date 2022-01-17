
window.onload = function(){
    document.getElementById("source").style.display = "none";
    document.getElementById("source2").style.display = "none";
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    const image = document.getElementById('source');
    const imageTwo = document.getElementById('source2');
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
    
    const vel = 1;
    var gamestarted = false;
    var vx = vy = 0;
    var px = py = 10;
    var lp = 20;
    var qp = 95;
    var gp = 47;
    var ax=Math.floor(Math.random()*qp)
    var ay=Math.floor(Math.random()*gp);
    var pontos = 0;
    var vidas = 5;
    var trail = [];
    tail = 5;
    
    function game(){
        px += vx;
        py += vy;
        if(px <0){
            px = qp-1;
        }
        if(px>qp-1){
            px = 0;
        }
        if(py<0){
            py = gp-1;
        }
        if(py>gp-1){
            py = 0;
        }

        ctx.fillStyle="black";
        ctx.fillRect(0, 0, stage.width, stage.height);
        ctx.fillStyle = "red";
        ctx.drawImage(imageTwo,ax*lp, ay*lp, lp, lp);

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
        ctx.drawImage(image,trail[i].x*lp, trail[i].y*lp, lp-1,lp-1);
        if (trail[i].x == px && trail[i].y == py){
            vx = vy = 0;
            tail =5;
            if(vidas>0&&gamestarted==true){
                var randX = Math.floor(Math.random()*qp);
                var randY=  Math.floor(Math.random()*gp);
                px = randX;
                py = randY;
                gamestarted = false;
                vidas--;
            }
            
            }
        }
        trail.push({x:px,y:py })
        while(trail.length > tail){
            trail.shift();
        }

        
        if(ax==px && ay==py){
            tail++;
            pontos++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*gp);
        }

        ctx.font = "30px Arial";
        ctx.fillText("Pontos:", 0, 25);
        ctx.fillText(pontos, 120, 28);
        ctx.fillText("Vida:", 0, 50);
        ctx.fillText(vidas, 120, 58);
    } 
    function keyPush(event){
        switch (event.keyCode){
            case 37:
                vx = -vel;
                vy = 0;
                gamestarted = true;
                break;
            case 38:
                vx = 0;
                vy = -vel;
                gamestarted = true;
                break;
            case 39:
                vx = vel;
                vy = 0;
                gamestarted = true;
                break;
            case 40:
                vx = 0;
                vy = vel;
                gamestarted = true;
                break;
            default:
                break;
        }
    }
}