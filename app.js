MyApp = (function (){

const c1 = "#button1";
const c2 = "#button2";
const c3 = "#button3";

let app = {}; //app object
app.step = -1;

function planForImprovementCalculation(){
	var currCredits = parseInt(app.previousCredits);
	var currGPA = parseFloat(app.previousGPA);
	var rg = parseFloat($('#reqGPA').val());
	var rc = parseInt($('#reqCredits').val());
	
	var total_score = 0;
	var total_number_of_credits = 0;
	var counter;
	for (var i = 0; i < app.num_classes_curr_sem; i++) {
		
		var class_score = 0;

	    if(app.cumGPAclassArr[i].G==='A'||app.cumGPAclassArr[i].G==='a')
	    {
	      counter=4;
	    }
	    if(app.cumGPAclassArr[i].G==='B'||app.cumGPAclassArr[i].G==='b')
	    {
	      counter=3;
	    }
	    if(app.cumGPAclassArr[i].G==='C'||app.cumGPAclassArr[i].G==='c')
	    {
	      counter=2;
	    }
	    if(app.cumGPAclassArr[i].G==='D'||app.cumGPAclassArr[i].G==='d')
	    {
	      counter=1;
	    }
	    if(app.cumGPAclassArr[i].G==='F'||app.cumGPAclassArr[i].G==='f')
	    {
	      counter=0;
	    }

	    class_score = counter*(app.cumGPAclassArr[i].C);
	    total_score = total_score+class_score;
	    total_number_of_credits = total_number_of_credits + app.cumGPAclassArr[i].C;

	}
	
	app.possGPA = ((currGPA * currCredits) + (4.0 * rc) + total_score)/(total_number_of_credits+rc+currCredits);
	console.log(app.possGPA);
	if(app.possGPA >= rg){
		//calculate the minimum GPA
		var tempTotalCredits = total_number_of_credits + rc;
		app.new_cumulative_gpa = ((currCredits*currGPA)+total_score)/(currCredits+total_number_of_credits);
		app.tempGPA = ((rg * tempTotalCredits) - (app.new_cumulative_gpa * total_number_of_credits))/rc;
		app.tempGPA = Math.trunc(app.tempGPA * Math.pow(10, 2))/ Math.pow(10, 2);
		//display tempGPA
		app.step = 7;
		app.render();
	}
	else {
		app.step = 8;
		app.render();
	}

}
function planForImprovement(){
	app.step = 6;
	app.render();
}
//calculating the cumulative GPA
function calculate_cumulative_GPA(){
	app.cumGPAclassArr = [];
	
	for (var i = 0; i < app.num_classes_curr_sem; i++) {
		var obj = {};
		var credits = $("#credits_curr"+i).val();
		var grade = $("#grade_curr"+i).val();
		obj.C = parseInt(credits); //converting string to a number
		obj.G = grade;
		app.cumGPAclassArr.push(obj);
	}
	var total_score = 0;
	var total_number_of_credits = 0;
	var counter;
	for (var i = 0; i < app.num_classes_curr_sem; i++) {
		
		var class_score = 0;

	    if(app.cumGPAclassArr[i].G==='A'||app.cumGPAclassArr[i].G==='a')
	    {
	      counter=4;
	    }
	    if(app.cumGPAclassArr[i].G==='B'||app.cumGPAclassArr[i].G==='b')
	    {
	      counter=3;
	    }
	    if(app.cumGPAclassArr[i].G==='C'||app.cumGPAclassArr[i].G==='c')
	    {
	      counter=2;
	    }
	    if(app.cumGPAclassArr[i].G==='D'||app.cumGPAclassArr[i].G==='d')
	    {
	      counter=1;
	    }
	    if(app.cumGPAclassArr[i].G==='F'||app.cumGPAclassArr[i].G==='f')
	    {
	      counter=0;
	    }

	    class_score = counter*(app.cumGPAclassArr[i].C);
	    total_score = total_score+class_score;
	    total_number_of_credits = total_number_of_credits + app.cumGPAclassArr[i].C;
	}
	
	app.previousCredits = $('#prev_credits').val(); 
	app.previousGPA = $('#prev_GPA').val(); 

	var creditsInt = parseInt(app.previousCredits);
	var gpaInt = parseFloat(app.previousGPA);
	
	app.new_cumulative_gpa = ((creditsInt*gpaInt)+total_score)/(creditsInt+total_number_of_credits);
	app.new_cumulative_gpa = Math.trunc(app.new_cumulative_gpa * Math.pow(10, 2))/ Math.pow(10, 2); //truncating the GPA
	app.step=5;
	app.render();

}
function storeNumberClassesThisSem() {
	if($('#classes_for_cum_GPA').val()!=null ){
		app.num_classes_curr_sem = $('#classes_for_cum_GPA').val();
	}
}

function display_boxes_for_cum_GPA(){

	app.step = 4;
	storeNumberClassesThisSem();
	app.render();
}
//function to calculate cumulative GPA based on the GPA before, credits before and classes in the current sem

function calculateCumulativeGPA(){
	app.step = 3;
	app.render();
}

//calculating semester GPA
function calculate_semester_GPA(){
	//array of objects to store the credits and the grade
	app.classArr = [];
	
	for (var i = 0; i < app.num_classes; i++) {
		var obj = {};
		var credits = $("#credits"+i).val();
		var grade = $("#grade"+i).val();
		obj.C = parseInt(credits); //converting string to a number
		obj.G = grade;
		app.classArr.push(obj);
	}
	var total_score = 0;
	var total_number_of_credits = 0;
	var counter;
	for (var i = 0; i < app.num_classes; i++) {
		
		var class_score = 0;

	    if(app.classArr[i].G==='A'||app.classArr[i].G==='a')
	    {
	      counter=4;
	    }
	    if(app.classArr[i].G==='B'||app.classArr[i].G==='b')
	    {
	      counter=3;
	    }
	    if(app.classArr[i].G==='C'||app.classArr[i].G==='c')
	    {
	      counter=2;
	    }
	    if(app.classArr[i].G==='D'||app.classArr[i].G==='d')
	    {
	      counter=1;
	    }
	    if(app.classArr[i].G==='F'||app.classArr[i].G==='f')
	    {
	      counter=0;
	    }

	    class_score = counter*(app.classArr[i].C);
	    total_score = total_score+class_score;
	    total_number_of_credits = total_number_of_credits + app.classArr[i].C;

	}

	app.Semester_gpa = total_score/total_number_of_credits;
	app.step=2;
	app.render();
}

function storeNumberOfClasses(){
	if($('#classes').val()!=null ){
		app.num_classes = $('#classes').val();
	}	
}

function CalculateGPA (){
	app.step=0;
	app.render();
}

function displayBoxes(){
	app.step=1;
	storeNumberOfClasses();
	app.render();

}

app.removeListeners = function(){
		$(c1).off('click',CalculateGPA);
		$('#classes_go').off('click',displayBoxes);
		$('#submitSemesterGPA').off('click',calculate_semester_GPA);
		$(c2).off('click',calculateCumulativeGPA);
		$('#classes_cumGPA_go').off('click',display_boxes_for_cum_GPA);
		$('#Calc_new_cum_GPA').off('click',calculate_cumulative_GPA);
		$(c3).off('click',planForImprovement);
		$('#classes_planImprovementCalculate').off('click',planForImprovementCalculation);

};
	
app.attachListeners = function(){
		//if vanilla, use addEventListener, on is used in jQuery
	if(document.querySelector(c1)){
		document.querySelector(c1).addEventListener('click',CalculateGPA); 

	}

	if(document.querySelector('#classes_go')){
		document.querySelector('#classes_go').addEventListener('click',displayBoxes); 

	}

	if(document.querySelector('#submitSemesterGPA')){
		document.querySelector('#submitSemesterGPA').addEventListener('click',calculate_semester_GPA); 

	}

	if(document.querySelector(c2)){
		document.querySelector(c2).addEventListener('click',calculateCumulativeGPA);
	}

	if(document.querySelector("#classes_cumGPA_go")){
		document.querySelector("#classes_cumGPA_go").addEventListener('click',display_boxes_for_cum_GPA);
	}
	if(document.querySelector("#Calc_new_cum_GPA")){
		document.querySelector("#Calc_new_cum_GPA").addEventListener('click',calculate_cumulative_GPA);
	}
	if(document.querySelector(c3)){
		document.querySelector(c3).addEventListener('click',planForImprovement);
	}
	if(document.querySelector('#classes_planImprovementCalculate')){
		document.querySelector('#classes_planImprovementCalculate').addEventListener('click',planForImprovementCalculation);
	}
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

	if(this.step === 0){
		let step = '<p>Enter the # of classes</p>'+
		'<input type="number" id= "classes" name="classes_number" min="1" max="5">';
		$('div#step1').append(step);
		let submit_classes = '<button id= "classes_go">Go!</button>';
		$('div#step1').append(submit_classes);
	}

	if(this.step === 1){
			for(var i=0;i<this.num_classes;i++){
				let step2a ="<p>Enter the # of credits and the grade</p>"+
				"<input type='number' name='creditsRec' min='1' max='4' id='credits"+i+"'>"+
				"<input type='text' name='grade' min='1' max='4' size='10' style='display:inline' id='grade"+i+"'>";
				$('div#step1').append(step2a);
				// $('div#step1').append(step2b); 
			}
  			let submit = '<button id= "submitSemesterGPA" style="display:block">Calculate!</button>';
			$('div#step1').append(submit);
  		
	}

	if(this.step === 2){

		for(var i=0;i<this.num_classes;i++){
				let step2a ="<p>Enter the # of credits and the grade</p>"+
				"<input type='number' name='creditsRec' min='1' max='4' id='credits"+i+"'>"+
				"<input type='text' name='grade' min='1' max='4' size='10' style='display:inline' id='grade"+i+"'>";
				$('div#step1').append(step2a);
				document.querySelector("#credits"+i).value = app.classArr[i].C;
				document.querySelector("#grade"+i).value = app.classArr[i].G;
		}

		let GPASemesterDisplay = "<p><b>GPA: <b></p>"+ this.Semester_gpa;
		$('div#step1').append(GPASemesterDisplay);
	}

	if(this.step === 3){
		step3 = '<p>Enter the # of classes for the current semester</p>'+
		'<input type="number" id= "classes_for_cum_GPA" name="classes_num" min="1" max="5">';
		$('div#step1').append(step3);
		let submit_classes = '<button id= "classes_cumGPA_go">Go!</button>';
		$('div#step1').append(submit_classes);
	}

	if(this.step === 4){
		for(var i=0;i<this.num_classes_curr_sem;i++){
				let step4 ="<p>Enter the # of credits and the grade</p>"+
				"<input type='number' name='creditsRec' min='1' max='4' id='credits_curr"+i+"'>"+
				"<input type='text' name='grade' min='1' max='4' size='10' style='display:inline' id='grade_curr"+i+"'>";
				$('div#step1').append(step4);
		}
		let step4a = "<p>Previous cumulative GPA and credits (before the current semester):</p>"+
					 "<p>GPA:</p>"+
					 "<input type='number' id = 'prev_GPA' name='prev_GPA'>"+
					 "<p># of credits</p>"+"<input type='number' id = 'prev_credits' name='prev_credits'>";
		$('div#step1').append(step4a);
		let submit_cum_GPA = '<button id= "Calc_new_cum_GPA">Calculate New Cumulative GPA</button>';
		$('div#step1').append(submit_cum_GPA);
	}

	if(app.step === 5){
		for(var i=0;i<this.num_classes_curr_sem;i++){
				let step4 ="<p>Enter the # of credits and the grade</p>"+
				"<input type='number' name='creditsRec' min='1' max='4' id='credits_curr"+i+"'>"+
				"<input type='text' name='grade' min='1' max='4' size='10' style='display:inline' id='grade_curr"+i+"'>";
				$('div#step1').append(step4);
				document.querySelector("#credits_curr"+i).value = app.cumGPAclassArr[i].C;
				document.querySelector("#grade_curr"+i).value = app.cumGPAclassArr[i].G;
		}
		let step4b = "<p>Previous cumulative GPA and credits (before the current semester):</p>"+
					 "<p>GPA:</p>"+
					 "<input type='number' id = 'prev_GPA' name='prev_GPA'>"+
					 "<p># of credits</p>"+"<input type='number' id = 'prev_credits' name='prev_credits'>";
		$('div#step1').append(step4b);
		document.querySelector('#prev_credits').value = app.previousCredits;
		document.querySelector('#prev_GPA').value = app.previousGPA;
		let GPACumulativeDisplay = "<p><b>New Cumulative GPA: <b></p>"+ this.new_cumulative_gpa;
		$('div#step1').append(GPACumulativeDisplay);

	}
	
	if(app.step === 6){
		
		let step6 = "<p>Required GPA and the number of credits that will be taken:</p>"+
					 "<p>GPA:</p>"+
					 "<input type='number' id = 'reqGPA' name='reqGPA'>"+
					 "<p># of credits</p>"+"<input type='number' id = 'reqCredits' name='reqCredits'>";
		$('div#step1').append(step6);
		let submit_classes = '<button id= "classes_planImprovementCalculate">Plan</button>';
		$('div#step1').append(submit_classes);
	}
	if(app.step === 7){
		let message1 = '<p>Congratulations! It is possible to obtain the required CGPA at the completion of the number of credits required</p>';
		$('div#step1').append(message1);
		let message2 = "<p>Minimum GPA that you will have to maintain, for the credits you'll be taking, to obtain the required Cumulative GPA: "+app.tempGPA;
		$('div#step1').append(message2);
	}

	if(app.step === 8){
		let message1 = '<p>Sorry, based on the data provided it is not possible.</p>';
		$('div#step1').append(message1);
	}
	this.attachListeners();

};

return app;

})();




