/**************************************************************
no flaw in the function below, parameters decide their results, except #

    beadsUpdate()           update the beads value {0 or 1 or 2}
    beadChange()            changes the color from the beads 2D array 
                                0 -no color
                                1 -green
                                2 -red
    playerShadow()          makes a shadows of the player in the dashboard
    removeplayerShadow()    removes a shadows of the player in the dashboard
    makeShadow()            highlights the players movable beads
    removeShadow()          removes highlights players movable beads
    highLight()             highlights the movable points when user clicks on the beads
    removHighlight()        removes highlight from the above points
    getId()/getId2()        return the id and simultaneously calls the respective passId() functions 
                            that drives the programs
    atrributeAdder1()&2()   adds onclick atrribute to beads passed in them using parameter
    atrributeRemover()      removes the onclick atrribute from respective beads
    checkMoveType()         return true if normal moves else false
    passId() & passId2()    these functions drives the whole program
    movablePoints()         returns an array of moves on clicking a bead when a players chance comes
    playermovableBeads()    returns an array of movable beads of a player
   #playerbetween()         checks whether a bead in between is two beads is opponents bead or same
                            bead returns coordinate if opponents bead in between else returns an empty string
   $gameover()
   $doublekill()
             #bugs    $yet to make
***************************************************************/

