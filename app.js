MyApp = (function (){

const c1 = "#button1";
const c2 = "#button2";
const c3 = "#button3";

let app = {};
app.step = 0;

function CalculateGPA (){
	app.step = 1;
	app.render();
};

function DropDown(){
	document.getElementById("myDropdown").classList.toggle("show");
	console.log("hey");

};

function shutDropDown(){
	if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



app.removeListeners = function(){
		$('#c1').off('click',CalculateGPA);
		// $('#c2').off('click', storeValues);
		// $('#c3').off('click', storeValues);

};
	
app.attachListeners = function(){
		//if vanilla, use addEventListener, on is used in jQuery
	if(document.querySelector(c1)){
		document.querySelector(c1).addEventListener('click',CalculateGPA); 

	}

	if(document.querySelector('#gradeButton')){
		document.querySelector('#gradeButton').addEventListener('click',DropDown); 

	}

	window.addEventListener("click", shutDropDown);


	// if(document.querySelector(c2)){
	// document.querySelector(c2).addEventListener('click', storeValues);

	// }

	// if(document.querySelector(c3)){
	// document.querySelector(c3).addEventListener('click', storeValues);

	// }
		

};

//app.init (where the function execution starts)

app.init = function() {

	console.log("start");
	this.render();
};

app.render = function(){

	let html = '';
    
	   // Remove my event listerners

    this.removeListeners();
	    
	    // Dump the DOM for population
    $('div.container').html(""); //overwrites the elements with nothing

    // STEP 1 
	    // Render my pre data entry application
	    // Render 3 buttons into the DOM


	let step1 = '<button id="button1">Calculate Current GPA</button>'+
				'<button id="button2">Calculate Cumulative GPA</button>'+
				'<button id="button3">Plan For Improvement</button>';
	    
	   // populate div#step1 with the necessary HTML
	$('div#step1').html(step1);

	if(this.step === 1){
		$('div#step1').html(step1);
		let step2a = '<p>Enter the # of credits</p>'+
		'<input type="number" name="creditsRec" min="1" max="4">';
		$('div#step1').append(step2a);

		//for the drop-down menu
		let step2b = '<div class="dropdown">'+
  					  '<button id= "gradeButton" class="dropbtn">Choose Grade</button>'+
  					  '<div id="myDropdown" class="dropdown-content">'+
    						'<a href="#">A</a>'+
    						'<a href="#">B</a>'+
    						'<a href="#">C</a>'+
    						'<a href="#">D</a>'+
    			
    						'<a href="#">F</a>'+
  						'</div></div>';
  		$('div#step1').append(step2b);

  	
		let submit = '<button id= "submit">Calculate!</button>';
		$('div#step1').append(submit);
  		
	}

	


	this.attachListeners();

};

return app;

})();




