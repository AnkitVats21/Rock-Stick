//list form of each tokens
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

/**************OBJECT OF POSSIBLE GENERAL MOVES FOR EACH POINT**********************/

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
    'p62':['p51','p62','p53','p61','p63','p70','p71','p72'],
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

var points=document.querySelectorAll(".points");
let usr=false;
let usr2=false;
let id,id2;
let listHlt;

function passId(val){
    id=val;
    
    if(player1){
    let list=checkDesiredPoints(0);
    let listForShadow=playermovablebeads(1);
        makeShadow(listForShadow);//shadow giving function
        console.log(listForShadow);
        playerShadow(1);
        atrributeAdder(listForShadow);
        if(usr){
        usr=false;
        removeShadow(listForShadow);//remove shadow
        atrributeRemover(listForShadow);
        //console.log(id,"inside usr if");
        //driverFunction(id,1,listForShadow,list,beads);
        listHlt=movableBeads(id,list);//list of highlightable points 
        console.log(listHlt);
        highLight(listHlt);//highlighting movable points
        atrributeAdder2(listHlt);
        //player1=false;
        
        //playerShadow(2);//player shadow changer
        //changePlayer();            
        }
    }
    else{
        if(usr){
            usr=false;
            let list=checkDesiredPoints(0);
            let listForShadow=playermovablebeads(2);
            removeShadow(listForShadow);
            atrributeRemover(listForShadow);
        //console.log(id);
        listHlt=movableBeads(id,list);//list of highlightable points 
    highLight(listHlt);//highlighting movable points
    atrributeAdder2(listHlt);
        }
    }
}
function passId2(val){
    id2=val;
    //let listHlt=playermovablebeads(id,list);//list of highlightable points 
    if(usr2){
        usr2=false;
             let moveType=checkMoveType(id,id2);
             //console.log(moveType);//boolean return type function true for normal move false for point move
             if(moveType){
                let id3=null;
                 beadsUpdate(id,id2,id3,moveType);
                 
             }
             else{
                 let id3= playerbetween(id,id2);// search for removed bead
                 beadsUpdate(id,id2,id3,moveType);
             }
            //console.log(beads);
            beadChange();
            removeHighlight(listHlt);
            //updateScore(player);  //update the score of the player *******tbm
        }
        if(player1){
            //console.log("inside player change if");
            player1=false;
            removeplayerShadow(1);
            playerShadow(2);
            let list=checkDesiredPoints(0);
            let listForShadow=playermovablebeads(2);
            console.log(listForShadow);
            makeShadow(listForShadow);
            atrributeAdder(listForShadow);
        }
        
        else{
            //console.log("inside else")
            player1=true;
            removeplayerShadow(2);
            playerShadow(1);
            let list=checkDesiredPoints(0);
            let listForShadow=playermovablebeads(1);
            console.log(listForShadow);
            makeShadow(listForShadow);
            atrributeAdder(listForShadow);
        }
        
        
}

//****************PLAYER CHANGE FUNCTION********************** */
beadChange();
function changePlayer(player1){

    if(player1){
        let listForShadow=playermovablebeads(1);
        makeShadow(listForShadow);//shadow giving function
        playerShadow(1);
        atrributeAdder(listForShadow);
    }
}

/******************DRIVER FUNCTION**************************/
/*****************************************************************/


//function makes an array of coordinate in form of string of a desired value from the array of beads
//defined in begining
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

///player possible movable point list generator (yet ids are repeated here)
// here list is the list of 0 value cordinates
function playermovablebeads(j){
    let lst=[];
    let list=checkDesiredPoints(0);
    //console.log(list);
    let listofplayerpos=checkDesiredPoints(j);//array in form of 'pij'
        for(let i=0;i<listofplayerpos.length;i++){
            let temp=normalMoves[listofplayerpos[i]];
            for(let j=0;j<temp.length;j++){
                if(list.indexOf(temp[j])!=-1)
                lst.push(listofplayerpos[i]);
            }
            //check if there is any oppenents bead is in between that that bead and movable point
            let temp2=pointMoves[listofplayerpos[i]];
            //console.log("temp",temp);
            //temp contains all the movable point of of particular bead at that instant
            for(let k=0;k<temp2.length;k++){
                if(list.indexOf(temp2[k])!=-1){
                    if(playerbetween(list[list.indexOf(temp2[k])],temp2[k])!='')
                    lst.push(listofplayerpos[i]);
                }
            }
        }      
        //console.log(lst);
        return lst;
}

//testing


//when you will select a bead then this function will return an array of coordinates
//where particular bead can be moved
function movableBeads(id,list){
    //console.log(id,"inside movable beads");
    let temp=normalMoves[id],movelst=[];
    temp2=pointMoves[id];
    for(let k=0;k<temp.length;k++){
        if(list.indexOf(temp[k])!=-1){               //*****stil there's an issue of coordinate repitation********/
            movelst.push(temp[k]);
                }            
    }
    for(let k=0;k<temp2.length;k++){
        if(list.indexOf(temp2[k])!=-1){
            if(playerbetween(id,temp2[k])!=''){ //check if the player in betweem is opponent or same player
            movelst.push(temp2[k]);//to check this condition you need to check get the id[1]
        }
        }
    }
    //console.log(movelst);
    return movelst;
}

