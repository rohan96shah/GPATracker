const c1 = "#button1";
const c2 = "#button2";
const c3 = "#button3";
const c4 = "#button4";



$(document).ready(function(){

	document.querySelector(c1).onclick = function(){
		
    let mtx1_row = document.querySelector(t1).value;
    let mtx1_col =document.querySelector(t2).value;
    
    let mtx2_row =document.querySelector(t3).value;
    let mtx2_col =  document.querySelector(t4).value;
   
    if(mtx1_row )
    checkCompatibility(mtx1_row, mtx1_col, mtx2_row, mtx2_col);                    
	}
});
	
