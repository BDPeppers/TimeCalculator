/*AM and PM buttons*/
function select(id){
    document.getElementById(id).style.backgroundColor='seagreen';
    //start buttons
    if(id.startsWith('s')){
        if(id==='sam'){document.getElementById('spm').style.backgroundColor='darkblue';}
        if(id==='spm'){document.getElementById('sam').style.backgroundColor='darkblue';}
    }
    //end buttons
    if(id.startsWith('e')){
        if(id==='eam'){document.getElementById('epm').style.backgroundColor='darkblue';}
        if(id==='epm'){document.getElementById('eam').style.backgroundColor='darkblue';}
    }
    
}

/*getting input*/
//input variables
function time(min, hour, ampm){
    this.min=min; this.hour=hour; this.ampm=ampm;
}
var start = new time(0,0,"");
var end = new time(0,0,"");
var duration = new time(0,0,"");
var result = document.getElementById('Duration');
//getting am/pm
function amOrpm(id){
    if(id.startsWith('s')){
        start.ampm=id.substring(1,3);
    }
    if(id.startsWith('e')){
        end.ampm=id.substring(1,3);
    }
}

/*the calculating functions*/
//convert to military time
function milConversion(time){
   if(time.hour===12 && time.ampm==='am'){
            time.hour=0;
        }else if(time.ampm==='pm' && time.hour < 12){
            time.hour += 12;
        } 
}
//time span calculation
function timeCalc(start,end,duration){
    milConversion(start);
    milConversion(end);
    if(start.ampm==='am'&&end.ampm==='pm'){
        duration.hour = end.hour - start.hour;
        if(end.min-start.min<0){
            duration.min = Math.abs(end.min-start.min);
            duration.hour-=1;
        }else{
            duration.hour = end.hour-start.hour;
            duration.min = end.min-start.min;
        }
    }
    if(start.ampm===end.ampm){
        duration.hour = end.hour-start.hour;
        if(start.min>end.min){
            duration.min=(60-start.min)+end.min;
            duration.hour -=1;
        }else{
            duration.min = end.min-start.min;
        }
    }
    if(start.ampm==='pm'&&end.ampm==="am"){
        duration.hour = (24-start.hour)+end.hour;
        if(end.min-start.min<0){
            duration.min=Math.abs(end.min-start.min);
            duration.hour-=1;
        }else{
            duration.min = end.min-start.min;
        }
    }
    return duration;
}
/*Error Check*/
function hourCheck(sh,eh){
    var allgood = false;
    if((sh>12||eh>12)||(sh<1||eh<1)){
        return allgood=false;
    }else{
        return allgood=true;
    }
}
function minCheck(sm,em){
    var allgood = false;
    if((sm>60||em>60)||(sm<0||em<0)){
        return allgood=false;
    }else{
        return allgood=true;
    }
}
/*Displaying the results*/
function calc(){
    /*You'll have to pass the inputs when the buttons are pressed, not when the dom loads because
    eveything is empty  */
    var sm = document.getElementById('startMin').value;
    var sh = document.getElementById('startHour').value;
    var em = document.getElementById('endMin').value;
    var eh = document.getElementById('endHour').value;
    start.min = parseInt(sm,10);
    start.hour = parseInt(sh,10);
    end.min = parseInt(em,10);
    end.hour = parseInt(eh,10);
    console.log(start.hour); console.log(end.hour);
    if(!sm||!sh||!em||!eh){
        result.innerText = 'Please fill all fileds';
    }else if(!start.ampm||!end.ampm){
        alert("Please select A.M. or P.M.");     
    }else if((start.hour>12||end.hour>12)||(start.hour<1||end.hour<1)){
        result.innerText = 'Invalid Input!';     
    }else if((start.min>60||end.min>60)||(start.min<0||end.min<0)){
        result.innerText = "Invalid Input!"  
    }else{
        duration = timeCalc(start,end,duration);
        console.log(duration.min);
        console.log(duration.hour);
        result.innerText = duration.hour +" hours and " + duration.min + " minutes"; 
    }
}