/******************2D ARRAY OF BEADS*************************/
var beads=[
              [1,1,1],
              [1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [0,0,0,0,0],
            [2,2,2,2,2],
            [2,2,2,2,2],
              [2,2,2],
              [2,2,2]
];

var player1=true;

/**************DICTIONARY OF POSSIBLE GENERAL MOVES FOR EACH POINT**********************/

var normalMoves={
    'p00':['p01','p10'],
    'p01':['p00','p02','p11'],
    'p02':['p01','p12'],
    'p10':['p00','p11','p22'],
    'p11':['p01','p10','p12','p22'],
    'p12':['p02','p11','p22'],
    'p20':['p21','p30','p31'],
    'p21':['p20','p22','p31'],
    'p22':['p10','p11','p12','p21','p23','p31','p32','p33'],
    'p23':['p22','p24','p33'],
    'p24':['p23','p33','p34'],
    'p30':['p20','p31','p40'],
    'p31':['p20','p21','p22','p30','p32','p40','p41','p42'],
    'p32':['p22','p31','p33','p42'],
    'p33':['p22','p23','p24','p32','p34','p42','p43','p44'],
    'p34':['p24','p33','p44'],
    'p40':['p30','p31','p41','p50','p51'],
    'p41':['p31','p40','p42','p51'],
    'p42':['p31','p32','p33','p41','p43','p51','p52','p53'],
    'p43':['p33','p42','p44','p53'],
    'p44':['p33','p34','p43','p53','p54'],
    'p50':['p40','p51','p60'],
    'p51':['p40','p41','p42','p50','p52','p60','p61','p62'],
    'p52':['p42','p52','p53','p62'],
    'p53':['p42','p43','p44','p52','p54','p62','p63','p64'],
    'p54':['p44','p53','p64'],
    'p60':['p50','p51','p61'],
    'p61':['p51','p60','p62'],
    'p62':['p51','p52','p53','p61','p63','p70','p71','p72'],
    'p63':['p53','p62','p64'],
    'p64':['p53','p54','p63'],
    'p70':['p62','p71','p80'],
    'p71':['p62','p70','p72','p81'],
    'p72':['p62','p71','p82'],
    'p80':['p70','p81'],
    'p81':['p71','p80','p82'],
    'p82':['p72','p81']
};

/************DICTIONARY OF POSSIBLE MOVES TO CUT THE BEADS OF ANOTHER PLAYER****************/

var pointMoves={
    'p00':['p02','p22'],
    'p01':['p22'],
    'p02':['p00','p22'],
    'p10':['p12','p33'],
    'p11':['p32'],
    'p12':['p10','p31'],
    'p20':['p22','p40','p42'],
    'p21':['p23','p41'],
    'p22':['p00','p01','p02','p20','p24','p40','p42','p44'],
    'p23':['p21','p43'],
    'p24':['p22','p42','p44'],
    'p30':['p32','p50'],
    'p31':['p12', 'p30', 'p51','p53'],
    'p32':['p11','p30','p34','p52'],
    'p33':['p10','p31','p51','p53'],
    'p34':['p32','p54'],
    'p40':['p20','p22','p42','p62','p60'],
    'p41':['p21','p43','p61'],
    'p42':['p20','p22','p24','p40','p44','p60','p62','p64'],
    'p43':['p23','p41','p63'],
    'p44':['p24','p22','p42','p62','p64'],
    'p50':['p30','p52'],
    'p51':['p31','p53','p72','p33'],
    'p52':['p32','p50','p54','p71'],
    'p53':['p31','p33','p51','p70'],
    'p54':['p34','p52'],
    'p60':['p40','p42','p62'],
    'p61':['p41','p63'],
    'p62':['p40','p42','p44','p60','p64','p80','p81','p82'],
    'p63':['p43','p61'],
    'p64':['p42','p44','p62'],
    'p70':['p53','p72'],
    'p71':['p52'],
    'p72':['p51','p70'],
    'p80':['p60','p82'],
    'p81':['p62'],
    'p82':['p62','p80']
};

let usr=false;
let usr2=false;
let id,id2;
let listHlt;

/*******************WHEN A USER CLICKS START BUTTON function below will run first and only one time*******/
function start(player1){

    var person1 = prompt("Please enter Player 1 Name", "Ankit");
  if (person1 != null) {
    document.getElementById("p1").innerHTML =person1;
  }

  var person2 = prompt("Please enter Player 2 Name", "Sarthak");
  if (person2 != null) {
    document.getElementById("p2").innerHTML =person2;
  }

    if(player1){
        beadChange();
        listForShadow=playermovablebeads(1);
        makeShadow(listForShadow);//shadow giving function
        playerShadow(1);
        atrributeAdder(listForShadow);
    }
}
let h,listForShadow;
/*****************BEAD SELECTED BY A USER WILL RETURN AN ID AND THAT ID IS PASSED IN THE FUNCTION BELOW******/
function passId(val){
    id=val;
    
    if(player1){
        //listForShadow=playermovablebeads(1);
        if(usr){
         if(h!=null){
             removeHighlight(h);
             atrributeRemover(h);
             h=null;
             h=movablePoints(id);
             highLight(h);
             atrributeAdder2(h);
         }
         else{
             h=movablePoints(id);
             highLight(h);
             atrributeAdder2(h);
         }
        usr=false;      
        }
    }
    else{
        if(usr){
            if(h!=null){
                removeHighlight(h);
                atrributeRemover(h);
                h=null;
                h=movablePoints(id);
                highLight(h);
                atrributeAdder2(h);
            }
            else{
                h=movablePoints(id);
                highLight(h);
                atrributeAdder2(h);
            }


            usr=false;
        }
    }
}

/*****************ON CLICKING THE HIGHLIGHTED POINT'S ITS ID WILL PASSED IN THE FUNCTION BELOW********/

function passId2(val){
    id2=val;
    let score;
    //let listHlt=playermovablebeads(id,list);//list of highlightable points 
    if(usr2){
        if(checkDoublePoint().length!=0 && checkMoveType(id,id2)!=true){
            removeHighlight(checkDoublePoint());
            atrributeRemover(checkDoublePoint());
            let moveType=checkMoveType(id,id2);
            let id3= playerbetween(id,id2);// search for removed bead
                 //beadsUpdate(id,id2,id3,moveType);
                 score=beadsUpdate(id,id2,id3,moveType);
                 Score(score);
        }
        else{
        removeHighlight(movablePoints(id));
        removeShadow(listForShadow);
        atrributeRemover(h);
        usr2=false;
             let moveType=checkMoveType(id,id2); //boolean return type function true for normal move false for point move
             if(moveType){
                let id3=null;
                 beadsUpdate(id,id2,id3,moveType);
             }
             else{
                 let id3= playerbetween(id,id2);// search for removed bead
                 //beadsUpdate(id,id2,id3,moveType);
                 score=beadsUpdate(id,id2,id3,moveType);
                 Score(score);
                 
                 //console.log(score);
             }
        }
            beadChange();
            //removeHighlight(listHlt);
            //updateScore(player);  //update the score of the player *******tbm
        }
        if(player1){
            if(checkDoublePoint().length!=0 && checkMoveType(id,id2)!=true){
                id=id2;
                highLight(checkDoublePoint());
                atrributeAdder2(checkDoublePoint());
            }
            else{
            removeplayerShadow(1);
            playerShadow(2);
            //let list=checkDesiredPoints(0);
            listForShadow=playermovablebeads(2);
            makeShadow(listForShadow);
            atrributeAdder(listForShadow);
            player1=false;
            }
        }
        
        else{
            if(checkDoublePoint().length!=0 && checkMoveType(id,id2)!=true){
                id=id2;
                atrributeAdder2(checkDoublePoint());
                highLight(checkDoublePoint());
            }
            else{
            player1=true;
            removeplayerShadow(2);
            playerShadow(1);
            //let list=checkDesiredPoints(0);
            listForShadow=playermovablebeads(1);
            makeShadow(listForShadow);
            atrributeAdder(listForShadow);
            }
        }
        
        
}
var a=0,b=0;
function Score(s){
    if(s==1){
      updateScore(a+=1,2)
    }
    
    if(s==2)
    updateScore(b+=1,1)
}

function updateScore(s,p){
    if(p==1)
    document.getElementById("points1").innerHTML=s;
    else
    document.getElementById("points2").innerHTML=s;
}

//function makes an array of coordinate in form of string of a desired value from the array of beads
function checkDesiredPoints(p){
    let lst=[];
    for(let i=0;i<9;i++){
        for(let j=0;j<beads[i].length;j++){
            if(beads[i][j]==p)
            lst.push('p'+i+j);
        }
    }
    return lst;
}

/**********player possible movable point list generator (yet ids are repeated here) SOME FLAWS ARE THERE IN THE FUNCTION BELOW*/
function playermovablebeads(j){
    let lst=[];
    let list=checkDesiredPoints(0);
    //console.log(beads);
    let listofplayerpos=checkDesiredPoints(j);//array in form of 'pij'
    //console.log(listofplayerpos);
        for(let i=0;i<listofplayerpos.length;i++){
            let temp=normalMoves[listofplayerpos[i]];
            for(let j=0;j<temp.length;j++){
                if(list.indexOf(temp[j])!=-1){
                lst.push(listofplayerpos[i]);
                
                }
            }
            
            //check if there is any oppenents bead is in between that that bead and movable point

            let temp2=pointMoves[listofplayerpos[i]];
            for(let k=0;k<temp2.length;k++){
                if(list.indexOf(temp2[k])!=-1){
                    //console.log(temp2[k],playerbetween(listofplayerpos[i],temp2[k]));
                    if(playerbetween(listofplayerpos[i],temp2[k])!=''){
                        //console.log("not coming into this",temp2[k],i,k);
                    lst.push(listofplayerpos[i]);
                    }
                }
            }
        }      
        return lst;
}


/********
when you will select a bead then this function will return an array of coordinates
where particular bead can be moved *******/
function movablePoints(id){
    let list=checkDesiredPoints(0);
    let temp=normalMoves[id],movelst=[];
    let temp2=pointMoves[id];
    for(let k=0;k<temp.length;k++){
        if(list.indexOf(temp[k])!=-1){               
            movelst.push(temp[k]);
                }            
    }
    for(let k=0;k<temp2.length;k++){
        if(list.indexOf(temp2[k])!=-1){
            if(playerbetween(id,temp2[k])!=''){ //check if the player in betweem is opponent or same player
            movelst.push(temp2[k]);//to check this condition you need to check get the id1
        }
        }
    }
    return movelst;
}

//**************function to check whether the move is normal or point move********************/

function checkMoveType(id1,id2){
    //console.log('inside checkmovetype');
    if(normalMoves[id1].indexOf(id2)!=-1)
    return true;
    return false;
}

function beadsUpdate(id1,id2,id3,movetype){
    let vala=beads[id1[1]][id1[2]];
     if(movetype==true){
         beads[id1[1]][id1[2]]=0;
         beads[id2[1]][id2[2]]=vala;
     }
     else{
        let valb=beads[id3[1]][id3[2]];
        beads[id1[1]][id1[2]]=0;
        beads[id3[1]][id3[2]]=0;
        beads[id2[1]][id2[2]]=vala;
        return valb;
     }
}


/********************************************/
//beads color updating function

function beadChange(){
    //console.log(beads);
    for(let i=0;i<=8;i++){
        for(let j=0;j<beads[i].length;j++){
            let id='p'+i+j;
            let element=document.getElementById(id);
            if(beads[i][j]==1){
                element.style.setProperty("background",'radial-gradient(circle at 5px 5px, rgb(78, 255, 8), #000)');
            }
            if(beads[i][j]==2){
                element.style.setProperty("background",'radial-gradient(circle at 5px 5px, rgb(255, 86, 8), #000)');
            }
            if(beads[i][j]==0){
                element.style.removeProperty("background");
                element.style.setProperty('box-shadow','2px 2px 5px black');
            }
        }
    }
}

/*********player shadow changer*************/

function playerShadow(player){
    if(player==1){
    let element=document.getElementById("player1");
    element.style.setProperty('filter','drop-shadow(5px 5px 5px black)');
    }
    else{
    let element=document.getElementById("player2");
    element.style.setProperty('filter','drop-shadow(5px 5px 5px black)');
    }
}

/*******shadow remover***********/
function removeplayerShadow(player){
    if(player==1){
        let element=document.getElementById("player1");
        element.style.removeProperty('filter');
        }
        else{
        let element=document.getElementById("player2");
        element.style.removeProperty('filter');
        }
}
/**************shadow over a bead*********************/

function makeShadow(listForShadow){
    for(let i=0;i<listForShadow.length;i++){
        let element=document.getElementById(listForShadow[i]);
        element.style.setProperty("box-shadow","2px 1px 10px blue");
    }
}

/*************shadow remover************/

function removeShadow(points){
    for(let i=0;i<points.length;i++){
        let element=document.getElementById(points[i]);
        element.style.removeProperty("box-shadow");
    }
    //console.log("it is running properly");
}

/************Movable Point Highlighting **********/

function highLight(hlist){
    
    for(let i=0;i<hlist.length;i++){
        let element=document.getElementById(hlist[i]);
        element.style.backgroundColor="rgba(68, 118, 255, 0.788)";
        //element.style.setProperty("box-shadow","5px 5px 20px cyan");
}
}

function removeHighlight(hlist){
    for(let i=0;i<hlist.length;i++){
        let element=document.getElementById(hlist[i]);
        element.style.removeProperty("background-color");
}
}
function playerbetween(id1,id2){
        //console.log(id1,id2);
        let bead;
        if(beads[parseInt(id1[1])][parseInt(id1[2])]==1)
        bead=2;
        if(beads[parseInt(id1[1])][parseInt(id1[2])]==2)
        bead=1;
        let row1=parseInt(id1[1]),row2=parseInt(id2[1]),col1=parseInt(id1[2]),col2=parseInt(id2[2]);
        let r1=row1-1,r2=row1+1,c1=col1-1,c2=col1+1,c3=col2;
        if(row2>=2&&row2<=6){
           
            if(row1!=row2){
                if(col1>col2){//left
                    if(row1>row2 && beads[row1-1][col1-1]==bead){
                        return "p"+r1+c1;
                    }
                    if(row1<row2 && beads[row1+1][col1-1]==bead){
                        return "p"+r2+c1;
                    }
                }
                if(col1<col2){//right
                    if(row1>row2 && beads[row1-1][col1+1]==bead){//top
                        return "p"+r1+c2;
                    }
                    if(row1<row2 && beads[row1+1][col1+1]==bead){
                        return "p"+r2+c2;
                    }
                }

                if(col1==col2){//same column
                    if(row1>row2 && beads[row1-1][col2]==bead)
                       return "p"+r1+c3;
                    if(row1<row2 && beads[row1+1][col2]==bead)
                        return "p"+r2+c3;
                }
                }

            if(row1==row2){
                    if(col1>col2 && beads[row1][col1-1]==bead){//left
                        return "p"+row1+c1;
                    }
                    if(col1<col2 && beads[row1][col1+1]==bead)
                        return 'p'+row1+c2;
                }
        }


        else{

            if(row1==row2){
                if(col1>col2 && beads[row1][col1-1]==bead){//left
                    return "p"+row1+c1;
                }
                if(col1<col2 && beads[row1][col1+1]==bead)
                    return 'p'+row1+c2;
            }

            if(row2>2){
                if((id1=='p31'|| id1=='p32'|| id1=='p33') && beads[2][2]==bead){
                    return 'p22';
                }
            }
            if(row2<6){
                if((id1=='p51'||id1=='p52'|| id1=='p53') && beads[6][2]==bead){
                    return 'p62';
                }
            }
            if(id1=="p22"){
               if(id2=='p00' && beads[1][0]==bead){
                return 'p10';
               }
               if(id2=='p01' && beads[1][1]==bead){
                return 'p11';
               }
               else{
                return 'p12';
               }
            }
            if(id1=="p62"){
                if(id2=='p80' && beads[7][0]==bead){
                    return 'p70';
                }
                if(id2=='p81' && beads[7][1]==bead){
                    return 'p71';
                }
                if(id2=='p82'){
                    return 'p72';
                }
             }

             if(id1=='p80' && beads[7][0]==bead){
                 return 'p70';
             }
             if(id1=='p81' && beads[7][1]==bead){
                return 'p71';
             }
             if(id1=='p82' && beads[7][2]==bead){
                return 'p72';
             }
             if(id1=='p00' && beads[1][0]==bead){
                return 'p10';
            }
            if(id1=='p01' && beads[1][1]==bead){
               return 'p11';
            }
            if(id1=='p02' && beads[1][2]==bead){
               return 'p12';
            }
            if(id1=='p10' && beads[2][2]==bead){
                return 'p22';
            }
            if(id1=='p11' && beads[2][2]==bead){
               return 'p22';
            }
            if(id1=='p12' && beads[2][2]==bead){
               return 'p22';
            }
            if(id1=='p70' && beads[6][2]==bead){
                return 'p62';
            }
            if(id1=='p71' && beads[6][2]==bead){
               return 'p62';
            }
            if(id1=='p72' && beads[6][2]==bead){
               return 'p62';
            }
    }
    return '';
}

/****************driving***************/

function getId(idg,id){
    usr=true;
    passId(idg.id,id);
    return idg.id;
}

function getId2(idg){
    usr2=true;
    passId2(idg.id,id2);
    return idg.id;
}

function atrributeAdder(element){
    for(let i=0;i<element.length;i++){
        let hj = document.getElementById(element[i]);
        let att = document.createAttribute("onclick");
          att.value = "getId(this,id)";
          hj.setAttributeNode(att);
    }
}

function atrributeAdder2(element){
    for(let i=0;i<element.length;i++){
        let hj = document.getElementById(element[i]);
        let att = document.createAttribute("onclick");
          att.value = "getId2(this,id2)";
          hj.setAttributeNode(att);
    }
}

function atrributeRemover(element){
    for(let i=0;i<element.length;i++){
        document.getElementById(element[i]).removeAttribute("onclick");
    }
}

function checkDoublePoint(){
    let lst=movablePoints(id2),rlist=[];
    let lst2=pointMoves[id2];
    for(let i=0;i<lst.length;i++){
        if(lst2.indexOf(lst[i])!=-1){
            rlist.push(lst[i]);
        }
    }
    console.log(rlist);
    return rlist;
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');



var mouse = {
    x: undefined,
    y: undefined
}


var colorArray = [ "white"];
// window.addEventListener('');




window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

});

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = `${colorArray[Math.floor(Math.random() * colorArray.length)]}`;
            c.fill = colorArray[Math.floor(Math.random() * colorArray.length)];
            
            c.stroke();
        };
        this.update = function () {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            //interactivity

            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < 40) {
                    this.radius += 1;
                }
            }
            else if (this.radius > 2) {
                this.radius -= 1;
            }
            this.draw();
        };
    }
}


var circleArray = [];
for (let i = 0; i < 500; i++) {
    var radius = 90;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    setTimeout(1000);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
//console.log(circleArray);
c.beginPath();

c.fillText("Hey Three",250,250);
c.strokeStyle = "Red";
c.stroke();