//**************function to check whether the move is normal or point move********************/

function checkMoveType(id1,id2){
    //console.log('inside checkmovetype');
    if(normalMoves[id1].indexOf(id2)!=-1)
    return true;
    return false;
}
/**********************************************/

//beads array update function when the opponents plays a point wala chance or the normal one haaahaaa

function beadsUpdate(id1,id2,id3,movetype){
    //console.log("inside beadsupdate",movetype,id1,id2,id3,beads);
    let vala=beads[id1[1]][id1[2]];
    //console.log(vala);
     if(movetype==true){
         //console.log("inside if of move type");
         beads[id1[1]][id1[2]]=0;
         beads[id2[1]][id2[2]]=vala;
     }
     else{
        beads[id1[1]][id1[2]]=0;
        beads[id2[1]][id2[2]]=0;
        beads[id3[1]][id3[2]]=vala;
     }
    
}

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
        element.style.setProperty("box-shadow","5px 5px 20px cyan");
}
}

function removeHighlight(hlist){
    //console.log("iside highlight function",hlist);
    for(let i=0;i<hlist.length;i++){
        let element=document.getElementById(hlist[i]);
        element.style.removeProperty("box-shadow");
}
}
function playerbetween(id1,id2){
        //console.log(beads);
        let row1=parseInt(id1[1]),row2=parseInt(id2[1]),col1=parseInt(id1[2]),col2=parseInt(id2[2]),bead=beads[parseInt(id1[1])][parseInt(id1[2])];
        let r1=row1-1,r2=row1+1,c1=col1-1,c2=col1+1,c3=col2;
        if(row2>=2&&row2<=6){
           
            if(row1!=row2){
                if(col1>col2){//left
                    if(row1>row2){
                        if(beads[row1-1][col1-1]!=bead)
                        return "p"+r1+c1;
                    }
                    if(row1<row2){
                        if(beads[row1+1][col1-1]!=bead)
                        return "p"+r2+c1;
                    }
                }
                else if(col1<col2){//right
                    if(row1>row2){
                        if(beads[row1-1][col1+1]!=bead)
                        return "p"+r1+c2;
                    }
                    if(row1<row2){
                        if(beads[row1+1][col1+1]!=bead)
                        return "p"+r2+c2;
                    }
                }
                
                }
               if(col1==col2){//same column
                //console.log("same column");
                    if(row1>row2 && beads[row1-1][col2]!=bead)
                       return "p"+r1+c3;
                    if(row1<row2 && beads[row1+1][col2]!=bead)
                        return "p"+r2+c3;
                }
        }
        else if(row1==row2){
            if(col1>col2){//left
                if(beads[row1][col1-1]!=bead)
                return "p"+row1+c1;
            }
            else{
                if(beads[row1][col1+1]!=bead)
                return 'p'+row1+c2;
            }
        }

        else{
            if(row1>2){
                if(id1=='p31'||id1=='p32',id1=='p33'){
                    if(beads[2][2]!=bead)
                    return 'p'+2+2;
                }
            }
            if(row1<6){
                if(id1=='p51'||id1=='p52',id1=='p53'){
                    if(beads[6][2]!=bead)
                    return 'p'+6+2;
                }
            }
            if(id1=="p22"){
               if(id2=='p00' && beads[1][0]!=bead){
                return 'p10';
               }
               if(id2=='p01' && beads[1][1]!=bead){
                return 'p11';
               }
               else{
                return 'p12';
               }
            }
            if(id1=="p62"){
                if(id2=='p80' && beads[7][0]!=bead){
                    return 'p70';
                }
                if(id2=='p81' && beads[7][1]!=bead){
                    return 'p71';
                }
                else{
                    return 'p72';
                }
             }
             if(id1=='p80'){
                 if(beads[7][0]!=bead)
                 return 'p70';
             }
             if(id1=='p81'){
                if(beads[7][1]!=bead)
                return 'p71';
             }
             if(id1=='p80'){
                if(beads[7][2]!=bead)
                return 'p72';
             }
             if(id1=='p00'){
                if(beads[1][0]!=bead)
                return true;
            }
            if(id1=='p01'){
               if(beads[1][1]!=bead)
               return 'p11';
            }
            if(id1=='p02'){
               if(beads[1][2]!=bead)
               return 'p12';
            }
            if(id1=='p10'){
                if(beads[2][2]!=bead)
                return 'p22';
            }
            if(id1=='p11'){
               if(beads[2][2]!=bead)
               return 'p22';
            }
            if(id1=='p12'){
               if(beads[2][2]!=bead)
               return 'p22';
            }
            if(id1=='p70'){
                if(beads[6][2]!=bead)
                return 'p62';
            }
            if(id1=='p71'){
               if(beads[6][2]!=bead)
               return 'p62';
            }
            if(id1=='p72'){
               if(beads[6][2]!=bead)
               return 'p62';
            }
    }
    return '';
}

/****************driving***************/

function getId(idg,id){
    usr=true;
    //console.log(id.id);
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