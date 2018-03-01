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

app.removeListeners = function(){
		$('#c1').off('click',CalculateGPA);
		// $('#c2').off('click', storeValues);
		// $('#c3').off('click', storeValues);

}
	
app.attachListeners = function(){
		//if vanilla, use addEventListener, on is used in jQuery
	if(document.querySelector(c1)){
		document.querySelector(c1).addEventListener('click',CalculateGPA); 

	}

	// if(document.querySelector(c2)){
	// document.querySelector(c2).addEventListener('click', storeValues);

	// }

	// if(document.querySelector(c3)){
	// document.querySelector(c3).addEventListener('click', storeValues);

	// }
		

}

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
		let step2 = '<p>Enter the # of credits</p>'+
		'<input type="number" name="creditsRec" min="1" max="4">';
		$('div#step1').append(step2);
	}
	this.attachListeners();

};

return app;

})();




