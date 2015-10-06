App = Ember.Application.create();

//console.log(document.cookie);
//console.log(getCurrentSessionId());


var HOST = window.location.hostname + "/api";//"api.mimo-llc.com";
var API_KEY = "ZETANnf93fh394hg2oInJlY3QiQUARK";
var MEMBER_ID = -1;
App.MEMBER_ID = -1;

var moneyText = "";
//console.log(App.MEMBER_ID);


/*
function readFile(){
	var files = $('#inputFile').prop("files");
	if(files.length > 0){
		var inputFile = files[0];
	
		console.log(inputFile);

		// Parse local CSV file
		Papa.parse(inputFile, {
			worker: true,
			dynamicTyping: true,
			step: function(result) {
				console.log("Row:", result.data);
			},
			complete: function(){
				console.log("Import complete.");
			}
		});
	}
	else{
		console.log("Please select a file.");
	}
	
}
*/

function getCurrentSessionId(){
	return document.cookie.replace("PHPSESSID=", "");
}

function clearSelectedNavMenuItem(){
	$("#navMenuItemGroup").children("li").each(function(){
		$(this).removeClass("active");
	});
}

function selectTerminalNode(element){
	getView($(element)).get('controller').send('selectTerminalNode',element)
}

function userDetailReportShowNoteDetails(element){
	getView($(element)).get('controller').send('userDetailReportShowNoteDetails',element)
}

function recyclerTransactionReportShowNoteDetails(element){
	getView($(element)).get('controller').send('recyclerTransactionReportShowNoteDetails',element)
}

function userTransactionReportShowNoteDetails(element){
	getView($(element)).get('controller').send('userTransactionReportShowNoteDetails',element)
}

function forcedNoteReportShowNoteDetails(element){
	getView($(element)).get('controller').send('forcedNoteReportShowNoteDetails',element)
}

function MIMOBalanceReportShowNoteDetails(element){
	getView($(element)).get('controller').send('MIMOBalanceReportShowNoteDetails',element)
}

function getView($el){
	return Ember.View.views[$el.closest(".ember-view").attr("id")];
}

function goToEditMember(element, memberId){
	//getView($(element)).get('controller').send('selectTerminalNode',element)
	getView($(element)).get('controller').transitionToRoute("memberedit", {
		queryParams: {
			memberId: memberId
		}
	});
	//console.log("Selected Member: " + memberId);
}


function renderPieChart(){
	$(function() {
        $('.chart').easyPieChart({
            //your options goes here
        });
    });
}

function logout(){
	$.post("https://" + HOST + "/?controller=MemberController&action=logout&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
		console.log("Performed logout!");
		window.location = "#/login";
	});
}

function getSessionStatus(status){
	return ( (status) ? "CLOSED" : "OPEN" );
}

function sortNotesByValue(notes){
	var sortedNotes = [];
	notes.forEach(function(note){
		sortedNotes[ note.value  + "|" + note.exponentValue ] = note;
	});
	return sortedNotes;

	/*
	var sortedNotes = new Object();


	notes.forEach(function(note){
		console.log(note);
		sortedNotes[note.value + "|" + note.exponentValue] = note;
	});

	return sortedNotes;
	*/


	/*
	var noteDataSets = result.NOTES_EFFECTED.split("|");
	var notes = [];
	noteDataSets.forEach(function(noteDataSet){
		var noteDataSetParts = noteDataSet.split(":");
		var note = new Object();
		note.value = noteDataSetParts[0].trim();
		note.exponentValue = noteDataSetParts[1].trim();
		note.count = noteDataSetParts[2].trim();
		notes[note.value + "|" + note.exponentValue] = note;
	});*/
}

function getTransactionStatusDescription(status){
	var value = status;
	var description = "";

	if(value > 9 || value < 1){
		description = "Not Updated";
	}
	else{
		if(value >= 8){
			value = (value - 8);
			description = "Forced";
		}

		if(value >= 4){
			value = (value - 4);
			if(description != ""){
				description += ", Updated and has some unknown";
			}
			else{
				description = "Updated and has some unknown";
			}
		}


		if(value >= 2){
			value = (value - 2);

			if(description != ""){
				description += ", Manual";
			}
			else{
				description = "Manual	";
			}
		}


		if(value >= 1){
			value = (value - 1);

			if(description != ""){
				description += ", Normal";
			}
			else{
				description += "Normal";
			}
		}

	}
	return description;
}

function getFunctionLevelDescription(functionLevel){
	if(functionLevel == 1){
		return "Recycler";
	}
	return "User";
}

function toHumanReadableBoolean(value){
	if(value){
		return "YES";
	}
	return "NO";
}


function getUserLevelDescription(userLevel){
	if(userLevel == 0){
		return "Cashier";
	}
	return "Manager";
}

function getRecyclerTypeDescription(recyclerType){
	switch(recyclerType){
		case 1:
			return "Bill";
			break;
		case 2:
			return "Coin";
			break;
		case 3:
			return "Misc";
			break;
		case 4:
			return "Mix";
			break;
		default:
			return "";
			break;
	}
}


function getTransactionTypeDescription(transactionType){
	switch(transactionType){
		case 1:
			return "Cash Setting";
			break;
		case 2:
			return "Clear Reject";
			break;
		case 3:
			return "Dispense";
			break;
		case 4:
			return "Deposit";
			break;
		case 5:
			return "Update Reject";
			break;
		case 6:
			return "Deposit Bag";
			break;
		case 7:
			return "Dispense Bag";
			break;
		case 8:
			return "Make Change Note To Note";
			break;
		case 9:
			return "Clear Force";
			break;
		case 10:
			return "Adjust Totals";
			break;
		case 11:
			return "Adjust Trans";
			break;
		case 12:
			return "Clear Multi Denom";
			break;
		case 13:
			return "Cassette Change";
			break;
		case 14:
			return "Clear Coin Totals";
			break;
		case 15:
			return "Armored Full Service";
			break;
		case 16:
			return "Armored Dispense";
			break;
		case 17:
			return "Armored Exchange";
			break;
		case 18:
			return "Armored Clean Out";
			break;
		case 19:
			return "Pay Bill";
			break;
		case 20:
			return "Chained Deposit Dispense";
			break;
		case 21:
			return "Chained Dispense Deposit";
			break;
		case 22:
			return "Chained Dispense Dispense";
			break;
		case 23:
			return "Chained Deposit Deposit";
			break;
		case 24:
			return "Coin Buy";
			break;
		case 25:
			return "Make Change Note To Coin";
			break;
		case 26:
			return "Make Change Note to Note Coin";
			break;
		case 27:
			return "Make Change Note Coin To Note Coin";
			break;
		case 28:
			return "Make Change Coin to Coin";
			break;
		default:
			return "";
			break;
	}
}

function getMeterColorByPercent(value){
	//var barColor = "#31B0D5";	//light blue

	if(value == 100){
		return "#31B0D5" //light blue
	}
	else if(value < 100 && value >= 75){
		return "#449D44"; //dark blue
	}
	else if(value >= 50 && value < 75){
		return "#286090";	//green
	}
	else if(value >= 25 && value < 50){
		return "#EC971F";	//orange
	}
	else{
		return "#C9302C";
	}
}

function getDepositOptionDescription(depositOption){
	if(isNaN(depositOption)){
		return depositOption;
	}

	var value = depositOption;
	var description = "";

	if(value > 255 || value < 1){
		description = "";
	}
	else{
		if(value >= 128){
			value = (value - 128);
			description = "Pay Bill";
		}

		if(value >= 64){
			value = (value - 64);

			if(description != ""){
				description += ", Link To Coin";
			}
			else{
				description = "Link To Coin";
			}
		}

		if(value >= 32){
			value = (value - 32);

			if(description != ""){
				description += ", Final Deposit";
			}
			else{
				description = "Final Deposit";
			}
		}


		if(value >= 16){
			value = (value - 16);

			if(description != ""){
				description += ", Misc Media";
			}
			else{
				description = "Misc Media";
			}
		}


		if(value >= 8){
			value = (value - 8);

			if(description != ""){
				description += ", Deposit Bag";
			}
			else{
				description = "Deposit Bag";
			}
		}


		if(value >= 4){
			value = (value - 4);

			if(description != ""){
				description += ", Force Note";
			}
			else{
				description = "Force Note";
			}
		}

		if(value >= 2){
			value = (value - 2);

			if(description != ""){
				description += ", Deposit Note";
			}
			else{
				description = "Deposit Note";
			}
		}


		if(value >= 1){
			value = (value - 1);

			if(description != ""){
				description += ", Count Notes";
			}
			else{
				description = "Count Notes";
			}
		}
	}
	return description;
}

function getReportName(reportId){

	switch(reportId){
		case 1:
			return "Grand Totals Now";
			break;
		case 16:
			return "Grand Totals By Date";
			break;
		case 2:
			return "User Detail";
			break;
		case 3:
			return "User Summary";
			break;
		case 4:
			return "Register Detail";
			break;	
		case 5:
			return "Register Summary";
			break;
		case 6:
			return "Terminal Detail";
			break;
		case 7:
			return "Terminal Summary";
			break;
		case 8:
			return "Transaction Log";
			break;
		case 9:
			return "Open Till";
			break;
		case 10:
			return "User Profile";
			break;
		case 11:
			return "Till Profile";
			break;
		case 12:
			return "Register Profile";
			break;
		case 13:
			return "Misc Media Detail";
			break;
		case 14:
			return "Misc Media Summary";
			break;
		case 15:
			return "Balance Sheet";
			break;
		default:
			return "";
			break;
	}

}

function demoFromHTML() {

	var doc = new jsPDF();

	// We'll make our own renderer to skip this editor
	var specialElementHandlers = {
		'#editor': function(element, renderer){
			return true;
		}
	};

	// All units are in the set measurement for the document
	// This can be changed to "pt" (points), "mm" (Default), "cm", "in"
	doc.fromHTML($('#reportTable').get(0), 15, 15, {
		'width': 170, 
		'elementHandlers': specialElementHandlers
	});

	doc.output('save', 'report.pdf');
	//doc.save('report.pdf');

}


function recordsToCSV(headers, records){
	var data = "data:text/csv;charset=utf-8,";
	records.forEach(function(record, index){
		var record = $.map(record, function(value, index){
			return [value.toString()];
		});
		var recordToString = record.join(",");
		data += index < records.length ? recordToString + "\n" : recordToString;

	}); 

	var encodedUri = encodeURI(data);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "report.csv");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

}


function recordsToPDF(headers, records){
	// I know the proper spelling is colour ;)
	//console.log(headers);
	//console.log(records);

	var doc = new jsPDF();
	var fieldOffset = 5;
	var currentFieldOffset = 0;

	var rowOffset = 5;
	var currentRowOffset = 0;

	doc.setTextColor(0, 0, 0);
	headers.forEach(function(header){
		doc.text(currentFieldOffset, currentRowOffset, header);
		currentFieldOffset += ( header.toString().length * fieldOffset );
	});

	currentFieldOffset = 0;
	currentRowOffset += rowOffset;

	records.forEach(function(record){
		var record = $.map(record, function(value, index){
			return [value.toString()];
		});

		console.log(record);

		record.forEach(function(field){
			doc.text(currentFieldOffset, currentRowOffset, field);
			currentFieldOffset += ( field.toString().length * fieldOffset );
		});
		currentRowOffset += rowOffset;
		currentFieldOffset = 0;
	});

	doc.output('save', 'report.pdf');

}




/*

App = Ember.Application.create();

function getView($el){
  return Ember.View.views[$el.closest(".ember-view").attr("id")];
}

function newAlert(el){
  getView($(el)).get('controller').send('newAlert',el.id);
}

App.IndexView=Ember.View.extend();

App.IndexController=Ember.Controller.extend({
  actions:{
    newAlert:function(buttonId){alert('clicked button:'+buttonId);}
  }
});

*/


App.Router.map(function() {
  // put your routes here
  this.resource("terminal");
  this.resource("dashboard");
  this.resource("userimport");
  this.resource("dispenseconfig");
  this.resource("help");
  this.resource("setting");
  this.resource("report");
  this.resource("alert");
  this.resource("login");
  this.resource("member");
  this.resource("memberedit", {path:'/memberedit/:memberId'} );
  this.resource("memberadd");
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  redirect: function(){
  	this.transitionTo("login");
  }
});

App.DashboardRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  renderTemplate: function(){
  	this.render('dashboard');
  	Em.run.schedule('afterRender', null, function () { Holder.run(); });
  }
});

App.UserimportRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var userImportRoute = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			//console.log("User Import Redirect");
  			//userImportRoute.transitionTo("userimport");
  		}
  		else{
  			userImportRoute.transitionTo("login");
  		}
  		
  	});
  	
  }
});

App.DispenseconfigRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var dispenseConfigRoute = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			//console.log("Dispense Config Redirect");
  			//dispenseConfigRoute.transitionTo("dispenseconfig");
  		}
  		else{
  			dispenseConfigRoute.transitionTo("login");
  		}
  		
  	});
  	
  }
});


App.TerminalRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var terminalRoute = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			//console.log("Dispense Config Redirect");
  			//dispenseConfigRoute.transitionTo("dispenseconfig");
  		}
  		else{
  			terminalRoute.transitionTo("login");
  		}
  		
  	});
  	
  },
  renderTemplate: function(){
  	this.render("terminal");
  	Em.run.schedule('afterRender', null, function () { Holder.run(); });
  }
});

App.HelpRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.SettingRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var settingRoute = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			//console.log("User Import Redirect");
  			//userImportRoute.transitionTo("userimport");
  		}
  		else{
  			settingRoute.transitionTo("login");
  		}
  		
  	});
  	
  }
});

App.AlertRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var alertRoute = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			$.post("https://" + HOST + "/?controller=MemberController&action=getById&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  				var member = JSON.parse(response);
  				if(member.alertsEnabled <= 0){
  					route.transitionTo("login");
  				}
  			});
  		}
  		else{
  			alertRoute.transitionTo("login");
  		}
  		
  	});
  }
});

App.MemberRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var route = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			$.post("https://" + HOST + "/?controller=MemberController&action=getById&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  				var member = JSON.parse(response);
  				if(member.isAdmin <= 0){
  					route.transitionTo("login");
  				}
  			});
  		}
  		else{
  			route.transitionTo("login");
  		}
  		
  	});
  }
});


App.MembereditRoute = Ember.Route.extend({
  model: function(params) {
  	return Ember.$.getJSON("https://" + HOST + "/?controller=MemberController&action=getById&id=" + params.memberId + "&api_key=" + API_KEY);
  },
  beforeModel: function(){
  	var route = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			$.post("https://" + HOST + "/?controller=MemberController&action=getById&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  				var member = JSON.parse(response);
  				if(member.isAdmin <= 0){
  					route.transitionTo("login");
  				}
  			});
  		}
  		else{
  			route.transitionTo("login");
  		}
  		
  	});
  },
  setupController: function(controller, model){
  	this._super(controller, model);
  	$.post("https://" + HOST + "/?controller=ReportController&action=getAllByName&api_key=" + API_KEY, {}, function(response){
  		//console.log(response);
		var reports = JSON.parse(response);
		reports.forEach(function(report, index){
			reports[index].elementId = "report_" + report.id;
		});
		controller.set("availableReports", reports);
		controller.send("showAssignedReports");
		controller.send("renderMemberDetails", model);
	});
  }
});


App.MemberaddRoute = Ember.Route.extend({
  model: function() {
  	return [];
  },
  beforeModel: function(){
  	var route = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			$.post("https://" + HOST + "/?controller=MemberController&action=getById&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  				var member = JSON.parse(response);
  				if(member.isAdmin <= 0){
  					route.transitionTo("login");
  				}
  			});
  		}
  		else{
  			route.transitionTo("login");
  		}
  		
  	});
  }
});


App.ReportRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  },
  beforeModel: function(){
  	var route = this;
  	$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		var isAuthenticated = JSON.parse(response);
  		if(isAuthenticated > 0){
  			//console.log("User Import Redirect");
  			//userImportRoute.transitionTo("userimport");
  		}
  		else{
  			route.transitionTo("login");
  		}
  		
  	});
  },
  setupController: function(controller, model){
  	this._super(controller, model);
  	$.post("https://" + HOST + "/?controller=ReportController&action=getByMemberId&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
  		//console.log(response);
  		/*
		var reports = ;
		reports.forEach(function(report, index){
			reports[index].elementId = "report_" + report.id;
		});
		*/
		controller.set("reports", JSON.parse(response));
		//controller.send("showAssignedReports");
	});
  }
});


App.LoginRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});


//
// Views
//

App.IndexView = Ember.View.extend({
	templateName:"index",
	didInsertElement: function(){
		
	},
	willClearRender: function(){

	}
});


App.PageheaderView = Ember.View.extend({
	templateName:"pageheader",
	didInsertElement: function(){
		
	},
	willClearRender: function(){

	}
});

App.DashboardView = Ember.View.extend({
	templateName:"dashboard",
	didInsertElement: function(){
		
	},
	willClearRender: function(){

	}
});

App.MenunavbarView = Ember.View.extend({
	templateName:"menunavbar",
	didInsertElement: function(){
		
	},
	willClearRender: function(){

	}
});


App.HelpView = Ember.View.extend({
	templateName:"help",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
	},
	willClearRender: function(){

	}
});

App.SettingView = Ember.View.extend({
	templateName:"setting",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		//this.get("controller").send("loadSettings");
		this.get("controller").send("renderTerminalSelectionOptions");
	},
	willClearRender: function(){

	}
});

App.AlertView = Ember.View.extend({
	templateName:"alert",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		this.get("controller").send("activateNavMenuItem");
		this.get("controller").send("loadSettings");
		

	},
	willClearRender: function(){

	}
});


App.MemberView = Ember.View.extend({
	templateName:"member",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		this.get("controller").send("activateNavMenuItem");
		this.get("controller").send("showMemberList");
		//this.get("controller").send("loadSettings");
		

	},
	willClearRender: function(){

	}
});


App.MembereditView = Ember.View.extend({
	templateName:"memberedit",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		//this.get("controller").send("activateNavMenuItem");
		//this.get("controller").send("showMemberList");
		//this.get("controller").send("loadSettings");
		

	},
	willClearRender: function(){

	}
});

App.MemberaddView = Ember.View.extend({
	templateName:"memberadd",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		//this.get("controller").send("activateNavMenuItem");
		//this.get("controller").send("showMemberList");
		//this.get("controller").send("loadSettings");
		

	},
	willClearRender: function(){

	}
});


App.ReportView = Ember.View.extend({
	templateName:"report",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		this.get("controller").send("activateNavMenuItem");
		this.get("controller").send("resetReportForm");
		this.get("controller").send("clearReportData");
		this.get("controller").send("renderDatePickers");
		this.get("controller").send("renderUserSelectionOptions");
		this.get("controller").send("renderRecyclerSelectionOptions");
		this.get("controller").send("renderRegisterSelectionOptions");
		this.get("controller").send("renderTerminalSelectionOptions");
		this.get("controller").send("renderMultiTerminalSelectionOptions");
		this.get("controller").send("renderFunctionSelectionOptions");
		this.get("controller").send("renderTransactionNameSelectionOptions");
		//this.get("controller").send("showReportName", "Select Report");
	},
	willClearRender: function(){

	}
});




App.LoginView = Ember.View.extend({
	templateName:"login",
	didInsertElement: function(){
		$("#menunavbar").hide();	
	},
	willClearRender: function(){

	}
});

App.SubnavbarView = Ember.View.extend({
	templateName:"subnavbar",
	didInsertElement: function(){
		
	},
	willClearRender: function(){

	}
});

App.UserimportView = Ember.View.extend({
	templateName:"userimport",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		this.get("controller").send("activateNavMenuItem");
		
	},
	willClearRender: function(){

	}
});


App.DispenseconfigView = Ember.View.extend({
	templateName:"dispenseconfig",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		this.get("controller").send("activateNavMenuItem");
	},
	willClearRender: function(){

	}
});



App.TerminalView = Ember.View.extend({
	templateName:"terminal",
	didInsertElement: function(){
		clearSelectedNavMenuItem();
		this.get("controller").send("activateNavMenuItem");
		this.get("controller").send("renderTerminalSelectionItems");
		this.get("controller").send("hideTerminalTable");
		this.get("controller").send("enableReportSelection");
	},
	willClearRender: function(){
		
		this.get("controller").send("stopMetersMonitor");
	},
	actions: {
		addTerminalSelectionNode: function(){
			App.TerminalSelectionComponent.create().appendTo($("#terminalSelection"));
		}
	}
});


App.UsertableView = Ember.View.extend({
	templateName:"usertable",
	didInsertElement: function(){
		
	},
	willClearRender: function(){

	}
});


//
// Controller
//

App.IndexController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		}	
	}
});


App.DashboardController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		}	
	}
});


App.UsertableController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		}
	}
});

App.TerminalController = Ember.Controller.extend({
	terminalSelectionItemsHTML: "",
	cassetteMonitorHandler: false,
	terminalId: -1,
	actions: {
		showOption: function(){
		},
		enableReportSelection: function(){
			$('.reportSelection').slick({
			  centerMode: true,
			  centerPadding: '60px',
			  slidesToShow: 3,
			  responsive: [
			    {
			      breakpoint: 768,
			      settings: {
			        arrows: false,
			        centerMode: true,
			        centerPadding: '40px',
			        slidesToShow: 3
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        arrows: false,
			        centerMode: true,
			        centerPadding: '40px',
			        slidesToShow: 1
			      }
			    }
			  ]
			});
		},
		renderMeter: function(recyclerInventoryLists){
			var noteTypeIds = [];
			recyclerInventoryLists.forEach(function(recyclerInventoryList){
				noteTypeIds.push(recyclerInventoryList.noteTypeId);
			});

			var noteType = JSON.parse( $.ajax({
		        type: "POST",
		        url: "https://" + HOST + "/?controller=NoteTypeController&action=getById&id=" + noteTypeIds[0] + "&api_key=" + API_KEY,
		        data:{},
		        async: false
		    }).responseText );

		    //console.log(noteType);

		    //var title = (noteType.exponentValue * noteType.value );
			var title = ( (noteType.cuType == 5) ? parseInt( (noteType.exponentValue * noteType.value).toPrecision(2) * 100 ) + "¢" : "$" + (noteType.exponentValue * noteType.value) );

			/*
			if(!isNaN(noteValue)){
				title = ( (cuType == 5) ? parseInt( noteValue * 100 ) + "¢" : "$" + noteValue );
			}
			*/


		    if(noteType.reject == 1){
		    	title = "REJECT"
		    }
		    else if(noteType.reject == 2){
		    	title = "FORCED";
		    }

		    //var noteType = JSON.parse(response);
			var pieChartHTML = "<div class=\"col-xs-5 col-sm-2 placeholder\"><span class=\"meterTitle\">" + title + "</span><br/><div class=\"chart\" data-noteTypeIds=\"" + noteTypeIds.join("|") + "\" data-percent=\"" + 100 + "\"><div class=\"percent\"></div></div></div>";
			var tableRecordHTML = "<tr id=\"" + noteTypeIds.join("-") + "\" class=\"success\" data-noteTypeIds=\"" + noteTypeIds.join("|") + "\"><td class=\"denominationTitle\">" + title +"</td><td class=\"denominationCount\">0</td><td class=\"denominationAmount\">$0.00</td></tr>";
			var terminalController = this;

			//$("#cassettePieCharts").append(pieChartHTML);
			$(pieChartHTML).appendTo("#cassettePieCharts");
			$(tableRecordHTML).appendTo("#denominationTableBody");
			//$(pieChartHTML).data("noteTypeIds", noteTypeIds.join("|"));

			/*
			$(function() {
		        $('.chart').easyPieChart({
		            //your options goes here
		            barColor: "#31B0D5",
		            lineWidth: 10,
		    		easing: 'easeOutBounce',
		    		onStep: function(from, to, percent){
		    			$(this.el).find('.percent').text(Math.round(percent));
		    		}
		        });		        
		    });
			*/

		},
		resetMeters: function(){
			console.log("swing");
			console.log($('.chart'));

		    $('.chart').each(function(i, element){
		    	console.log(element);
		    	console.log("hit");
		    	$(this).data('easyPieChart').options.barColor = "#31B0D5";
				$(this).data('easyPieChart').update(100);
		    });
		},
		updateMeter: function(element, value){
			// console.log("Updating Meter | Element: " + element + " | Value: " + value);
			//console.log(element);
			/*var barColor = "#31B0D5";	//light blue

			if(value == 100){
				barColor = "#31B0D5" //light blue
			}
			else if(value < 100 && value >= 75){
				barColor = "#449D44"; //dark blue
			}
			else if(value >= 50 && value < 75){
				barColor = "#286090";	//green
			}
			else if(value >= 25 && value < 50){
				barColor = "#EC971F";	//orange
			}
			else{
				barColor = "#C9302C";
			}
			*/
			//console.log(element);

			//element.data('easyPieChart').options.barColor = barColor;
			//element.data('easyPieChart').update(value);

		},
		getRecyclerInventoryListByLastNoteTypeId: function(noteTypeId){
		    return $.ajax({
		        type: "POST",
		        url: "https://" + HOST + "/?controller=RecyclerInventoryListController&action=getLastByNoteTypeId&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY,
		        data:{},
		        async: false
		    }).responseText;
		},
		updateMeters: function(){
			console.log("--- Updating Meters ---");
			var terminalController = this;
			//noteTypeGroupAmount = 0.00;

			terminalController.send("renderInventoryGroups");

			var grandTotalAmount = 0.00;
			$('.pieChart').each(function(){
				var parentElement = $(this).parent();
				//var meterTitleElement = parentElement.children(".meterTitle");
				var noteTypeIdList = $(this).data("notetypeids");
				var noteTypeIds = [];
				var meterPercentAsFloat = 0.00;
				var meterMaximum = 0;
				
				//console.log(noteTypeIdList);
				if(!isNaN(noteTypeIdList)){
					noteTypeIds.push(noteTypeIdList);
				}
				else{
					noteTypeIds = noteTypeIdList.split("|");
				}

				//console.log(parentElement);
				//console.log(meterTitleElement);

				var noteTypeGroupAmount = 0.00;
				var noteTypeGroupQuantity = 0;
				
				noteTypeIds.forEach(function(noteTypeId){
					//console.log(noteTypeId);

					var noteType = JSON.parse( $.ajax({
				        type: "POST",
				        url: "https://" + HOST + "/?controller=NoteTypeController&action=getById&id=" + noteTypeId + "&api_key=" + API_KEY,
				        data:{},
				        async: false
				    }).responseText );

					var recyclerInventoryList = JSON.parse( $.ajax({
				        type: "POST",
				        url: "https://" + HOST + "/?controller=RecyclerInventoryListController&action=getLastByNoteTypeId&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY,
				        data:{},
				        async: false
				    }).responseText );


				    //console.log("https://" + HOST + "/?controller=RecyclerConfigController&action=getByRecyclerAndNoteTypeId&recyclerId=" + terminalController.get("terminalId") + "&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY);

				    var recyclerConfig = JSON.parse( $.ajax({
				        type: "POST",
				        url: "https://" + HOST + "/?controller=RecyclerConfigController&action=getByRecyclerAndNoteTypeId&recyclerId=" + terminalController.get("terminalId") + "&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY,
				        data:{},
				        async: false
				    }).responseText );

				    if(recyclerConfig){
				    	noteTypeGroupAmount += parseFloat( recyclerInventoryList.amount );
						noteTypeGroupQuantity += parseInt( recyclerInventoryList.quantities );
				    }

					

					if(noteType.reject == 1){
						meterMaximum = 600;
					}
					else if(noteType.reject == 2){
						meterMaximum = 55;
					}
					else{
						meterMaximum = recyclerConfig.maximum;
					}

				}); 


				//console.log("Group Total: " + noteTypeGroupQuantity);
				//console.log("Config Max: " + meterMaximum);
				terminalController.send("updateMeter", $(this),	( (noteTypeGroupQuantity / meterMaximum) * 100 ) );
				$("#" + noteTypeIds.join('-')).children(".denominationCount").html(noteTypeGroupQuantity);
				$("#" + noteTypeIds.join('-')).children(".denominationAmount").html("$" + noteTypeGroupAmount.toFixed(2).toString());


				//meterTitleElement.html();

				//console.log(noteTypeIds);
				grandTotalAmount += noteTypeGroupAmount;
			});

			terminalController.send("setTerminalGrandTotal", "$" + grandTotalAmount.toFixed(2).toString());
			//$("#terminalGrandTotal").html("$" + grandTotalAmount.toFixed(2).toString());

			
		},
		renderMeters_deprecated: function(){
			this.send("showCassettePieCharts");
			this.send("renderCassetteMeters");
			//this.send("resetMeters");
			//
			//this.send("updateMeters");
		},
		fetchHopperData: function(){
			
		},
		renderMTCError: function(terminalId){
			//https://api.mimo-llc.com/?controller=ReportController&action=getLastErrorByTerminalId&terminalId=3&api_key=ZETANnf93fh394hg2oInJlY3QiQUARK&debug=1
			$.post("https://" + HOST + "/?controller=ReportController&action=getLastErrorByTerminalId&terminalId=" + terminalId + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var error = JSON.parse(response);
					if(error.mtc == -1){
						$("#terminalErrorCode").html("Could not find MTC Log File.");

					}
					else{
						$("#terminalErrorCode").html("MTC: " + error.mtc + " | Date: " + error.date + " " + error.time);
						$("#terminalErrorCode").addClass("pulse");
					}
					
				}
				else{
					$("#terminalErrorCode").html("");
				}
			});
		},

		renderInventoryGroups: function(recyclerId){
			var controller = this;
			$("#terminalPanel").find('.panel-body').addClass("hidden");
			
			$.post("https://" + HOST + "/?controller=ReportController&action=getCassetteDetails&recyclerId=" + recyclerId + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var cassettes = JSON.parse(response);
					var terminalReportGrandTotal = 0;
					var mimo = [];

					// cash cassettes
					for(cassetteIndex in cassettes['1']){
						var cassette = cassettes['1'][cassetteIndex];
						var denominationPieTable = "<table style=\"width:32px;float:right;\"><th><td style=\"padding:4px;\">Type</td><td style=\"padding:4px;\">Amount</td><td style=\"padding:4px;\">Value</td></th>";
						var totalBills = 0;
						var totalBillValue = 0;
						var meterElementId = "cassette_meter_" + cassetteIndex;
						var canvasName = meterElementId + "Canvas";
						var newData = [];

						for(i=0; i<cassette.tokenDetails.length; i++){
							var tokenDetail = cassette.tokenDetails[i];		

							//var miniMeterElementId = "cassette_meter_"+cassetteIndex+"_mini_"+i;
							//var miniMeterPercent = (tokenDetail.quantity/tokenDetail.maximum)*100;							
							var billValue = tokenDetail.denomination*tokenDetail.quantity;	

							/*newData[canvasName] = {
								name : tokenDetail.denomination,
								value : tokenDetail.quantity,
								color : "#999"
							}
							*/
							// denominationPieTable += "<tr><td><div id=\"" + miniMeterElementId + "\" class=\"chart\" data-percent=\"" + miniMeterPercent + "\" /></td>";
							denominationPieTable += "<td style=\"padding:4px;\">$"+tokenDetail.denomination+"</td>";
							denominationPieTable += "<td style=\"padding:4px;\">"+tokenDetail.quantity+"</td>";
							denominationPieTable += "<td style=\"padding:4px;\">$"+billValue+"</td></tr>";	
							
							totalBills += tokenDetail.quantity;		
							totalBillValue += billValue;

							var total = " Total $ " + billValue;
							var qty = tokenDetail.quantity;
							var denoAmount = "$" + parseInt(tokenDetail.denomination);
							var arcColor = "";

							if (tokenDetail.denomination == 1.00) {
								arcColor = "#58ceff"
							} else if (tokenDetail.denomination == 2.00) {
								arcColor = "#7e7e7e"
							} else if (tokenDetail.denomination == 5.00) {
								arcColor = "#fff110"
							} else if (tokenDetail.denomination == 10.00) {
								arcColor = "#ffa210"
							} else if (tokenDetail.denomination == 20.00) {
								arcColor = "#18de59"
							} else if (tokenDetail.denomination == 50.00) {
								arcColor = "#cc31ff"
							} else if (tokenDetail.denomination == 100.00) {
								arcColor = "#fa4343"
							}

							if (qty > 0){
								newData.push({ 
									label : denoAmount,
									total : total,
									quantity : qty,
									color : arcColor,
									done : false
								})
							};		
							mimo[i] = newData;
						}
						//console.log(mimo[0]);
						denominationPieTable += "<tr><td colspan=2 style=\"padding:4px;text-align:right;\">Total</td><td style=\"padding:4px;\">"+totalBills+"</td><td style=\"padding:4px;\">$"+totalBillValue+"</td></tr></table>";
						//chartData.push(newData.concat());

						var meterPercent = ( (cassette.quantity / cassette.maximum) * 100 );
						//var meterElementId = "cassette_meter_" + cassetteIndex;
						var recordElementId = "cassette_record_" + cassetteIndex;
						var meterColor = getMeterColorByPercent(meterPercent);
						var title = "Cassette " + cassetteIndex;
						//var canvasName = meterElementId + "Canvas";
						var chartCanvas = "<div class=\"col-xs-10 col-sm-10 col-md-10 placeholder\"><div class=\"chart\" id=\""+ canvasName + "\"></div></div>";

						if(0==cassette.rejectType){
							title += " - RECYCLE";
						}
						if(1==cassette.rejectType){
							title += " - REJECT";
						}
						if(2==cassette.rejectType){
							title += " - FORCED";
						}

						// render meters

						if($("#" + meterElementId).length){
							controller.send("updateMeter", $("#" + meterElementId), meterPercent);
							//console.log("updating...");
							/*----------------- UPDATE d3.js Charts ------------- 
					        //Bar Graph
					        var width = 80;
					        var height = 300;

					        
					        $('#' + meterElementId).each(function() {
					        	var svg = d3.select(this).selectAll('svg');

					        	svg.selectAll("rect")
					        		.data([Math.round(meterPercent)])
					        		.attr("y", function(d){ return (height) - d * 3;} )
					        		.attr("height", function(d) { return d * 3; } )

								/* ------------ Percentage ----------------
								svg.select("text")
								   .attr("text-anchor", "middle")
								   .attr("transform", "translate(20, 315)")
								   .text(Math.round(meterPercent) + "%");
								
					    	});


					        // Doughnut Chart
							var width = 400;
							var height = 400;
							var radius = Math.min(width, height) / 2;

							var i = 0;
							$('#' + canvasName).each(function() {

								var thisChart = $(this).attr('id');
								var svg = d3.select("#" + $(this).attr('id')).selectAll("svg")
							
								var arc = d3.svg.arc()
									.innerRadius(radius * 0.4)
									.outerRadius(radius * 0.7);

								var outerArc = d3.svg.arc()
									.innerRadius(radius * 0.8)
									.outerRadius(radius * 0.8);

								var pie = d3.layout.pie()
									.sort(null)
									.value(function (d) { return d; });

								//var key = function(d){ return d.data.label; };
								//console.log(key);

								var thisCassette = [];
								var thisLabel = [];
								var thisTotal = [];
								var colorRange = [];

									// get info in mimo[i] cassette1, cassette2 etc...
								//console.log(mimo[i]);
								for (var j = 0; j < mimo[i].length; j++) {
									//console.log(mimo[i][j]);
									if (mimo[i][j]['quantity'] > 0) {
										thisCassette.push(mimo[i][j]['quantity']);
										thisLabel.push(mimo[i][j]['label']);
										thisTotal.push(mimo[i][j]['total']);
										colorRange.push(mimo[i][j]['color']);
										//console.log(mimo[i][j]['color']);
										//console.log(thisCassette);
									}
								};

								var slice = svg.select(".slices").selectAll("path.slice");

								slice
									.remove();

								var path = svg.select(".slices").selectAll("path");

								colorRange = colorRange;
								var color = d3.scale.ordinal()
									.domain(thisLabel)
									.range(colorRange);
								//console.log(path.data());
							    var data0 = path.data(),
							        data1 = pie(thisCassette);

							    var key = function(d, i){ return colorRange[i]; };

							    path = path.data(data1, key);
							    //console.log(colorRange);
							    path.enter().append("path")
							    	.attr("fill", function(d, i) { return colorRange[i]; })
							        .each(function(d, i) { this._current = findNeighborArc(i, data0, data1, key) || d; });
							        

							    path.exit()
							        .datum(function(d, i) { return findNeighborArc(i, data1, data0, key) || d; })
							      .transition()
							        .duration(750)
							        .attrTween("d", arcTween)
							        .remove();

							    path.transition()
							        .duration(750)
							        .attrTween("d", arcTween);

								function type(d) {
								  d.count = +d.count;
								  return d;
								}

								function findNeighborArc(i, data0, data1) {
								  var d;
								  return (d = findPreceding(i, data0, data1)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
								      : (d = findFollowing(i, data0, data1)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
								      : null;
								}

								// Find the element in data0 that joins the highest preceding element in data1.
								function findPreceding(i, data0, data1) {
								  var m = data0.length;
								  while (--i >= 0) {
								    var k = data1[i];
								    for (var j = 0; j < m; ++j) {
								      if (data0[j] === k) {return data0[j]};
								    }
								  }
								}

								// Find the element in data0 that joins the lowest following element in data1.
								function findFollowing(i, data0, data1) {
								  var n = data1.length, m = data0.length;
								  while (++i < n) {
								    var k = data1[i];
								    for (var j = 0; j < m; ++j) {
								      if (data0[j] === k) {return data0[j]};
								    }
								  }
								}

								function arcTween(d) {
									  var i = d3.interpolate(this._current, d);
									  this._current = i(0);
									  return function(t) { return arc(i(t)); };
									}
								
																		/* ------- TEXT LABELS ------- 

								var text = svg.select(".labels").selectAll("text")
									.data(pie(thisCassette));

								text
									.remove();
								});


								.each()
									.enter()
									.append("text")
									.attr("dy", ".35em")
									.style("opacity", 0)
									.text(function(d, i) {
										return thisTotal[i];
									})
									.each(function(d) {
										this._current = d;
									});

								function midAngle(d){
									return d.startAngle + (d.endAngle - d.startAngle)/2;
								}

								text = svg.select(".labels").selectAll("text")
									.data(pie(thisCassette));

								text.transition().duration(100)
									.style("opacity", function(d) {
										return d.data.value == 0 ? 0 : 1;
									})
									.attrTween("transform", function(d) {
										var interpolate = d3.interpolate(this._current, d);
										var _this = this;
										return function(t) {
											var d2 = interpolate(t);
											_this._current = d2;
											var pos = outerArc.centroid(d2);
											pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
											pos[1] = pos[1] - 10;
												if (midAngle(d2) < Math.PI) {
												 	pos[0] = pos[0] - 50;
												} else {
													pos[0] = pos[0] + 50;
												}
											return "translate("+ pos +")";
										};
									})
									.styleTween("text-anchor", function(d){
										var interpolate = d3.interpolate(this._current, d);
										return function(t) {
											var d2 = interpolate(t);
											return midAngle(d2) < Math.PI ? "start":"end";
										};
									});

								/*text = svg.select(".labels").selectAll("text")
									.data(pie(thisCassette));

								text
									.exit().transition().delay(100)
									.remove();
								*/


								/* ------- SLICE TO TEXT POLYLINES -------

								var polyline = svg.select(".lines").selectAll("polyline")
									.data(pie(thisCassette));

								polyline.enter()
									.append("polyline")
									.style("opacity", 0)
									.each(function(d) {
										this._current = d;
									});

								polyline = svg.select(".lines").selectAll("polyline")
									.data(pie(thisCassette));

								polyline.transition().duration(100)
									.style("opacity", function(d) {
										return d.data.value == 0 ? 0 : .5;
									})
									.attrTween("points", function(d){
										this._current = this._current;
										var interpolate = d3.interpolate(this._current, d);
										var _this = this;
										return function(t) {
											var d2 = interpolate(t);
											_this._current = d2;
											//xy length
											var pos = outerArc.centroid(d2);
											pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
											//xy pos
											var xypos = arc.centroid(d);
											xypos[0] = xypos[0] / 0.85;
											xypos[1] = xypos[1] / 0.85;

											return [xypos, outerArc.centroid(d2), pos];
										};
									});

								polyline = svg.select(".lines").selectAll("polyline")
									.data(pie(thisCassette));

								polyline
									.exit().transition().delay(100)
									.remove();

								/* ---------- ATTACH DENOMINATION TO SLICE -------------- 

								var cash = svg.select(".cash").selectAll("text")
									.data(pie(thisCassette));

								cash
									.enter()
									.append("text")
									.attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
									.attr("text-anchor", "middle")
									.attr("font-size", "1em")
									.text(function (d, i) {
										//if (d.data > 0) {
										return thisLabel[i];
										//}
									});
								i++
								}					
							});*/

						} else {
					
							var pieChartHTML = "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-6 placeholder\"><span class=\"meterTitle\">" + title + "</span><hr/><div id=\"" + meterElementId + "\" class=\"col-xs-2 col-sm-2 placeholder\" data-percent=\"" + 0 + "\"></div>" + chartCanvas + "</div>";
							$(pieChartHTML).appendTo("#cassettePieCharts");
							

							// render large meter
							/*
							$(function() {
						        $("#" + meterElementId).easyPieChart({
					            	//your options goes here
					            	barColor: "#31B0D5",
					            	lineWidth: 10,
					    			easing: 'easeOutBounce',
					    			onStep: function(from, to, percent){
						    			$(this.el).find('.percent').text(Math.round(percent) + "%");
					    			}
					        	});	 
					        	controller.send("updateMeter", $("#" + meterElementId), meterPercent);
						             	
					    	});
							*/

					        /*----------------- d3.js Charts ------------- */
					        //Bar Graph
					        var width = 80;
					        var height = 300;

					        
					        $('#' + meterElementId).each(function() {
					        	var svg = d3.select(this).append('svg')
					        		.attr("width", width)
					        		.attr("height", height)
					        		.attr("style", "margin-top: 50px; margin-left: 10px;")

					        	svg.selectAll("rect")
					        		.data([Math.round(meterPercent)])
					        		.enter()
					        		.append("rect")
					        		.attr("fill", "red")
					        		.attr("y", function(d){ return (height) - d * 3;} )
					        		.attr("height", function(d) { return d * 3; } )
					        		.attr("width", 40)

					        	var y = d3.scale.linear()
					        		.domain([0, 100])
					        		.rangeRound([300, 0])
					        		.nice();

					        	var tickFormatter = d3.format("1s");
					        	var yAxis = d3.svg.axis()
					        		.scale(y)
					        		.orient("left")
					        		.ticks(0);
					        		//.tickFormat(Math.round(meterPercent) + "%");
					        		//.tickFormat(function(d) { return tickFormatter(d) + "%";});

					        	svg.append("g")
					        		.attr("class", "y axis")
					        		.attr("height", 400)
					        		.attr("y", function(d){ return (height) - d * 4;} )
					        		.call(yAxis);


								/* ------------ Percentage in middle ----------------*/
								svg.append("text")
								   .attr("text-anchor", "middle")
								   .attr("transform", "translate(20, 315)")
								   .text(Math.round(meterPercent) + "%");
								svg.append("text")
								   .attr("text-anchor", "middle")
								   .attr("transform", "translate(-12, 150) rotate(-90)")
								   .text("Capacity");


					    	});
					        // Doughnut Chart
							var width = 400;
							var height = 400;
							var radius = Math.min(width, height) / 2;

							var i = 0;
							$('#' + canvasName).each(function() {
								var svg = d3.select(this).select("svg > g");
								// Check if empty
								if (svg.empty()){
									//console.log(mimo[i]);
								var thisChart = $(this).attr('id');
								//console.log(thisChart);
								//mimo[i][0].push( 6, 15, 3 );
								var svg = d3.select("#" + $(this).attr('id')).append("svg")
									.attr("width", 500)
									.attr("height", 500)
									.append("g");

								svg.append("g")
									.attr("class", "slices");
								svg.append("g")
									.attr("class", "progress");
								svg.append("g")
									.attr("class", "labels");
								svg.append("g")
									.attr("class", "lines");
								svg.append("g")
									.attr("class", "cash");

								//var progressArc = d3.svg.arc()
								//	.innerRadius(radius * 0.2)
								//	.outerRadius(radius * 0.38);

								var arc = d3.svg.arc()
									.innerRadius(radius * 0.4)
									.outerRadius(radius * 0.7);

								var outerArc = d3.svg.arc()
									.innerRadius(radius * 0.8)
									.outerRadius(radius * 0.8);

								var pie = d3.layout.pie()
									.sort(null)
									.value(function (d) { return d; });

								svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

								//var key = function(d){ return d.data.label; };
								//console.log(key);

								var thisCassette = [];
								var thisLabel = [];
								var thisTotal = [];
								var colorRange = [];

									// get info in mimo[i] cassette1, cassette2 etc...
								//console.log(mimo[i]);
								for (var j = 0; j < mimo[i].length; j++) {
									//console.log(mimo[i][j]);
									if (mimo[i][j]['quantity'] > 0) {
										thisCassette.push(mimo[i][j]['quantity']);
										thisLabel.push(mimo[i][j]['label']);
										thisTotal.push(mimo[i][j]['total']);
										colorRange.push(mimo[i][j]['color']);
										//console.log(mimo[i][j]['color']);
										//console.log(thisCassette);
									}
								}
 
								if (thisCassette.length == 0) {
									svg.append("text")
									   .attr("text-anchor", "left")
									   .attr("transform", "translate(0, 0)")
									   .text("Empty");
								}

								var color = d3.scale.ordinal()
									.domain(thisLabel)
									.range(colorRange);

								var slice = svg.select(".slices").selectAll("path.slice")
									.data(pie(thisCassette));


								slice
									.enter()
									.insert("path")
									.attr("class", "slice")
									.attr("fill", function(d, i) { return colorRange[i]})
									.each(function(d) {
										this._current = d;
									});

								slice = svg.select(".slices").selectAll("path.slice")
									.data(pie(thisCassette));

								slice
									.transition().duration(100)
									.attrTween("d", function(d) {
										var interpolate = d3.interpolate(this._current, d);
										var _this = this;
										return function(t) {
											_this._current = interpolate(t);
											return arc(_this._current);
										};
									});

								slice = svg.select(".slices").selectAll("path.slice")
									.data(pie(thisCassette));

								slice
									.exit().transition().delay(100).duration(0)
									.remove();

									/* ------- TEXT LABELS -------*/

								var text = svg.select(".labels").selectAll("text")
									.data(pie(thisCassette));

								text.each()
									.enter()
									.append("text")
									.attr("dy", ".35em")
									.style("opacity", 0)
									.text(function(d, i) {
										return thisTotal[i];
									})
									.each(function(d) {
										this._current = d;
									});

								function midAngle(d){
									return d.startAngle + (d.endAngle - d.startAngle)/2;
								}

								text = svg.select(".labels").selectAll("text")
									.data(pie(thisCassette));

								text.transition().duration(100)
									.style("opacity", function(d) {
										return d.data.value == 0 ? 0 : 1;
									})
									.attrTween("transform", function(d) {
										var interpolate = d3.interpolate(this._current, d);
										var _this = this;
										return function(t) {
											var d2 = interpolate(t);
											_this._current = d2;
											var pos = outerArc.centroid(d2);
											pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
											pos[1] = pos[1] - 10;
												if (midAngle(d2) < Math.PI) {
												 	pos[0] = pos[0] - 50;
												} else {
													pos[0] = pos[0] + 50;
												}
											return "translate("+ pos +")";
										};
									})
									.styleTween("text-anchor", function(d){
										var interpolate = d3.interpolate(this._current, d);
										return function(t) {
											var d2 = interpolate(t);
											return midAngle(d2) < Math.PI ? "start":"end";
										};
									});

								/*text = svg.select(".labels").selectAll("text")
									.data(pie(thisCassette));

								text
									.exit().transition().delay(100)
									.remove();
								*/


								/* ------- SLICE TO TEXT POLYLINES -------*/

								var polyline = svg.select(".lines").selectAll("polyline")
									.data(pie(thisCassette));

								polyline.enter()
									.append("polyline")
									.style("opacity", 0)
									.each(function(d) {
										this._current = d;
									});

								polyline = svg.select(".lines").selectAll("polyline")
									.data(pie(thisCassette));

								polyline.transition().duration(100)
									.style("opacity", function(d) {
										return d.data.value == 0 ? 0 : .5;
									})
									.attrTween("points", function(d){
										this._current = this._current;
										var interpolate = d3.interpolate(this._current, d);
										var _this = this;
										return function(t) {
											var d2 = interpolate(t);
											_this._current = d2;
											//xy length
											var pos = outerArc.centroid(d2);
											pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
											//xy pos
											var xypos = arc.centroid(d);
											xypos[0] = xypos[0] / 0.85;
											xypos[1] = xypos[1] / 0.85;

											return [xypos, outerArc.centroid(d2), pos];
										};
									});

								polyline = svg.select(".lines").selectAll("polyline")
									.data(pie(thisCassette));

								polyline
									.exit().transition().delay(100)
									.remove();

								/* ---------- ATTACH DENOMINATION TO SLICE -------------- */

								var cash = svg.select(".cash").selectAll("text")
									.data(pie(thisCassette));

								cash
									.enter()
									.append("text")
									.attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
									.attr("text-anchor", "middle")
									.attr("font-size", "1em")
									.text(function (d, i) {
										//if (d.data > 0) {
										return thisLabel[i];
										//}
									});
								i++
								}					
							});
							




							/*----------------- Chart.Js Charts ------------- not updating */
							/*
							var options = { tooltipTemplate: "<%if (label){%>Qty <%=value%> Total $<%}%><%= label %>" };
							//var chartArray = new Array();
							//var chartCount = 0;
								setTimeout(function() {
									
								 $('.chart').each(function () {
									var ctx = $(this).get(0).getContext('2d');
									var chartArray = chartArrays[$(this).attr("id")];
									//$(this).data("index", chartCount);
									//console.log(chartData[$(this).attr("id")]);
									console.log(chartArray[0]["done"]);
										for (var i = 0; i < chartArray.length; i++) { // get rid of this
											if (chartArray[i] != null && chartArray[i]["done"]) { 
												console.log("Updating...");
												chart.update();
											} else if (chartArray[i]['value'] > 0) {
												var chart = new Chart(ctx).Doughnut(chartArrays[$(this).attr("id")], options);
												chartArray[i]["done"] = true;
												//console.log(chart);
												return
											} else {
												ctx.fillStyle = "black";
												ctx.font = "30px Arial";
												ctx.textAlign = "center";
												ctx.fillText("Empty", ctx.canvas.width/2, ctx.canvas.height/2); 
											}
										}
									})
								}, 10);
								*/
									//chartArray.push(chart);
									//chartCount++;
									//console.log(chartArray);
									/*$(this).mouseover( function(evt) {
											//var chart = chart;
											var thisChart = chartArray[$(this).data("index")];
											//var clicked = $(this)[0];
											var activePoints = thisChart.getSegmentsAtEvent(evt);
											var qty = activePoints[0].label;
											var total = activePoints[0].value;
											var deno = total / qty;
											// => activePoints is an array of segments on the canvas that are at the same position as the click event.
											//console.log(thisChart);
											ctx.fillStyle="black";
											ctx.font="15px Georgia";
											ctx.fillText("$" + deno, ctx.canvas.width/2, ctx.canvas.height/2, 100);
											}
										);
									
								});
							}, 10);
						});*/
							


						    // render mini metersS
						    //var ctx = $("#cassettePieChartsCanvas").get(0).getContext("2d");
						    //var MainChart = new Chart(ctx).Doughnut(data);
								//var ctx = $("#cassettePieChartsCanvas").get(0).getContext("2d");
								//console.log(document.getElementById(meterElementId + "Canvas"));
								
								//setTimeout(function() {var ctx = $(".chartCanvas").get(0).getContext("2d"); var chartDisplay = new Chart(ctx).Doughnut(data); }, 5000);
								//setTimeout(function() { var ctx = document.getElementById(canvasName).getContext("2d"); var chartDisplay = new Chart(ctx).Doughnut(data); }, 100);
							/*$(function() {
								$("#" + meterElementId + "Canvas").get(0).getContext("2d");

							}) /*
						/*
							for(i=0; i<cassette.tokenDetails.length; i++){
								var tokenDetail = cassette.tokenDetails[i];		

								var miniMeterElementId = "cassette_meter_"+cassetteIndex+"_mini_"+i;
								var miniMeterPercent = (tokenDetail.quantity/tokenDetail.maximum)*100;		
								
								$(function() {
						    	    $("#" + miniMeterElementId).easyPieChart({
				        	    		barColor: "#31B025",
				            			lineWidth: 2,
				            			scaleLength: 3,
				            			size: 32,
				    					easing: 'easeOutBounce',
				    					onStep: function(from, to, percent){
							    			$(this.el).find('.percent').text(Math.round(miniMeterPercent) + "%");
				    					}					 
				        			});	 
				        			controller.send("updateMeter", $("#" + miniMeterElementId), miniMeterPercent);						             
				    			});

							}*/
					
						}
						terminalReportGrandTotal += totalBillValue;
					}

					// coin hoppers
					for(hopperIndex in cassettes['2']){ 
						var hopper = cassettes['2'][hopperIndex];
						var denominationPieTable = "<table style=\"width:32px;float:right;\"><th><td style=\"padding:4px;\">Type</td><td style=\"padding:4px;\">Amount</td><td style=\"padding:4px;\">Value</td></th>";
						var totalCoins = 0;
						var totalCoinValue = 0;
						var data = [];

						for(i=0; i<hopper.tokenDetails.length; i++){
							var tokenDetail = hopper.tokenDetails[i];		

							data.push({
								name : tokenDetail.denomination,
								value : tokenDetail.quantity,
								color : "#999"
							});

							var miniMeterElementId = "hopper_meter_"+hopperIndex+"_mini_"+i;						
							var coinValue = tokenDetail.denomination*tokenDetail.quantity;		

							denominationPieTable += "<tr><td><div id=\"" + miniMeterElementId + "\" class=\"chart\" data-percent=\"" + 0 + "\"></div></td>";
							denominationPieTable += "<td style=\"padding:4px;\">"+(tokenDetail.denomination*100)+"&#0162;</td>";
							denominationPieTable += "<td style=\"padding:4px;\">"+tokenDetail.quantity+"</td>";
							denominationPieTable += "<td style=\"padding:4px;\">$"+coinValue+"</td></tr>";	
							
							totalCoins += tokenDetail.quantity;
							totalCoinValue += coinValue;	
						}

						denominationPieTable += "<tr><td colspan=2 style=\"padding:4px;text-align:right;\">Total</td><td style=\"padding:4px;\">"+totalCoins+"</td><td style=\"padding:4px;\">$"+totalCoinValue+"</td></tr></table>";

						var meterPercent = ( (hopper.quantity / hopper.maximum) * 100 );
						var meterElementId = "hopper_meter_" + hopperIndex;
						var recordElementId = "hopper_record_" + hopperIndex;
						var meterColor = getMeterColorByPercent(meterPercent);
						var title = "Hopper " + hopperIndex;

						if(0==hopper.rejectType){
							title += " - RECYCLE";
						}
						if(1==hopper.rejectType){
							title += " - REJECT";
						}
						if(2==hopper.rejectType){
							title += " - FORCED";
						}

						// render coin meters

						if($("#" + meterElementId).length){
							controller.send("updateMeter", $("#" + meterElementId), meterPercent);
						}
						else{
					
							var pieChartHTML = "<div class=\"col-xs-5 col-sm-2 placeholder\"><span class=\"meterTitle\">" + title + "</span><hr/>"+denominationPieTable+"<div id=\"" + meterElementId + "\" class=\"pieChart\" data-percent=\"" + 0 + "\"><div class=\"percent\"></div></div></div>";
							$(pieChartHTML).appendTo("#cassettePieCharts");
							
							// render large meter
							$(function() {
						        $("#" + meterElementId).easyPieChart({
					            	//your options goes here
					            	barColor: "#31B0D5",
					            	lineWidth: 10,
					    			easing: 'easeOutBounce',
					    			onStep: function(from, to, percent){
						    			$(this.el).find('.percent').text(Math.round(percent) + "%");
					    			}
					        	});	 
					        	controller.send("updateMeter", $("#" + meterElementId), meterPercent);
						             	
					    	});

								/*
					    	for(i=0; i<hopper.tokenDetails.length; i++){
								var tokenDetail = hopper.tokenDetails[i];		

								var miniMeterElementId = "hopper_meter_"+hopperIndex+"_mini_"+i;
								var miniMeterPercent = (tokenDetail.quantity/tokenDetail.maximum)*100;	
								
								$(function() {
						    	    $("#" + miniMeterElementId).easyPieChart({
				        	    		barColor: "#31B025",
				            			lineWidth: 2,
				            			scaleLength: 3,
				            			size: 32,
				    					easing: 'easeOutBounce',
				    					onStep: function(from, to, percent){
							    			$(this.el).find('.percent').text(Math.round(miniMeterPercent) + "%");
				    					}					 
				        			});	 
				        			controller.send("updateMeter", $("#" + miniMeterElementId), miniMeterPercent);						             
				    			});		
							} */
					
						}
						terminalReportGrandTotal += totalCoinValue;
					}

					controller.send("showCassettePieCharts");
					$("#terminalGrandTotal").html("$"+terminalReportGrandTotal); 
				}
				else {
					$("#terminalErrorCode").html("No data available!");
					$("#terminalGrandTotal").html("$0.00");
				}
			});
			

			/*
			$.post("https://" + HOST + "/?controller=ReportController&action=getRecyclerMeters&recyclerId=" + recyclerId + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var inventoryGroups = JSON.parse(response);
					var hoppers = inventoryGroups.hoppers;
					var cassettes = inventoryGroups.cassettes;
					var allGroups = inventoryGroups.all;

					controller.send("renderMTCError", recyclerId);

					$("#terminalGrandTotal").html("$" + parseFloat( allGroups.amount ).toFixed(2).toString() );


					cassettes.forEach(function(cassette, index){
						if(cassette.isAvailable){
							terminalAvailable = true;
							var meterPercent = ( (cassette.quantity / cassette.maximum) * 100 );
							var meterElementId = "cassette_meter_" + index;
							var recordElementId = "cassette_record_" + index;
							var meterColor = getMeterColorByPercent(meterPercent);

							var title = "$" + cassette.note;
							if(cassette.isReject){
								title = "REJECT"
							}
							if(cassette.isForced){
								title = "FORCED"
							}
							if(cassette.isMulti){
								title = "MULTI"
							}

							//renders table record

							if($("#" + recordElementId).length){
								var recordElement = $("#" + recordElementId);
								recordElement.children(".denominationTitle").html(title);
								recordElement.children(".denominationCount").html(cassette.quantity);
							}
							else{
								var tableRecordHTML = "<tr id=\"" + recordElementId + "\" class=\"success\"><td class=\"denominationTitle\">" + title +"</td><td class=\"denominationCount\">" + cassette.quantity + "</td></tr>";
								$(tableRecordHTML).appendTo("#denominationTableBody");
							}

							

							// renders meter

							if($("#" + meterElementId).length){
								controller.send("updateMeter", $("#" + meterElementId), meterPercent);
							}
							else{
								

								var pieChartHTML = "<div class=\"col-xs-5 col-sm-2 placeholder\"><span class=\"meterTitle\">" + title + "</span><br/><div id=\"" + meterElementId + "\" class=\"chart\" data-percent=\"" + 0 + "\"><div class=\"percent\"></div></div></div>";
								$(pieChartHTML).appendTo("#cassettePieCharts");
								//controller.send("updateMeter", $("#" + meterElementId), meterPercent);

								$(function() {
							        $("#" + meterElementId).easyPieChart({
							            //your options goes here
							            barColor: "#31B0D5",
							            lineWidth: 10,
							    		easing: 'easeOutBounce',
							    		onStep: function(from, to, percent){
							    			$(this.el).find('.percent').text(Math.round(percent) + "%");
							    		}
							        });	 

							        controller.send("updateMeter", $("#" + meterElementId), meterPercent);
							             
							    });
								
							}


							
							
						}
						
					});
					
					hoppers.forEach(function(hopper, index){
						if(hopper.isAvailable){
							//console.log(hopper);
							var meterPercent = ( (hopper.quantity / hopper.maximum) * 100 );
							var meterElementId = "hopper_meter_" + index;
							var recordElementId = "hopper_record_" + index;
							var meterColor = getMeterColorByPercent(meterPercent);

							var title = ( parseFloat( hopper.note ) * 100 ).toString() + "¢";
							if(hopper.isReject){
								title = "REJECT"
							}
							if(hopper.isForced){
								title = "FORCED"
							}
							if(hopper.isMulti){
								title = "MULTI"
							}


							//renders table record

							if($("#" + recordElementId).length){
								var recordElement = $("#" + recordElementId);
								recordElement.children(".denominationTitle").html(title);
								recordElement.children(".denominationCount").html(hopper.quantity);
							}
							else{
								var tableRecordHTML = "<tr id=\"" + recordElementId + "\" class=\"success\"><td class=\"denominationTitle\">" + title +"</td><td class=\"denominationCount\">" + hopper.quantity + "</td></tr>";
								$(tableRecordHTML).appendTo("#denominationTableBody");
							}


							//render meter

							if(hopper.note != "1.00" && hopper.note != "0.50"){



								if($("#" + meterElementId).length){
									controller.send("updateMeter", $("#" + meterElementId), meterPercent);
								}
								else{
									

									var pieChartHTML = "<div class=\"col-xs-5 col-sm-2 placeholder\"><span class=\"meterTitle\">" + title + "</span><br/><div id=\"" + meterElementId + "\" class=\"chart\" data-percent=\"" + 0 + "\"><div class=\"percent\"></div></div></div>";
									$(pieChartHTML).appendTo("#cassettePieCharts");
									//controller.send("updateMeter", $("#" + meterElementId), meterPercent);
									$(function() {
								        $("#" + meterElementId).easyPieChart({
								            //your options goes here
								            barColor: "#31B0D5",
								            lineWidth: 10,
								    		easing: 'easeOutBounce',
								    		onStep: function(from, to, percent){
								    			$(this.el).find('.percent').text(Math.round(percent) + "%");
								    		}
								        });	 

								        controller.send("updateMeter", $("#" + meterElementId), meterPercent);
								             
								    });
									
								}
							}
							
							
						}
						

					});

	
					var bigCoinQuantity = 0;
					var bigCoinMaximum = 0;
					var bigCoinIsAvailable = false;
					

					hoppers.forEach(function(hopper, index){
						if(hopper.isAvailable && ( hopper.note == "1.00" || hopper.note == "0.50" ) ){
							bigCoinIsAvailable = true;
							bigCoinQuantity += hopper.quantity;
							bigCoinMaximum += hopper.maximum;
						}

					});

					if(bigCoinIsAvailable){
						//console.log("Big Coin Available | Quanity: " + bigCoinQuantity + " | Maximum: " + bigCoinMaximum);

						var meterPercent = ( (bigCoinQuantity / bigCoinMaximum) * 100 );
						var meterElementId = "hopper_meter_bigcoin";
						var recordElementId = "hopper_record_bigcoin";
						var meterColor = getMeterColorByPercent(meterPercent);
						var title = "50¢ / 100¢";
						//var title = ( parseFloat( hopper.note ) * 100 ).toString() + "¢";


						//renders table record

						

						if($("#" + recordElementId).length){
							var recordElement = $("#" + recordElementId);
							recordElement.children(".denominationTitle").html(title);
							recordElement.children(".denominationCount").html(bigCoinQuantity);
						}
						else{
							var tableRecordHTML = "<tr id=\"" + recordElementId + "\" class=\"success\"><td class=\"denominationTitle\">" + title +"</td><td class=\"denominationCount\">" + bigCoinQuantity + "</td></tr>";
							$(tableRecordHTML).appendTo("#denominationTableBody");
						}
						


						//render meter

						if($("#" + meterElementId).length){
							controller.send("updateMeter", $("#" + meterElementId), meterPercent);
						}
						else{

							var pieChartHTML = "<div class=\"col-xs-5 col-sm-2 placeholder\"><span class=\"meterTitle\">" + title + "</span><br/><div id=\"" + meterElementId + "\" class=\"chart\" data-percent=\"" + 0 + "\"><div class=\"percent\"></div></div></div>";
							$(pieChartHTML).appendTo("#cassettePieCharts");
							//controller.send("updateMeter", $("#" + meterElementId), meterPercent);
							$(function() {
						        $("#" + meterElementId).easyPieChart({
						            //your options goes here
						            barColor: "#31B0D5",
						            lineWidth: 10,
						    		easing: 'easeOutBounce',
						    		onStep: function(from, to, percent){
						    			$(this.el).find('.percent').text(Math.round(percent) + "%");
						    		}
						        });	 

						        controller.send("updateMeter", $("#" + meterElementId), meterPercent);
						             
						    });
							
						}
					}


					controller.send("showCassettePieCharts"); 
					controller.send("showDenominationRecords"); 

					$(function() {
				        $('.chart').easyPieChart({
				            //your options goes here
				            barColor: "#31B0D5",
				            lineWidth: 10,
				    		easing: 'easeOutBounce',
				    		onStep: function(from, to, percent){
				    			$(this.el).find('.percent').text(Math.round(percent));
				    		}
				        });	

				        //controller.send("updateMeters"); 
				        controller.send("showCassettePieCharts"); 
				        controller.send("showDenominationRecords");      
				    });
					
					
				}
				else{
					$("#terminalErrorCode").html("No data available!");
					$("#terminalGrandTotal").html("$0.00");
				}
				
			});
			*/
		},
		renderMeters: function(){
			//this.send("showCassettePieCharts");

			var terminalController = this;
			$.post("https://" + HOST + "/?controller=RecyclerInventoryListController&action=getCassettes&api_key=" + API_KEY, {}, function(response){
				var recyclerInventoryLists = JSON.parse(response);
				recyclerInventoryLists.forEach(function(recyclerInventoryList){
					//renderMeter([recyclerInventoryList]);
					terminalController.send("renderMeter", [recyclerInventoryList]);
				});

				$.post("https://" + HOST + "/?controller=RecyclerInventoryListController&action=getHoppers&api_key=" + API_KEY, {}, function(response){
					var recyclerInventoryLists = JSON.parse(response);
					recyclerInventoryLists.forEach(function(recyclerInventoryList){
						//renderMeter([recyclerInventoryList]);
						terminalController.send("renderMeter", [recyclerInventoryList]);
					});

					$.post("https://" + HOST + "/?controller=RecyclerInventoryListController&action=getRejects&api_key=" + API_KEY, {}, function(response){
						var recyclerInventoryLists = JSON.parse(response);
						terminalController.send("renderMeter", recyclerInventoryLists);

						$.post("https://" + HOST + "/?controller=RecyclerInventoryListController&action=getForced&api_key=" + API_KEY, {}, function(response){
							var recyclerInventoryLists = JSON.parse(response);
							terminalController.send("renderMeter", recyclerInventoryLists);

							$(function() {
						        $('.chart').easyPieChart({
						            //your options goes here
						            barColor: "#31B0D5",
						            lineWidth: 10,
						    		easing: 'easeOutBounce',
						    		onStep: function(from, to, percent){
						    			$(this.el).find('.percent').text(Math.round(percent));
						    		}
						        });	

						        terminalController.send("updateMeters"); 
						        terminalController.send("showCassettePieCharts"); 
						        terminalController.send("showDenominationRecords");      
						    });


						});

					});


				});
				
			});

		
			
		},
		fetchCassetteDatas: function(){
			var terminalController = this;
			terminalController.send("clearCassettePieCharts");
			var grandTotal = 0.00;
			$.post("https://" + HOST + "/?controller=RecyclerInventoryListController&action=getHopperTotals&recyclerId=1&api_key=" + API_KEY, {}, function(response){
				var noteTypeGroups = JSON.parse(response);

				noteTypeGroups.forEach(function(noteTypeGroup){
					if(noteTypeGroup.length > 0){
						var noteGroupAmount = 0.00;
						var noteGroupQuantity = 0;
						var initalNoteType = noteTypeGroup[0].noteType;
						//var noteValue = ( (initalNoteType.exponentValue == .01 && initalNoteType.value == 100) ? (.) : ( initalNoteType.exponentValue * initalNoteType.value )  );
						var noteValue = ( (initalNoteType.cuType == 5) ? (initalNoteType.exponentValue * initalNoteType.value).toPrecision(2) : (initalNoteType.exponentValue * initalNoteType.value) );

						if(noteTypeGroup.length > 1){

							if(initalNoteType.reject == 1){
								noteValue = "REJECT";
							}
							else if( initalNoteType.reject == 2){
								noteValue = "FORCED";
							}

						}
						
						
						noteTypeGroup.forEach(function(record){
							var noteType = record.noteType;
							var recyclerInventoryList = record.recyclerInventoryList;

							if(recyclerInventoryList){
								noteGroupAmount += parseFloat( recyclerInventoryList.amount );
								noteGroupQuantity += parseInt( recyclerInventoryList.quantities );

								if(noteType.reject == 0){
									grandTotal += noteGroupAmount;
								}
								
							}

						}); 

						console.log( "Note Value: " + noteValue + " | CU_TYPE: " + initalNoteType.cuType + " | Unit ID: " + initalNoteType.unitId + " | Amount: " + noteGroupAmount + " | Quantity: " + noteGroupQuantity + " | Grand Total: " + grandTotal);

						$.post("https://" + HOST + "/?controller=RecyclerConfigController&action=getByRecyclerAndNoteTypeId&recyclerId=1&noteTypeId=" + initalNoteType.id + "&api_key=" + API_KEY, {}, function(response){
							//console.log(response);
							var recyclerConfig = JSON.parse(response);
							terminalController.send("renderPieChart", initalNoteType.cuType, initalNoteType.unitId.replace(/ /g, '').toLowerCase(), noteValue, ( (recyclerConfig) ? ( (noteGroupQuantity / recyclerConfig.limit) * 100 ) : 100 ) );

						});

						
						
					}
					
				});

				terminalController.send("setTerminalGrandTotal", "$" + grandTotal.toString());
	
				terminalController.send("showCassettePieCharts");
				//terminalController.send("startCassetteMonitor");

			});
		},
		clearDenominationRecords: function(){
			$("#denominationTableBody").html("");
		},
		showDenominationRecords: function(){
			$("#denominationTableBody").removeClass("hidden");
		},
		hideDenominationRecords: function(){
			$("#denominationTableBody").addClass("hidden");
		},
		clearMeters: function(){
			$("#cassettePieCharts").html("");
		},
		showCassettePieCharts: function(){
			$("#cassettePieCharts").removeClass("hidden");
		},
		hideCassettePieCharts: function(){
			$("#cassettePieCharts").addClass("hidden");
		},
		stopMetersMonitor: function(){
			clearInterval(this.get("cassetteMonitorHandler"));
			this.set("cassetteMonitorHandler", false);
		},
		startMetersMonitor: function(){
			var terminalController = this;
			//terminalController.send("stopCassetteMonitor");
			terminalController.set("cassetteMonitorHandler", setInterval(function(){
				//terminalController.send("updateMeters")
				console.log("Action: Updating Data | Terminal: " + terminalController.get("terminalId"));
				terminalController.send("renderInventoryGroups", terminalController.get("terminalId"));
			}, 10000));
		},
		updatePieChartData: function(elementId, value){
			var barColor = "#31B0D5";	//light blue

			if(value == 100){
				barColor = "#31B0D5" //light blue
			}
			else if(value < 100 && value >= 75){
				barColor = "#449D44"; //dark blue
			}
			else if(value >= 50 && value < 75){
				barColor = "#286090";	//green
			}
			else if(value >= 25 && value < 50){
				barColor = "#EC971F";	//orange
			}
			else{
				barColor = "#C9302C";
			}

			//console.log("Element ID: " + elementId);

			$( "#" + elementId).data('easyPieChart').options.barColor = barColor;
			$( "#" + elementId).data('easyPieChart').update(value);

		},
		renderPieChart: function(cuType, unitId, noteValue, percent){
			var title = noteValue;

			if(!isNaN(noteValue)){
				title = ( (cuType == 5) ? parseInt( noteValue * 100 ) + "¢" : "$" + noteValue );
			}


			var elementId = cuType + unitId;
			var pieChartHTML = "<div class=\"col-xs-5 col-sm-2 placeholder\"><span>" + title + "</span><br/><div id=\"" + elementId + "\" class=\"chart\" data-percent=\"" + percent + "\"><div class=\"percent\"></div></div></div>";
			var terminalController = this;
			$("#cassettePieCharts").append(pieChartHTML);
			$(function() {
		        $('.chart').easyPieChart({
		            //your options goes here
		            barColor: "#31B0D5",
		            lineWidth: 10,
		    		easing: 'easeOutBounce',
		    		onStep: function(from, to, percent){
		    			$(this.el).find('.percent').text(Math.round(percent));
		    		}
		        });
		        terminalController.send("updatePieChartData", elementId, percent);
		    });
			
		},
		renderPieCharts: function(){
			
		   //renderPieChart();
		   var terminalController = this;

		   $(function() {
		        $('.chart').easyPieChart({
		            //your options goes here
		            barColor: "#31B0D5",
		            lineWidth: 10,
		    		easing: 'easeOutBounce',
		    		onStep: function(from, to, percent){
		    			$(this.el).find('.percent').text(Math.round(percent));
		    		}
		        });

		        terminalController.send("stopMetersMonitor");


		       	terminalController.set("cassetteMonitorHandler", setInterval(function(){
		        	var randomPercentage = Math.floor( ( Math.random() * 100 ) + 1 );
		        	var randomPercentages = [
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        		Math.floor( ( Math.random() * 100 ) + 1),
		        	];

		        	//$('.chart').data('easyPieChart').update(randomPercentage);

		        	terminalController.send("updatePieChartData", "pennyPieChart", randomPercentages[0]);
		        	terminalController.send("updatePieChartData", "nickelPieChart", randomPercentages[1]);
		        	terminalController.send("updatePieChartData", "dimePieChart", randomPercentages[2]);
		        	terminalController.send("updatePieChartData", "quarterPieChart", randomPercentages[3]);
		        	terminalController.send("updatePieChartData", "halfDollarPieChart", randomPercentages[4]);
		        	terminalController.send("updatePieChartData", "oneDollarCoinPieChart", randomPercentages[5]);
		        	terminalController.send("updatePieChartData", "oneDollarPieChart", randomPercentages[6]);
		        	terminalController.send("updatePieChartData", "fiveDollarPieChart", randomPercentages[7]);
		        	terminalController.send("updatePieChartData", "twentyDollarPieChart", randomPercentages[8]);
		        	terminalController.send("updatePieChartData", "multiPieChart", randomPercentages[9]);
		        	terminalController.send("updatePieChartData", "rejectPieChart", randomPercentages[10]);
		        	terminalController.send("updatePieChartData", "forcedPieChart", randomPercentages[11]);


		        }, 5000));

		        


				terminalController.send("showCassettePieCharts");
		        
		    });
	
		},
		activateNavMenuItem: function(){
			$("#terminalNavMenuItem").addClass("active");
		},
		hideTerminalTable: function(){
			$("#terminalTable").addClass("hidden");
		},
		showTerminalTable: function(){
			$("#terminalTable").removeClass("hidden");
		},
		clearTerminalSelectionItems: function(){
			this.set("terminalSelectionItemsHTML", "");
		},
		hideTerminalSelection: function(){
			//$("#terminalSelectionHeader").addClass("hidden");
			$("#showTerminalsButton").removeClass("hidden");
			$("#terminalSelection").addClass("hidden");
		},
		showTerminalSelection: function(){
			//$("#terminalSelectionHeader").removeClass("hidden");
			$("#showTerminalsButton").addClass("hidden");
			$("#terminalSelection").removeClass("hidden");
			this.send("stopMetersMonitor");
			this.send("hideCassettePieCharts");
			this.send("hideTerminalLegend");
			this.send("hideDenominationRecords");
			this.send("hideTerminalHeader");
			this.send("hideTerminalPanel");
			$("#terminalTable").addClass("hidden");
			//$("#terminalSelectionHeader").html("");
			this.send("showTerminalSelectionHeader");
		},
		hideTerminalSelectionHeader: function(){
			$("#terminalSelectionHeader").addClass("hidden");
		},
		showTerminalSelectionHeader: function(){
			$("#terminalSelectionHeader").removeClass("hidden");
		},
		hideTerminalHeader: function(){
			$("#terminalHeader").addClass("hidden");
		},
		showTerminalHeader: function(){
			$("#terminalHeader").removeClass("hidden");
		},
		showTerminalPanel: function(){
			$("#terminalPanel").removeClass("hidden");
		},
		hideTerminalPanel: function(){
			$("#terminalPanel").addClass("hidden");
		},
		setTerminalGrandTotal: function(grandTotal){
			$("#terminalGrandTotal").html(grandTotal);
		},
		resetTerminalGrandTotal: function(){

			this.send("setTerminalGrandTotal", "$0.00");
		},
		showTerminalLegend: function(){
			$("#terminalLegend").removeClass("hidden");
		},
		hideTerminalLegend: function(){
			$("#terminalLegend").addClass("hidden");
		},

		renderTerminalSelectionItem: function(terminal){
			var terminalSelectionItemsHTML = this.get("terminalSelectionItemsHTML");
			//terminalSelectionItemsHTML += "<div class=\"col-xs-6 col-sm-3 placeholder\" style=\"cursor: pointer;\" data-terminal-id=\"" + terminal.id + "\" onclick=\"selectTerminalNode(this)\"><img data-src=\"holder.js/100x100/auto/" + ( (terminal.fRunning == 1) ? "#33CC00" : "#FF0000" ) + ":#fff/text: " + terminal.name + "\" class=\"img-responsive\" alt=\"Generic placeholder thumbnail\"><br/><span class=\"text-muted\">Status: " + ( (terminal.fRunning == 1) ? "Active": "Inactive" ) + "</span></div>";
			terminalSelectionItemsHTML += "<div class=\"col-xs-6 col-sm-3 placeholder\" style=\"cursor: pointer;\" data-terminal-id=\"" + terminal.id + "\" onclick=\"selectTerminalNode(this)\"><img data-src=\"holder.js/100x100/auto/" + ( (terminal.fRunning == 1) ? "#33CC00" : "#FF0000" ) + ":#fff/text: " + terminal.name + "\" class=\"img-responsive\" alt=\"Generic placeholder thumbnail\"><h4>" + terminal.name + "</h4><span class=\"text-muted\">Status: " + ( (terminal.fRunning == 1) ? "Active": "Inactive" ) + "</span></div>";
			this.set("terminalSelectionItemsHTML", terminalSelectionItemsHTML);
			//console.log(terminalSelectionItemHTML);
			//return terminalSelectionItemHTML;
		},
		selectTerminalNode: function(element){
			var terminalId = parseInt( $(element).data("terminal-id") );
			this.set("terminalId", terminalId);
			terminalController = this;
			$.post("https://" + HOST + "/?controller=TerminalController&action=getById&id=" + terminalId + "&api_key=" + API_KEY, {}, function(terminal){
				var terminal = JSON.parse(terminal);
				//console.log(terminal);
				terminalController.send("renderTerminalHeader", terminal);
				terminalController.send("renderTerminalTableBody", terminal);
				//terminalController.send("renderPieChart");
				terminalController.send("stopMetersMonitor");
				terminalController.send("clearDenominationRecords");
				terminalController.send("resetTerminalGrandTotal");
				terminalController.send("clearMeters");
				terminalController.send("renderInventoryGroups", terminalId);
				//terminalController.send("renderMeters"); enable_this
				//terminalController.send("startCassetteMonitor");
				terminalController.send("hideTerminalSelection");
				terminalController.send("hideTerminalSelectionHeader");
				terminalController.send("showTerminalHeader");
				terminalController.send("showTerminalPanel")
				terminalController.send("showTerminalTable");
				terminalController.send("showTerminalLegend");

				terminalController.send("startMetersMonitor");

				/*
				terminalController.send("updatePieChartData", "pennyPieChart", 100);
	        	terminalController.send("updatePieChartData", "nickelPieChart", 100);
	        	terminalController.send("updatePieChartData", "dimePieChart", 100);
	        	terminalController.send("updatePieChartData", "quarterPieChart", 100);
	        	terminalController.send("updatePieChartData", "halfDollarPieChart", 100);
	        	terminalController.send("updatePieChartData", "oneDollarCoinPieChart", 100);
	        	terminalController.send("updatePieChartData", "oneDollarPieChart", 100);
	        	terminalController.send("updatePieChartData", "fiveDollarPieChart", 100);
	        	terminalController.send("updatePieChartData", "twentyDollarPieChart", 100);
	        	terminalController.send("updatePieChartData", "multiPieChart", 100);
	        	terminalController.send("updatePieChartData", "rejectPieChart", 100);
	        	terminalController.send("updatePieChartData", "forcedPieChart", 100);
	        	*/
			});
		
		},
		renderTerminalHeader: function(terminal){
			$("#terminalHeader").html(terminal.name);
		},
		renderTerminalTableBody: function(terminal){
			//console.log(terminal.createDate.date);
			$("#terminalTableBody").html("<tr><td>" + terminal.id + "</td><td>" + terminal.name + "</td><td>" + terminal.siteId + "</td><td>" + terminal.computerName + "</td><td>" + terminal.fRegistered + "</td><td>" + terminal.createDate.date + "</td><td>" + terminal.fDelete + "</td><td>" + terminal.deleteDate + "</td><td>" + terminal.terminalMode + "</td><td>" + terminal.fAutoBusinessDate + "</td><td>" + terminal.fRunning + "</td></tr>");
			/*
				 <th>#</th>
                  <th>Name</th>
                  <th>Site</th>
                  <th>Computer Name</th>
                  <th>Is Registered</th>
                  <th>Date Added</th>
                  <th>Is Disabled</th>
                  <th>Date Disabled</th>
                  <th>Mode</th>
                  <th>Auto Business Date</th>
                  <th>Is Running</th>
			*/
		},
		renderTerminalSelectionItems: function(){
			var terminalController = this;
			terminalController.send("clearTerminalSelectionItems");
			$.post("https://" + HOST + "/?controller=TerminalController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var terminals = JSON.parse(response);
				//var terminalSelectionItemsHTML = "";
				//console.log(terminals);

				terminals.forEach(function(terminal){
					//console.log(terminal);

					//console.log(terminalController.get("views.terminalview"));


					//App.TerminalSelectionComponent.create().appendTo($("#terminalSelection"));

					//console.log(terminalController);
					terminalController.send("renderTerminalSelectionItem", terminal)
					//console.log();
					//terminalSelectionItemsHTML += terminalController.send("renderTerminalSelectionItem", terminal);
					//console.log(terminalSelectionItemsHTML);
				});


				$("#terminalSelection").html(terminalController.get("terminalSelectionItemsHTML"));
				Em.run.schedule('afterRender', null, function () { Holder.run(); });

			});
			
		}
	}
});


App.DispenseconfigController = Ember.Controller.extend({
	tableHTML: "",
	actions: {
		showOption: function(){
		},
		updateRegisterDispenses: function(){
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();

			var rows = $("#dispenseTableBody").find("tr");
			var dispenseConfigController = this;

			var records = [];
			var registers = [];


			$.each(rows, function(){
					//var dispenseConfig = new Object();
					var record = $(this).data("record");
					records.push(record);
					if(registers.indexOf(record.registerId) == -1){
						registers.push(record.registerId);
					}
					//console.log(record);
			});



			registers.forEach(function(register, index){
				//var register = $(this)[0];

				//console.log(register);

				$.post("https://" + HOST + "/?controller=RegisterController&action=removeDispenses&id=" + register + "&api_key=" + API_KEY, {}, function(response){
					//console.log("Dispenses Removed | Register ID: " + register);
				});

			});


			records.forEach(function(record, index){
				//var record = $(this)[0];

				$.post("https://" + HOST + "/?controller=RegisterController&action=addDispense&id=" + record.registerId + "&dispenseId=" + record.dispenseId + "&api_key=" + API_KEY, {}, function(response){
					//console.log("Dispense Added | Register ID: " + record.registerId + " | Dispense ID: " + record.dispenseId);
				});
			});

		},
		performImport: function(){
			this.send("updateRegisterDispenses");
			//this.send("updateUsers");
			this.send("showCompletionPrompt");
		},
		showCompletionPrompt: function(){
			var completionPrompt = $("#completionPrompt");
			completionPrompt.html("<strong>Success!</strong> Import complete..");
			
			completionPrompt.removeClass("alert-danger");
			completionPrompt.addClass("alert-success");
			completionPrompt.removeClass("hidden");
			this.send("hideConfirmationPrompt");
		},
		hideCompletionPrompt: function(){
			$("#completionPrompt").addClass("hidden");
		},
		updateTable: function(tableHTML){
			$("#dispenseTableBody").html(tableHTML);
			$("#dispenseTableContainer").removeClass("hidden");
			//this.send("hideConfirmationPrompt");
		},
		showConfirmationPrompt: function(){
			$("#confirmationPrompt").removeClass("hidden");
		},
		hideConfirmationPrompt: function(){
			$("#confirmationPrompt").addClass("hidden");
		},
		disallowUserConfirmation: function(){
			$("#confirmationPrompt").addClass("hidden");
			var completionPrompt = $("#completionPrompt");
			completionPrompt.html("<strong>Fail!</strong> Invalid records detected.");
			completionPrompt.removeClass("alert-success");
			completionPrompt.addClass("alert-danger");
			completionPrompt.removeClass("hidden");
		},
		hideBadInputFilePrompt: function(){
			$("#badInputFilePrompt").hide();
		},
		hideCompletionPrompt: function(){
			$("#completionPrompt").addClass("hidden");
		},
		activateNavMenuItem: function(){
			$("#dispenseConfigNavMenuItem").addClass("active");
		},
		validateRecords: function(){
			this.send("hideBadInputFilePrompt");
			this.send("hideCompletionPrompt");
			this.send("showConfirmationPrompt");
			this.set("tableHTML", "");
			var rows = $("#dispenseTableBody").find("tr");

			//console.log("Table HTML After Validation: " + this.get("tableHTML"));
			//this.send("updateTable", "");

			//console.log(rows);
			var dispenseConfigController = this;
			$("#dispenseTableBody > tr").each( function(){
				var record = $(this).data("record");
				var fields = $(this).find("td");

				$.each(fields, function(){
					if($(this).hasClass("danger")){
						var input = $(this).find("input");
						//console.log("Changed Value:" + input.val().trim());
						switch( input.data("field") ){
							case 0:
								record.registerName = encodeURIComponent( input.val().trim() );
								break;
							case 1:
								record.dispenseName = encodeURIComponent( input.val().trim() );
								break;
							default:
								break;
						}
						//record[input.data("field")] = input.val();
						
						//console.log("---- Updating Record ----");
						//console.log(record);
					}
				});

				dispenseConfigController.send("readRecord", record);
			});

		},
		clearUpdateQueue: function(){
			this.updateQueue = [];
		},
		clearInsertQueue: function(){
			this.insertQueue = [];
		},
		clearInput: function(){
			this.send("clearUpdateQueue");
			this.send("clearInsertQueue");
			this.send("updateTable", "");
			$("#dispenseTableContainer").addClass("hidden");
			this.send("hideConfirmationPrompt");
			this.send("hideCompletionPrompt");
			this.send("hideBadInputFilePrompt");
		},
		verifyDatabaseConnection: function(){
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();

			if(dbHost != "" && dbUser != "" && dbPassword != ""){
				var opts = {
				  lines: 13, // The number of lines to draw
				  length: 20, // The length of each line
				  width: 10, // The line thickness
				  radius: 30, // The radius of the inner circle
				  corners: 1, // Corner roundness (0..1)
				  rotate: 0, // The rotation offset
				  direction: 1, // 1: clockwise, -1: counterclockwise
				  color: '#000', // #rgb or #rrggbb or array of colors
				  speed: 1, // Rounds per second
				  trail: 60, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  top: '50%', // Top position relative to parent
				  left: '50%' // Left position relative to parent
				};


				//var target = document.getElementById('dispenseConfigLoadSpinner');
				var target = $("#loadSpinner");
				target.removeClass("hidden");
				var spinner = new Spinner(opts).spin(target[0]);

				$("#verifyButton").prop("disabled", "disabled");


				$.post("https://" + HOST + "/?controller=DatabaseController&action=verify&api_key=" + API_KEY,{},function(result){
					if(result.trim() == "1"){
						$("#inputFile").prop("disabled", false);
						$("#validateButton").prop("disabled", false);
						$("#databaseHost").prop("disabled", "disabled");
						$("#databaseUser").prop("disabled", "disabled");
						$("#databasePassword").prop("disabled", "disabled");
						
					}else{
						alert("Connection to database failed!");
						$("#inputFile").prop("disabled", "disabled");
						$("#validateButton").prop("disabled", "disabled");
						$("#verifyButton").prop("disabled", false);
					}
					$("#loadSpinner").addClass("hidden");
				});
			}
			else{
				$("#loadSpinner").addClass("hidden");
				alert("Please provide database credentials.");
			}

			
		},
		parseRow: function(row){
			if(row.length < 2){
				return false;
			}

			var registerName = row[0].trim();

			if(registerName.toLowerCase().replace(/\s+/g, '') == "departmentname"){
				return false;
			}

			//registerName = encodeURIComponent(registerName);
			//console.log("Register Name: " + registerName);
			var dispenses = row[1].trim().split("|");
			var dispenseConfigController = this;
			dispenses.forEach(function(dispense, index){
				dispense = dispense.trim();
				if(dispense != ""){
					var record = {
						registerName: encodeURIComponent(registerName),
						dispenseName: encodeURIComponent(dispense),
						registerId: -1,
						dispenseId: -1  
					};

					dispenseConfigController.send("readRecord", record);

					//console.log("Register Name: " + registerName);
					//console.log("Dispense Name: " + dispense);
				}
			});
		},
		readRecord: function(row){
			var dispenseConfigController = this;
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();

			//console.log("https://" + HOST + "/?controller=RegisterController&action=getByName&name=" + row.registerName + "&dbHost=" + dbHost + "&dbUser=" + dbUser + "&dbPassword=" + dbPassword + "&api_key=" + API_KEY);

			$.post("https://" + HOST + "/?controller=RegisterController&action=getByName&name=" + row.registerName + "&api_key=" + API_KEY, {}, function(register){
				//console.log(register);
				var register = JSON.parse(register);
				if(register){
					row.registerId = register.id;
					$.post("https://" + HOST + "/?controller=DispenseConfigController&action=getByName&name=" + row.dispenseName + "&api_key=" + API_KEY, {}, function(dispenseConfig){
						var dispenseConfig = JSON.parse(dispenseConfig);
						if(dispenseConfig){
							row.dispenseId = dispenseConfig.id;
							dispenseConfigController.set("tableHTML", (dispenseConfigController.get("tableHTML") + "<tr class=\"success\" data-record='" + JSON.stringify(row) + "'><td>VALID</td><td>" + decodeURIComponent(row.registerName) + "</td><td>" + decodeURIComponent(row.dispenseName) + "</td></tr>"));
							dispenseConfigController.send("updateTable", dispenseConfigController.get("tableHTML"));
						}
						else{
							row.dispenseId = -1;
							dispenseConfigController.set("tableHTML", (dispenseConfigController.get("tableHTML") + "<tr data-record='" + JSON.stringify(row) + "'><td>INVALID - BAD DISPENSE NAME</td><td>" + decodeURIComponent(row.registerName) + "</td><td class=\"danger\"><input type=\"text\" data-field=1 value=\"" + decodeURIComponent(row.dispenseName) + "\"/></td></tr>"));
							dispenseConfigController.send("updateTable", dispenseConfigController.get("tableHTML"));
							dispenseConfigController.send("disallowUserConfirmation");
						}
					});


					
				}
				else{
					row.registerId = -1;
					dispenseConfigController.set("tableHTML", (dispenseConfigController.get("tableHTML") + "<tr data-record='" + JSON.stringify(row) + "'><td>INVALID - BAD REGISTER</td><td class=\"danger\"><input type=\"text\" data-field=0 value=\"" + decodeURIComponent(row.registerName) + "\"/></td><td>" + decodeURIComponent(row.dispenseName) + "</td></tr>"));
					dispenseConfigController.send("updateTable", dispenseConfigController.get("tableHTML"));
					dispenseConfigController.send("disallowUserConfirmation");
				}
			});

		},
		readFile: function(){
			this.send("hideBadInputFilePrompt");
			this.send("hideCompletionPrompt");
			var files = $('#inputFile').prop("files");
			var dispenseConfigController = this;
			dispenseConfigController.set("tableHTML", "");
			if(files.length > 0){
				$("#validateButton").prop("disabled", false);
				var inputFile = files[0];
				
				
				//console.log(inputFile);

				// Parse local CSV file
				Papa.parse(inputFile, {
					worker: true,
					dynamicTyping: false,
					step: function(result) {
						var row = result.data[0];

						
						dispenseConfigController.send("parseRow",row);
						
						
					},
					complete: function(){
						dispenseConfigController.send("showConfirmationPrompt");	
						
						//console.log("Import Complete.");
					}
				});
			}
			else{
				//console.log("Please select a file.");
			}
			
		}
	}
});

App.UserimportController = Ember.Controller.extend({
	tableHTML : "",
	updateQueue: [],
	insertQueue: [],
	userRecordElements: [],
	actions: {
		activateNavMenuItem: function(){
			$("#userImportNavMenuItem").addClass("active");
		},
		addToUserRecordElements: function(userRecordElement){
			this.userRecordElements.push(userRecordElement);
		},
		clearUpdateQueue: function(){
			this.updateQueue = [];
		},
		clearInsertQueue: function(){
			this.insertQueue = [];
		},
		addUsers: function(){
			var rows = $("#userTableBody").find("tr");
			var userImportController = this;

			$.each(rows, function(){
				var user = new Object();
				var record = $(this).data("record");

				user.id = record[0];
				user.secondaryId = record[1];
				user.username = record[2];
				user.password = record[3];
				user.userLevel = ( ( record[4].toUpperCase() == 'Y' ) ? 1 : 0 );
				user.dispenseLimit = record[5];
				user.promptBusDate = ( ( record[6].toUpperCase() == 'Y' ) ? 1 : 0 );
				user.isAllowTransactionRenconcilation = ( ( record[7].toUpperCase() == 'Y' ) ? 1 : 0 );
				user.isManagerOnly = ( ( record[8].toUpperCase() == 'Y' ) ? 1 : 0 );
				user.isMachineOperator = ( ( record[9].toUpperCase() == 'Y' ) ? 1 : 0 );
				user.registerId = record[10];

					
				userImportController.send("createUserWithRegister", user);
			});

			/*
			console.log("--- Inserting ---");
			console.log(this.insertQueue);
			this.send("dispenseInsertQueue", this.insertQueue);
			*/
		},
		dispenseUpdateQueue: function(queue){
			var userImportController = this;
			queue.forEach(function(record){
				var user = new Object();

				user.id = record[0];
				user.secondaryId = record[1];
				user.username = record[2];
				user.password = record[3];
				user.userLevel = record[4];
				user.dispenseLimit = record[5];
				user.promptBusDate = record[6];
				user.isAllowTransactionRenconcilation = record[7];
				user.isManagerOnly = record[8];
				user.isMachineOperator = record[9];
				user.registerId = record[10];


				userImportController.send("updateUser", user);
				userImportController.send("addUserRegister", {
					userId: user.id, 
					registerId: user.registerId
				});
			});

			userImportController.send("clearUpdateQueue");

		},
		dispenseInsertQueue: function(queue){
			var userImportController = this;
			queue.forEach(function(record){
				var user = new Object();
				
				user.id = record[0];
				user.secondaryId = record[1];
				user.username = record[2];
				user.password = record[3];
				user.userLevel = record[4];
				user.dispenseLimit = record[5];
				user.promptBusDate = record[6];
				user.isAllowTransactionRenconcilation = record[7];
				user.isManagerOnly = record[8];
				user.isMachineOperator = record[9];
				user.registerId = record[10];

					
				userImportController.send("createUserWithRegister", user);				

				/*
				userImportController.send("insertUser", user);
				userImportController.send("addUserRegister", {
					userId: user.id, 
					registerId: user.registerId
				});
*/
			});
			userImportController.send("clearInsertQueue");
		},
		createUserWithRegister: function(user){
			var userImportController = this;

			userImportController.send("insertUser", user);
		},
		updateUsers: function(){
			//console.log("--- Updating ---");
			//console.log(this.updateQueue);
			this.send("dispenseUpdateQueue", this.updateQueue);
		},
		performImport: function(){
			this.send("addUsers");
			//this.send("updateUsers");
			this.send("showCompletionPrompt");
		},
		showBadInputFilePrompt: function(){
			$("#badInputFilePrompt").show();
		},
		hideBadInputFilePrompt: function(){
			$("#badInputFilePrompt").hide();
		},
		addToUpdateQueue: function(record){
			this.updateQueue.push(record);
		},
		addToInsertQueue: function(record){
			this.insertQueue.push(record);
		},
		updateTable: function(tableHTML){
			$("#userTableBody").html(tableHTML);
			$("#userTableContainer").removeClass("hidden");
			//this.send("hideConfirmationPrompt");
		},
		verifyDatabaseConnection: function(){
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();

			if(dbHost != "" && dbUser != "" && dbPassword != ""){
				var opts = {
				  lines: 13, // The number of lines to draw
				  length: 20, // The length of each line
				  width: 10, // The line thickness
				  radius: 30, // The radius of the inner circle
				  corners: 1, // Corner roundness (0..1)
				  rotate: 0, // The rotation offset
				  direction: 1, // 1: clockwise, -1: counterclockwise
				  color: '#000', // #rgb or #rrggbb or array of colors
				  speed: 1, // Rounds per second
				  trail: 60, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  top: '50%', // Top position relative to parent
				  left: '50%' // Left position relative to parent
				};


				//var target = document.getElementById('dispenseConfigLoadSpinner');
				var target = $("#loadSpinner");
				target.removeClass("hidden");
				var spinner = new Spinner(opts).spin(target[0]);

				$("#verifyButton").prop("disabled", "disabled");


				$.post("https://" + HOST + "/?controller=DatabaseController&action=verify&dbHost=" + dbHost + "&dbUser=" + dbUser + "&dbPassword=" + dbPassword + "&api_key=" + API_KEY,{},function(result){
					if(result.trim() == "1"){
						$("#inputFile").prop("disabled", false);
						$("#validateButton").prop("disabled", false);
						$("#databaseHost").prop("disabled", "disabled");
						$("#databaseUser").prop("disabled", "disabled");
						$("#databasePassword").prop("disabled", "disabled");
						
					}else{
						alert("Connection to database failed!");
						$("#inputFile").prop("disabled", "disabled");
						$("#validateButton").prop("disabled", "disabled");
						$("#verifyButton").prop("disabled", false);
					}
					$("#loadSpinner").addClass("hidden");
				});
			}
			else{
				$("#loadSpinner").addClass("hidden");
				alert("Please provide database credentials.");
			}

			
		},
		updateUser: function(user){
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();
			$.post("https://" + HOST + "/?controller=UserController&action=update&api_key=" + API_KEY,JSON.stringify(user),function(result){
				//console.log(result);
			});
		},
		addUserRegister: function(userRegister){
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();
			$.post("https://" + HOST + "/?controller=UserRegisterController&action=create&api_key=" + API_KEY,JSON.stringify(userRegister),function(result){
				//console.log(result);
			});
		},
		insertUsers: function(users){
			users.forEach(function(user){
				this.send("insertUser", user);
			});
		},
		insertUser: function(user){
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();
			var userImportController = this;
			$.post("https://" + HOST + "/?controller=UserController&action=create&api_key=" + API_KEY,JSON.stringify(user),function(result){
				//console.log(result);
				userImportController.send("addUserRegister", {
					registerId: user.registerId,
					userId: user.id
				});
			});
		},
		showCompletionPrompt: function(){
			var completionPrompt = $("#completionPrompt");
			completionPrompt.html("<strong>Success!</strong> Import complete..");
			
			completionPrompt.removeClass("alert-danger");
			completionPrompt.addClass("alert-success");
			completionPrompt.removeClass("hidden");
			this.send("hideConfirmationPrompt");
		},
		hideCompletionPrompt: function(){
			$("#completionPrompt").addClass("hidden");
		},
		showConfirmationPrompt: function(){
			$("#confirmationPrompt").removeClass("hidden");
		},
		hideConfirmationPrompt: function(){
			$("#confirmationPrompt").addClass("hidden");
		},
		disallowUserConfirmation: function(){
			$("#confirmationPrompt").addClass("hidden");
			var completionPrompt = $("#completionPrompt");
			completionPrompt.html("<strong>Fail!</strong> Invalid records detected.");
			completionPrompt.removeClass("alert-success");
			completionPrompt.addClass("alert-danger");
			completionPrompt.removeClass("hidden");
		},
		clearInput: function(){
			this.send("clearUpdateQueue");
			this.send("clearInsertQueue");
			this.send("updateTable", "");
			$("#userTableContainer").addClass("hidden");
			this.send("hideConfirmationPrompt");
			this.send("hideCompletionPrompt");
			this.send("hideBadInputFilePrompt");
		},
		validateRecords: function(){
			this.send("hideBadInputFilePrompt");
			this.send("hideCompletionPrompt");
			this.send("showConfirmationPrompt");
			this.set("tableHTML", "");
			var rows = $("#userTableBody").find("tr");

			//console.log(rows);
			var userImportController = this;
			$("#userTableBody > tr").each( function(){
				var record = $(this).data("record");
				var fields = $(this).find("td");

				$.each(fields, function(){
					if($(this).hasClass("danger")){
						var input = $(this).find("input");
						//console.log("Changed Value:" + input.val() );
						record[input.data("field")] = input.val();
						//console.log("---- Updating Record ----");
						//console.log(record);
					}
				});

				userImportController.send("readRecord", record);
			});

		},
		readRecord: function(row){
			var userImportController = this;
			var dbHost = $("#databaseHost").val();
			var dbUser = $("#databaseUser").val();
			var dbPassword = $("#databasePassword").val();

			if(row.length < 11){
				return false;
			}

			if(row[0].toLowerCase().replace(/\s+/g, '') == "userid"){
				return false; 
			}

			if(row[4].toUpperCase() != 'Y'){
				row[4] = 'N';
			}

			if(row[6].toUpperCase() != 'Y'){
				row[6] = 'N';
			}

			if(row[7].toUpperCase() != 'Y'){
				row[7] = 'N';
			}


			if(row[8].toUpperCase() != 'Y'){
				row[8] = 'N';
			}

			if(row[9].toUpperCase() != 'Y'){
				row[9] = 'N';
			}


			//console.log("https://" + HOST + "/?controller=RegisterController&action=getById&id=" + row[10] + "&dbHost=" + dbHost + "&dbUser=" + dbUser + "&dbPassword=" + dbPassword + "&api_key=" + API_KEY);

			$.post("https://" + HOST + "/?controller=RegisterController&action=getById&id=" + row[10] + "&api_key=" + API_KEY,{},function(register){
							
				//console.log(register);
				if(register != 'false'){
					var register = JSON.parse(register);
					$.post("https://" + HOST + "/?controller=UserController&action=getBySecondaryId&id=" + row[1] + "&api_key=" + API_KEY,{},function(results){
					    var results = JSON.parse(results);
					    if(results.length == 0 || row[1] == ""){
					    	//console.log(results);
					    	//tableHTML += "<tr><td >UPDATE</td><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] + "</td><td>" + row[4] + "</td><td>" + row[5] + "</td><td>" + row[6] +"</td><td>" + row[7] + "</td><td>" + row[8] + "</td><td>" + row[9] + "</td><td>" + register.name + "</td></tr>";
					    	//userImportController.send("updateTable", tableHTML);
					    	//userImportController.send("addToUpdateQueue", row);
					    //}
					    //else{
					    	$.post("https://" + HOST + "/?controller=UserController&action=getById&id=" + row[0] + "&api_key=" + API_KEY,{},function(result){
							    var result = JSON.parse(result);
							    if(result){
							    	//console.log(result);
							    	//console.log("Error: User already exists.");
							    	userImportController.send("disallowUserConfirmation");
							    	userImportController.set("tableHTML", (userImportController.get("tableHTML") + "<tr data-record='" + JSON.stringify(row) + "'><td>INVALID: USER ID EXISTS!</td><td class=\"danger\"><input type=\"text\" data-field=0 value=\"" + row[0] + "\"/></td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] + "</td><td>" + row[4] + "</td><td>" + row[5] + "</td><td>" + row[6] +"</td><td>" + row[7] + "</td><td>" + row[8] + "</td><td>" + row[9] + "</td><td>" + register.name + "</td></tr>"));
							    	userImportController.send("updateTable", userImportController.get("tableHTML"));
							    	//userImportController.send("addToUpdateQueue", row);
							    }
							    else{
							    	
							    	userImportController.set("tableHTML", (userImportController.get("tableHTML") + "<tr class=\"success\" data-record='" + JSON.stringify(row) + "'><td>VALID</td><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] + "</td><td>" + row[4] + "</td><td>" + row[5] + "</td><td>" + row[6] +"</td><td>" + row[7] + "</td><td>" + row[8] + "</td><td>" + row[9] + "</td><td>" + register.name + "</td></tr>"));
							    	userImportController.send("updateTable", userImportController.get("tableHTML"));
							    	//userImportController.send("addToInsertQueue", row);
							    }
							    
							 });
					   	}
					   	else{
					   		//console.log("Error: User already exists.");
					   		userImportController.set("tableHTML", (userImportController.get("tableHTML") + "<tr data-record='" + JSON.stringify(row) + "'><td >INVALID: SECONDARY ID EXISTS!</td><td>" + row[0] + "</td><td class=\"danger\"><input type=\"text\" data-field=1 value=\"" + row[1] + "\"/></td><td>" + row[2] + "</td><td>" + row[3] + "</td><td>" + row[4] + "</td><td>" + row[5] + "</td><td>" + row[6] +"</td><td>" + row[7] + "</td><td>" + row[8] + "</td><td>" + row[9] + "</td><td>" + register.name + "</td></tr>"));
					    	userImportController.send("updateTable", userImportController.get("tableHTML"));
					   		userImportController.send("disallowUserConfirmation");
					   	}
					    
					});
				}
				else{
					//console.log("Error: Register ");
					userImportController.send("disallowUserConfirmation");
					userImportController.set("tableHTML", (userImportController.get("tableHTML") + "<tr data-record='" + JSON.stringify(row) + "'><td >INVALID: REGISTER DOES NOT EXIST!</td><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] + "</td><td>" + row[4] + "</td><td>" + row[5] + "</td><td>" + row[6] +"</td><td>" + row[7] + "</td><td>" + row[8] + "</td><td>" + row[9] + "</td><td class=\"danger\"><input type=\"text\" data-field=10 value=\"" + row[10] + "\"/></td></tr>"));
			    	userImportController.send("updateTable", userImportController.get("tableHTML"));
				}

			
			});
		},
		readFile: function(){
			this.send("hideBadInputFilePrompt");
			this.send("hideCompletionPrompt");
			var files = $('#inputFile').prop("files");
			var userImportController = this;
			userImportController.set("tableHTML", "");
			if(files.length > 0){
				var inputFile = files[0];
				$("#validateButton").prop("disabled", false);
				
				
				//console.log(inputFile);

				// Parse local CSV file
				Papa.parse(inputFile, {
					worker: true,
					dynamicTyping: false,
					step: function(result) {
						var row = result.data[0];

						
						userImportController.send("readRecord",row);
						
						
					},
					complete: function(){
						userImportController.send("showConfirmationPrompt");	
						
						//console.log("Import Complete.");
					}
				});
			}
			else{
				//console.log("Please select a file.");
			}
			
		}
	}
});

App.HelpController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		}	
	}
});

App.AlertController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		},
		activateNavMenuItem: function(){
			$("#alertNavMenuItem").addClass("active");
		},
		loadSettings: function(){
			$.post("https://" + HOST + "/?controller=MemberController&action=getById&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
				var member = JSON.parse(response);
				$("#emailAlertDelay").val( (member.emailAlertDelayInSeconds / 60 ) );
				$("#errorAlertDelay").val( ( member.errorAlertDelayInSeconds / 60 ) );
				$("#openTillAlertDelay").val( ( member.openTillAlertDelayInSeconds / 60 ) );
				$("#enableEmailAlertsCheckbox")[0].checked = ( (member.emailAlertsEnabled == 1) ? true : false );
				$("#enableErrorAlertsCheckbox")[0].checked = ( (member.errorAlertsEnabled == 1) ? true : false );
				$("#enableOpenTillAlertsCheckbox")[0].checked = ( (member.openTillAlertsEnabled == 1) ? true : false );
			});

			$.post("https://" + HOST + "/?controller=RecyclerLimitController&action=getByMemberId&memberId=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){
				var recyclerLimit = JSON.parse(response);
				$("#cassette_d_min").val(recyclerLimit.cassetteDMin);
				$("#cassette_d_max").val(recyclerLimit.cassetteDMax);
				$("#cassette_c_min").val(recyclerLimit.cassetteCMin);
				$("#cassette_c_max").val(recyclerLimit.cassetteCMax);
				$("#cassette_b_min").val(recyclerLimit.cassetteBMin);
				$("#cassette_b_max").val(recyclerLimit.cassetteBMax);
				$("#cassette_a_min").val(recyclerLimit.cassetteAMin);
				$("#cassette_a_max").val(recyclerLimit.cassetteAMax);
				$("#cassette_f_min").val(recyclerLimit.cassetteFMin);
				$("#cassette_f_max").val(recyclerLimit.cassetteFMax);
				$("#cassette_h_min").val(recyclerLimit.cassetteHMin);
				$("#cassette_h_max").val(recyclerLimit.cassetteHMax);

				$("#hopper_g_min").val(recyclerLimit.hopperGMin);
				$("#hopper_g_max").val(recyclerLimit.hopperGMax);
				$("#hopper_e_min").val(recyclerLimit.hopperEMin);
				$("#hopper_e_max").val(recyclerLimit.hopperEMax);
				$("#hopper_d_min").val(recyclerLimit.hopperDMin);
				$("#hopper_d_max").val(recyclerLimit.hopperDMax);
				$("#hopper_c_min").val(recyclerLimit.hopperCMin);
				$("#hopper_c_max").val(recyclerLimit.hopperCMax);
				$("#hopper_b_min").val(recyclerLimit.hopperBMin);
				$("#hopper_b_max").val(recyclerLimit.hopperBMax);
				$("#hopper_a_min").val(recyclerLimit.hopperAMin);
				$("#hopper_a_max").val(recyclerLimit.hopperAMax);

			});
		},
		updateOptions: function(){
			this.send("updateAlertOptions");
			this.send("updateRecyclerLimits");
		},
		updateAlertOptions: function(){
			var options = {
				emailAlertDelayInSeconds: ( parseInt( $("#emailAlertDelay").val() ) * 60 ),
				errorAlertDelayInSeconds: ( parseInt( $("#errorAlertDelay").val() ) * 60 ),
				openTillAlertDelayInSeconds: ( parseInt( $("#openTillAlertDelay").val() ) * 60 ),
				emailAlertsEnabled: ( $("#enableEmailAlertsCheckbox").is(":checked") ? 1 : 0 ),
				errorAlertsEnabled: ( $("#enableErrorAlertsCheckbox").is(":checked") ? 1 : 0 ),
				openTillAlertsEnabled: ( $("#enableOpenTillAlertsCheckbox").is(":checked") ? 1 : 0 )
			};

			$.post("https://" + HOST + "/?controller=MemberController&action=updateAlertOptions&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, JSON.stringify(options), function(response){
				//console.log(response);
				//console.log("--- Updated Alert Options ---");
				//console.log(options);
			});
		},
		updateRecyclerLimits: function(){
			var options = {
				cassetteAMin: parseInt( $("#cassette_a_min").val() ),
				cassetteAMax: parseInt( $("#cassette_a_max").val() ),
				cassetteBMin: parseInt( $("#cassette_b_min").val() ),
				cassetteBMax: parseInt( $("#cassette_b_max").val() ),
				cassetteCMin: parseInt( $("#cassette_c_min").val() ),
				cassetteCMax: parseInt( $("#cassette_c_max").val() ),
				cassetteDMin: parseInt( $("#cassette_d_min").val() ),
				cassetteDMax: parseInt( $("#cassette_d_max").val() ),
				cassetteFMin: parseInt( $("#cassette_f_min").val() ),
				cassetteFMax: parseInt( $("#cassette_f_max").val() ),
				cassetteHMin: parseInt( $("#cassette_h_min").val() ),
				cassetteHMax: parseInt( $("#cassette_h_max").val() ),
				hopperGMin: parseInt( $("#hopper_g_min").val() ),
				hopperGMax: parseInt( $("#hopper_g_max").val() ),
				hopperEMin: parseInt( $("#hopper_e_min").val() ),
				hopperEMax: parseInt( $("#hopper_e_max").val() ),
				hopperDMin: parseInt( $("#hopper_d_min").val() ),
				hopperDMax: parseInt( $("#hopper_d_max").val() ),
				hopperCMin: parseInt( $("#hopper_c_min").val() ),
				hopperCMax: parseInt( $("#hopper_c_max").val() ),
				hopperBMin: parseInt( $("#hopper_b_min").val() ),
				hopperBMax: parseInt( $("#hopper_b_max").val() ),
				hopperAMin: parseInt( $("#hopper_a_min").val() ),
				hopperAMax: parseInt( $("#hopper_a_max").val() )
			};

			$.post("https://" + HOST + "/?controller=RecyclerLimitController&action=update&memberId=" + App.MEMBER_ID + "&api_key=" + API_KEY, JSON.stringify(options), function(response){
				//console.log("--- Updated Alert Options ---");
				//console.log(options);
			});
		}
	}
});

App.MemberController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		},
		goToAddMember: function(){
			this.transitionToRoute("memberadd");
		},
		activateNavMenuItem: function(){
			$("#memberNavMenuItem").addClass("active");
		},
		showMemberList: function(){
			$("#memberTableBody").html("");
			$.post("https://" + HOST + "/?controller=MemberController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var memberListHTML = "";
				var members = JSON.parse(response);

				$("#memberTableHeader").html("<th>First Name</th><th>Last Name</th><th>Email</th>");

				members.forEach(function(member){
					//<button type=\"button\" class=\"btn btn-default\" onclick=\"memberDetailReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button>
					memberListHTML += "<tr><td>" + member.firstName + "</td><td>" + member.lastName + "</td><td>" + member.emailAddress + "</td><td><button type=\"button\" class=\"btn btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Settings\" onclick=\"window.location='#/memberedit/" + member.id + "'\"><span class=\"glyphicon glyphicon-cog\"></span></button><td></tr>";
				});

				$("#memberTableBody").html(memberListHTML);
			});
		}

	}
});


App.MembereditController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		},
		updateMemberPassword: function(){

			var controller = this;

			//$request->emailAddress, $request->password, $request->firstName, $request->lastName
			if($("#password").val() == $("#confirmPassword").val()){
				$.post("https://" + HOST + "/?controller=MemberController&action=changePassword&id=" + this.model.id + "&password=" + $("#password").val() + "&api_key=" + API_KEY, {}, function(response){
					controller.transitionToRoute("member");
				});
			}

		},
		renderMemberDetails: function(member){

			if(member.isAdmin > 0){
				$("#isAdmin").prop("checked", true);
			}

			if(member.alertsEnabled > 0){
				$("#alertsEnabled").prop("checked", true);
			}
			
			

		},
		updateMemberDetails: function(){

			var controller = this;

			$.post("https://" + HOST + "/?controller=MemberController&action=updateDetails&emailAddress=" + $("#emailAddress").val() + "&firstName=" + $("#firstName").val() + "&lastName=" + $("#lastName").val() + "&isAdmin=" + ( $("#isAdmin").is(":checked") ? 1 : 0) + "&alertsEnabled=" + ( $("#alertsEnabled").is(":checked") ? 1 : 0) + "&id=" + this.model.id + "&api_key=" + API_KEY, {}, function(response){
				//console.log(response);
				controller.transitionToRoute("member");
			});


		},
		updateMemberReports: function(){
			//console.log(this.model);
			//console.log(this.availableReports);

			var reportSelectionItems = $(".report-selection-item:checked");
			var reportIDList = [];
			var controller = this;

			$.each(reportSelectionItems, function(index, reportSelectionItem){
				//console.log(reportSelectionItem);
				//console.log("Selected: " + reportSelectionItem.id);
				reportIDList.push(parseInt(reportSelectionItem.id.replace("report_", "")));
			});

			$.post("https://" + HOST + "/?controller=ReportController&action=assign&memberId=" + this.model.id + "&api_key=" + API_KEY, JSON.stringify(reportIDList), function(response){
				//console.log(response);
				controller.transitionToRoute("member");
			});


		},
		showAssignedReports: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getByMemberId&id=" + this.model.id + "&api_key=" + API_KEY, {}, function(response){
				var reports = JSON.parse(response);
				if(reports){
					//console.log(reports);
					reports.forEach(function(report){
						if( $("#report_" + report.id).length > 0 ){
							$("#report_" + report.id).prop("checked", true);
						}
					});
				}
			});
		},
		selectAllReports: function(){
			$(".report-selection-item:not(:checked)").each(function(index, reportSelectionItem){
				$(reportSelectionItem).prop("checked", true);
			});
		}

	}
});


App.MemberaddController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		},
		addMember: function(){

			var controller = this;

			//$request->emailAddress, $request->password, $request->firstName, $request->lastName
			if($("#password").val() == $("#confirmPassword").val()){
				$.post("https://" + HOST + "/?controller=MemberController&action=create&emailAddress=" + $("#emailAddress").val() + "&password=" + $("#password").val() + "&firstName=" + $("#firstName").val() + "&lastName=" + $("#lastName").val() + "&api_key=" + API_KEY, {}, function(response){
					controller.transitionToRoute("member");
				});
			}

		}

	}
});


App.ReportController = Ember.Controller.extend({
	reportName: "",
	reportId: -1,
	actions: {
		renderDatePickers: function(){
			$('.datepicker').pickadate({
				format: 'mm/dd/yyyy',
			});
		},
		showOption: function(){
		},
		activateNavMenuItem: function(){
			$("#reportNavMenuItem").addClass("active");
		},
		MIMOBalanceReportShowNoteDetails: function(element){
			$(element).closest('tr').next('tr').toggle();
		},
		forcedNoteReportShowNoteDetails: function(element){
			$(element).closest('tr').next('tr').toggle();
		},
		userTransactionReportShowNoteDetails: function(element){
			$(element).closest('tr').next('tr').toggle();
		},
		recyclerTransactionReportShowNoteDetails: function(element){
			$(element).closest('tr').next('tr').toggle();
		},
		userDetailReportShowNoteDetails: function(element){
			$(element).closest('tr').next('tr').toggle();
		},
		selectReport: function(){
			var reportId = parseInt( $("#reportName").val() );
			var reportName = getReportName( reportId );

			//console.log("Selected Report | Report ID: " + reportId + " | Report Name: " + reportName);

			this.send("clearReportData");
			this.send("hideOptions");
			this.set("reportName", reportName);
			this.set("reportId", reportId);
			this.send("showReportName", this.get("reportName"));
			
			var reportController = this;
			switch(reportId){
				case 1:
					reportController.send("showGrandTotalReportOptions");
					break;
				case 2:
					reportController.send("showUserDetailReportOptions");
					break;
				case 3:
					reportController.send("showUserSummaryReportOptions");
					break;
				case 4:
					reportController.send("showRegisterDetailReportOptions");
					break;
				case 5:
					reportController.send("showRegisterSummaryReportOptions");
					break;
				case 6:
					reportController.send("showTerminalDetailReportOptions");
					break;
				case 7:
					reportController.send("showTerminalSummaryReportOptions");
					break;
				case 8:
					reportController.send("showTransactionLogReportOptions");
					break;
				case 9:
					reportController.send("showOpenTillReportOptions");
					break;
				case 10:
					reportController.send("showUserProfileReportOptions");
					break;
				case 11:
					reportController.send("showTillProfileReportOptions");
					break;
				case 12:
					reportController.send("showRegisterProfileReportOptions");
					break;
				case 13:
					reportController.send("showMiscMediaDetailReportOptions");
					break;
				case 14:
					reportController.send("showMiscMediaSummaryReportOptions");
					break;
				case 15:
					reportController.send("showBalanceSheetReportOptions");
					break;
				case 16:
					reportController.send("showGrandTotalByDateReportOptions");
					break;
				case 17:
					reportController.send("showDailyTotalsReportOptions");
					break;
				case 18:
					reportController.send("showNoteCountReportOptions");
					break;
				case 19:
					reportController.send("showMIMOBalanceReportOptions");
					break;
				case 20:
					reportController.send("showForcedNotesReportOptions");
					break;
				case 21:
					reportController.send("showCashSettingsReportOptions");
					break;
				default:
					break;
			}
		},
		runReport: function(){
			var reportId = this.get("reportId");
			var reportName = this.get("reportName");


			var reportController = this;
			switch(reportId){
				case 1:
					reportController.send("renderGrandTotalReport");
					break;
				case 2:
					reportController.send("renderUserDetailReport");
					break;
				case 3:
					reportController.send("renderUserSummaryReport");
					break;
				case 4:
					reportController.send("renderRegisterDetailReport");
					break;
				case 5:
					reportController.send("renderRegisterSummaryReport");
					break;
				case 6:
					reportController.send("renderTerminalDetailReport");
					break;
				case 7:
					reportController.send("renderTerminalSummaryReport");
					break;
				case 8:
					reportController.send("renderTransactionLogReport");
					break;
				case 9:
					reportController.send("renderOpenTillReport");
					break;
				case 10:
					reportController.send("renderUserProfileReport");
					break;
				case 11:
					reportController.send("renderTillProfileReport");
					break;
				case 12:
					reportController.send("renderRegisterProfileReport");
					break;
				case 13:
					reportController.send("renderMiscMediaDetailReport");
					break;
				case 14:
					reportController.send("renderMiscMediaSummaryReport");
					break;
				case 15:
					reportController.send("renderBalanceSheetReport");
					break;
				case 16:
					reportController.send("renderGrandTotalByDateReport");
					break;
				case 17:
					reportController.send("renderDailyTotalsReport");
					break;
				case 18:
					reportController.send("renderNoteCountReport");
					break;
				case 19:
					reportController.send("renderMIMOBalanceReport");
					break;
				case 20:
					reportController.send("renderForcedNotesReport");
					break;
				case 21:
					reportController.send("renderCashSettingsReport");
					break;
				default:
					reportController.send("hideOptions");
					break;
			}

		},
		exportReportCSV: function(){
			var reportId = this.get("reportId");
			var reportName = this.get("reportName");

			var reportController = this;
			switch(reportId){
				case 1:
					reportController.send("exportGrandTotalReportCSV");
					break;
				case 2:
					reportController.send("exportUserDetailReportCSV");
					break;
				case 3:
					reportController.send("exportUserSummaryReportCSV");
					break;
				case 4:
					reportController.send("exportRegisterDetailReportCSV");
					break;
				case 5:
					reportController.send("exportRegisterSummaryReportCSV");
					break;
				case 6:
					reportController.send("exportTerminalDetailReportCSV");
					break;
				case 7:
					reportController.send("exportTerminalSummaryReportCSV");
					break;
				case 8:
					reportController.send("exportTransactionLogReportCSV");
					break;
				case 9:
					reportController.send("exportOpenTillReportCSV");
					break;
				case 10:
					reportController.send("exportUserProfileReportCSV");
					break;
				case 11:
					reportController.send("exportTillProfileReportCSV");
					break;
				case 12:
					reportController.send("exportRegisterProfileReportCSV");
					break;
				case 13:
					reportController.send("exportMiscMediaDetailReportCSV");
					break;
				case 14:
					reportController.send("exportMiscMediaSummaryReportCSV");
					break;
				case 15:
					reportController.send("exportBalanceSheetReportCSV");
					break;
				case 16:
					reportController.send("exportGrandTotalByDateReportCSV");
					break;
				case 17:
					reportController.send("exportDailyTotalsReportCSV");
					break;
				case 18:
					reportController.send("exportNoteCountReportCSV");
					break;
				case 19:
					reportController.send("exportMIMOBalanceReportCSV");
					break;
				case 20:
					reportController.send("exportForcedNotesReportCSV");
					break;
				case 21:
					reportController.send("exportCashSettingsReportCSV");
					break;
				default:
					reportController.send("hideOptions");
					break;
			}

		},
		showCashSettingsReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showForcedNotesReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showMIMOBalanceReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showNoteCountReportOptions: function(){
			$("#recyclerId").parent(".reportOption").removeClass("hidden");
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showDailyTotalsReportOptions: function(){
			$("#recyclerId").parent(".reportOption").removeClass("hidden");
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showGrandTotalByDateReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showBalanceSheetReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
		},
		showMiscMediaSummaryReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#userId").parent(".reportOption").removeClass("hidden");
		},
		showMiscMediaDetailReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#userId").parent(".reportOption").removeClass("hidden");
		},
		showRegisterProfileReportOptions: function(){
			$("#registerId").parent(".reportOption").removeClass("hidden");
		},
		showTillProfileReportOptions: function(){
			//$("#functionId").parent(".reportOption").removeClass("hidden");
			$("#transactionName").parent(".reportOption").removeClass("hidden");
			$("#userOrMachine").parent(".reportOption").removeClass("hidden");
		},
		showUserProfileReportOptions: function(){
			$("#userId").parent(".reportOption").removeClass("hidden");
			$("#userLevel").parent(".reportOption").removeClass("hidden");
		},
		showOpenTillReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#allDates").parent(".reportOption").removeClass("hidden");
		},
		showTransactionLogReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			//$("#userOrMachine").parent(".reportOption").removeClass("hidden");
			$("#recyclerId").parent(".reportOption").removeClass("hidden");
			//$("#recyclerId option[value=-1]").attr("disabled", false);
		},
		showTerminalSummaryReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#multiTerminalId").parent(".reportOption").removeClass("hidden");
		},
		showTerminalDetailReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			//$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#terminalId").parent(".reportOption").removeClass("hidden");
			//$("#registerId").parent(".reportOption").removeClass("hidden");
		},
		showRegisterSummaryReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#registerId").parent(".reportOption").removeClass("hidden");
		},
		showRegisterDetailReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			//$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#registerId").parent(".reportOption").removeClass("hidden");
		},
		showUserDetailReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			//$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#userId").parent(".reportOption").removeClass("hidden");
		},
		showUserSummaryReportOptions: function(){
			$("#startBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#endBusinessDate").parent(".reportOption").removeClass("hidden");
			$("#userId").parent(".reportOption").removeClass("hidden");
		},
		showGrandTotalReportOptions: function(){
			$("#recyclerId").parent(".reportOption").removeClass("hidden");
			$("#recyclerId").parent(".reportOption").removeClass("hidden");
			$("#recyclerId option[value=-1]").attr("disabled", "disabled");
			$("#recyclerId option[value=-1]").attr("selected", false);
			$("#recyclerId option[value=1]").attr("selected", "selected");
		},
		showReportName: function(reportName){
			//$("#reportName").html(reportName)
		},
		hideOptions: function(){
			$(".reportOption").each(function(){
				$(this).addClass("hidden");
			});
		},
		resetReportForm: function(){
			this.set("reportName", "");
			this.set("reportId", -1);
			this.send("showReportName", "Select Report");
			this.send("hideOptions");
		},
		clearReportData: function(){
			//$("#reportName").html("");
			$("#reportTableHeader").html("");
			$("#reportTableBody").html("");
		},
		updateGrandTotalReport: function(){
			var grandTotalAmount = 0.00;
			$('#reportTableBody').children("tr").each(function(){
				var parentElement = $(this).parent();
				//var meterTitleElement = parentElement.children(".meterTitle");
				var noteTypeIdList = $(this).data("notetypeids");
				var noteTypeIds = [];
	
				
				//console.log(noteTypeIdList);
				if(!isNaN(noteTypeIdList)){
					noteTypeIds.push(noteTypeIdList);
				}
				else{
					noteTypeIds = noteTypeIdList.split("|");
				}

				//console.log(parentElement);
				//console.log(meterTitleElement);

				var noteTypeGroupAmount = 0.00;
				var noteTypeGroupQuantity = 0;
				
				noteTypeIds.forEach(function(noteTypeId){
					//console.log(noteTypeId);

					var noteType = JSON.parse( $.ajax({
				        type: "POST",
				        url: "https://" + HOST + "/?controller=NoteTypeController&action=getById&id=" + noteTypeId + "&api_key=" + API_KEY,
				        data:{},
				        async: false
				    }).responseText );

					var recyclerInventoryList = JSON.parse( $.ajax({
				        type: "POST",
				        url: "https://" + HOST + "/?controller=RecyclerInventoryListController&action=getLastByNoteTypeId&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY,
				        data:{},
				        async: false
				    }).responseText );


				    //console.log("https://" + HOST + "/?controller=RecyclerConfigController&action=getByRecyclerAndNoteTypeId&recyclerId=" + terminalController.get("terminalId") + "&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY);

				    var recyclerConfig = JSON.parse( $.ajax({
				        type: "POST",
				        url: "https://" + HOST + "/?controller=RecyclerConfigController&action=getByRecyclerAndNoteTypeId&recyclerId=" + $("#recyclerId").val() + "&noteTypeId=" + noteTypeId + "&api_key=" + API_KEY,
				        data:{},
				        async: false
				    }).responseText );

				    if(recyclerConfig){
				    	noteTypeGroupAmount += parseFloat( recyclerInventoryList.amount );
						noteTypeGroupQuantity += parseInt( recyclerInventoryList.quantities );
				    }

					

		

				}); 


				//console.log("Group Total: " + noteTypeGroupQuantity);
				//console.log("Config Max: " + meterMaximum);
				//terminalController.send("updateMeter", $(this),	( (noteTypeGroupQuantity / meterMaximum) * 100 ) );
				$("#" + noteTypeIds.join('-')).children(".denominationCount").html(noteTypeGroupQuantity);
				$("#" + noteTypeIds.join('-')).children(".denominationAmount").html("$" + noteTypeGroupAmount.toFixed(2).toString());


				//meterTitleElement.html();

				//console.log(noteTypeIds);
				grandTotalAmount += noteTypeGroupAmount;
			});
			console.log("Grand Total: " + grandTotalAmount);
		},
		renderFunctionSelectionOptions: function(){
			var functionOptionsElement = $("#functionId");
			functionOptionsElement.html("");
			var optionsHTML = "<option value=\"-1\">ALL</option>";
			$.post("https://" + HOST + "/?controller=MIMOFunctionController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var functions = JSON.parse(response);
				functions.forEach(function(mimofunction){
					optionsHTML += "<option value=\"" + mimofunction.id + "\">" + mimofunction.name + "</option>";
				});
				functionOptionsElement.html(optionsHTML);
			});

		},
		renderTransactionNameSelectionOptions: function(){
			var transactionNameOptionsElement = $("#transactionName");
			transactionNameOptionsElement.html("");
			var transactions = [];
			var optionsHTML = "<option value=\"ALL\">ALL</option>";
			$.post("https://" + HOST + "/?controller=DispenseConfigController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var dispenses = JSON.parse(response);
				transactions = transactions.concat(dispenses);
				/*
				dispenses.forEach(function(dispense){
					optionsHTML += "<option value=\"" + dispense.name + "\">" + dispense.name + "</option>";
				});
				*/
				//transactionNameOptionsElement.html(optionsHTML);
				$.post("https://" + HOST + "/?controller=DepositConfigController&action=getAll&api_key=" + API_KEY, {}, function(response){
					var deposits = JSON.parse(response);
					transactions = transactions.concat(deposits);
					transactions.sort();
					
					
					transactions.forEach(function(transaction){
						optionsHTML += "<option value=\"" + transaction.name + "\">" + transaction.name + "</option>";
					});
					transactionNameOptionsElement.html(optionsHTML);
					
				});
			});

			

			

		},
		renderTerminalSelectionOptions: function(){
			var terminalOptionsElement = $("#terminalId");
			terminalOptionsElement.html("");
			var optionsHTML = "<option value=\"-1\">ALL</option>";
			$.post("https://" + HOST + "/?controller=TerminalController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var terminals = JSON.parse(response);
				terminals.forEach(function(terminal){
					optionsHTML += "<option value=\"" + terminal.id + "\">" + terminal.name + "</option>";
				});
				terminalOptionsElement.html(optionsHTML);
			});

		},
		renderMultiTerminalSelectionOptions: function(){
			var terminalOptionsElement = $("#multiTerminalId");
			terminalOptionsElement.html("");
			var optionsHTML = "";
			$.post("https://" + HOST + "/?controller=TerminalController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var terminals = JSON.parse(response);
				terminals.forEach(function(terminal){
					optionsHTML += "<option value=\"" + terminal.id + "\">" + terminal.name + "</option>";
				});
				terminalOptionsElement.html(optionsHTML);
			});

		},
		renderRegisterSelectionOptions: function(){
			var registerOptionsElement = $("#registerId");
			registerOptionsElement.html("");
			var optionsHTML = "<option value=\"-1\">ALL</option>";
			$.post("https://" + HOST + "/?controller=RegisterController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var registers = JSON.parse(response);
				registers.forEach(function(register){
					optionsHTML += "<option value=\"" + register.id + "\">" + register.name + "</option>";
				});
				registerOptionsElement.html(optionsHTML);
			});

		},
		renderRecyclerSelectionOptions: function(){
			var recyclerOptionsElement = $("#recyclerId");
			recyclerOptionsElement.html("");
			var optionsHTML = "<option value=\"-1\">ALL</option>";
			$.post("https://" + HOST + "/?controller=RecyclerController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var recyclers = JSON.parse(response);
				recyclers.forEach(function(recycler){
					optionsHTML += "<option value=\"" + recycler.id + "\">" + recycler.name + "</option>";
				});
				recyclerOptionsElement.html(optionsHTML);
			});

		},
		renderUserSelectionOptions: function(){
			var userOptionsElement = $("#userId");
			userOptionsElement.html("");
			var optionsHTML = "<option value=\"-1\">ALL</option>";
			$.post("https://" + HOST + "/?controller=UserController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var users = JSON.parse(response);
				users.forEach(function(user){
					optionsHTML += "<option value=\"" + user.id + "\">" + user.username + "</option>";
				});
				userOptionsElement.html(optionsHTML);
			});

		},
		exportBalanceSheetReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getBalanceSheetCSV&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderBalanceSheetReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getBalanceSheet&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>User ID</th><th>User Name</th><th>Dispense Amount</th><th>Deposit Amount</th><th>Total Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.UserId + "</td><td>" + result.UserName + "</td><td>" +  result.Dispense  + "</td><td>" + result.Deposit + "</td><td>" + result.StartBal + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportMiscMediaSummaryReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getMiscMediaSummaryCSV&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderMiscMediaSummaryReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getMiscMediaSummary&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>User ID</th><th>User Name</th><th>Register ID</th><th>Register Name</th><th>Business Date</th><th>Total Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.UserID + "</td><td>" + result.UserName + "</td><td>" + result.RegisterID + "</td><td>" + result.RegisterName + "</td><td>" + result.BusinessDate + "</td><td>" + parseFloat( result.MiscAmount ).toFixed(2).toString() + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportMiscMediaDetailReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getMiscMediaDetailCSV&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderMiscMediaDetailReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getMiscMediaDetail&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Transaction Name</th><th>Business Date</th><th>Date Time</th><th>Media Name</th><th>Quantity</th><th>Amount</th>/tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.TRANS_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE + "</td><td>" + result.UNIT_ID + "</td><td>" + result.QUANTITIES + "</td><td>" + result.AMOUNT + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportRegisterProfileReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getRegisterProfileCSV&registerId=" + $("#registerId").val() + "&api_key=" + API_KEY;
		},
		renderRegisterProfileReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getRegisterProfile&registerId=" + $("#registerId").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>Deposit Name</th><th>Dispense Name</th><th>Function List</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.RegisterID + "</td><td>" + result.RegisterName + "</td><td>" + result.DepositFunctions + "</td><td>" + result.DispenseFunctions + "</td><td>" + result.FunctionsList + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportTillProfileReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getTillProfileCSV&functionLevel=" + $("#userOrMachine").val() + "&transactionName=" + $("#transactionName").val() + "&api_key=" + API_KEY;
		},
		renderTillProfileReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getTillProfile&functionLevel=" + $("#userOrMachine").val() + "&transactionName=" + $("#transactionName").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Recycler Type</th><th>Transaction Name</th><th>Function Level</th><th>Transaction Type</th><th>Chained Transaction</th><th>Dispense By/Deposit Options Enabled</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + getRecyclerTypeDescription( result.CashRecyclerType ) + "</td><td>" + result.FunctionsName + "</td><td>" + getFunctionLevelDescription( result.FunctionLevel ) + "</td><td>" + getTransactionTypeDescription( result.FunctionType ) + "</td><td>" + result.ChainedTransaction + "</td><td>" + getDepositOptionDescription( result.DispenseByDepositOptionsEnabled ) + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportUserProfileReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getUserProfileCSV&userLevel=" + $("#userLevel").val() + "&userId=" + $("#userId").val() + "&api_key=" + API_KEY;
		},
		renderUserProfileReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getUserProfile&userLevel=" + $("#userLevel").val() + "&userId=" + $("#userId").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>User ID</th><th>User Name</th><th>User Level</th><th>Dispense Limit</th><th>Prompt For Business Date</th><th>Machine Operator</th><th>Mgr. Only Functions</th><th>Allow Trans. Reconciliation</th><th>Register ID</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + getUserLevelDescription( result.USER_LEVEL ) + "</td><td>" + result.DISPENSE_LIMIT + "</td><td>" + toHumanReadableBoolean( result.PROMPT_BUS_DATE ) + "</td><td>" + toHumanReadableBoolean( result.F_MACHINE_OPERATOR ) + "</td><td>" + toHumanReadableBoolean( result.F_MANAGER_ONLY ) + "</td><td>" + toHumanReadableBoolean( result.F_TRANS_RECONCILIATION ) + "</td><td>" + result.REGISTER_ID + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportOpenTillReportCSV: function(){
			var businessDateFilter = "";
			if( !$("#allDates").is(":checked") ){
				businessDateFilter += "&businessDate=" + $("#startBusinessDate").val();
			}

			window.location = "https://" + HOST + "/?controller=ReportController&action=getOpenTillCSV" + businessDateFilter + "&api_key=" + API_KEY;
		},
		renderOpenTillReport: function(){
			var businessDateFilter = "";
			if( !$("#allDates").is(":checked") ){
				businessDateFilter += "&businessDate=" + $("#startBusinessDate").val();
			}
			$.post("https://" + HOST + "/?controller=ReportController&action=getOpenTill" + businessDateFilter + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>User Session ID</th><th>User ID</th><th>User Name</th><th>Register ID</th><th>Register Name</th><th>Business Date</th><th>Status</th><th>Initial Transaction Time</th><th>Last Transaction Time<th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.USER_SESSION_ID + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>OPEN</td><td>" + result.INITIAL_TRANSACTION_DATE + "</td><td>" + result.LAST_TRANSACTION_DATE + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
				
			});
		},
		exportTransactionLogReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getTransactionLogCSV&userOrMachine=" + $("#userOrMachine").val() + "&recyclerId=" + $("#recyclerId").val() + "&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		exportMIMOBalanceReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getMIMOBalanceCSV&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderMIMOBalanceReport: function(){
			$("#reportTableBody").html("<tr class=\"success text-center\"><td colspan=99>Loading...(This may take a few minutes)...</td></tr>");

			$.post("https://" + HOST + "/?controller=ReportController&action=getMIMOBalance&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					//$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>User Session ID</th><th>Business Date</th><th>Session Status</th><th>Dispense Amount</th><th>Deposit Amount</th><th>Total</th><th>Dispense 1¢</th><th>Dispense 5¢</th><th>Dispense 10¢</th><th>Dispense 25¢</th><th>Dispense 50¢</th><th>Dispense 100¢</th><th>Dispense $1</th><th>Dispense $2</th><th>Dispense $5</th><th>Dispense $10</th><th>Dispense $20</th><th>Dispense $50</th><th>Dispense $100</th><th>Deposit 1¢</th><th>Deposit 5¢</th><th>Deposit 10¢</th><th>Deposit 25¢</th><th>Deposit 50¢</th><th>Deposit 100¢</th><th>Deposit $1</th><th>Deposit $2</th><th>Deposit $5</th><th>Deposit $10</th><th>Deposit $20</th><th>Deposit $50</th><th>Deposit $100</th><th>Net 1¢</th><th>Net 5¢</th><th>Net 10¢</th><th>Net 25¢</th><th>Net 50¢</th><th>Net 100¢</th><th>Net $1</th><th>Net $2</th><th>Net $5</th><th>Net $10</th><th>Net $20</th><th>Net $50</th><th>Net $100</th></tr>");
					$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Business Date</th><th>Session Status</th><th>Dispense Amount</th><th>Deposit Amount</th><th>Net Total</th></tr>");
					var resultHTML = "";
					var currentDepartmentId = -1;
					var currentDepartmentDepositTotal = 0.00;
					var currentDepartmentDispenseTotal = 0.00;
					var currentDepartmentNetTotal = 0.00;
					var grandTotalAmount = 0.00;
					var depositGrandTotalAmount = 0.00;
					var dispenseGrandTotalAmount = 0.00;
			
					results.forEach(function(result){

						var sortedDispenseNotes = sortNotesByValue(result.DISPENSE_NOTES_EFFECTED);
						var sortedNetNotes = sortNotesByValue(result.NOTES_EFFECTED);
						var sortedDepositNotes = sortNotesByValue(result.DEPOSIT_NOTES_EFFECTED);

						grandTotalAmount += parseFloat(result.DEPOSIT_AMOUNT);
						grandTotalAmount += parseFloat(result.DISPENSE_AMOUNT);

						depositGrandTotalAmount += parseFloat(result.DEPOSIT_AMOUNT);
						dispenseGrandTotalAmount += parseFloat(result.DISPENSE_AMOUNT);




						if( currentDepartmentId != result.REGISTER_ID ){
							if(currentDepartmentId != -1){
								//write row with totals
								
								//var totalAmount = parseFloat( currentDepartmentDispenseTotal + currentDepartmentDepositTotal ).toFixed(2);
								resultHTML += "<tr><th colspan=3>Department Dispense Amount: " + parseFloat( currentDepartmentDispenseTotal ).toFixed(2).toString() + " </th><th colspan=3>Department Deposit Amount: " + parseFloat( currentDepartmentDepositTotal ).toFixed(2).toString() + "</th><th colspan=100>Department Total Amount: " + parseFloat( currentDepartmentNetTotal ).toFixed(2).toString()  + "</th></tr>";
								//resultHTML += "<tr class=\"success\"><td colspan=42>" + parseFloat( currentDepartmentDispenseTotal ).toFixed(2).toString() + "</td><td>" + parseFloat( currentDepartmentDepositTotal ).toFixed(2).toString() + "</td><td>" + parseFloat( currentDepartmentDispenseTotal + currentDepartmentDepositTotal ).toFixed(2).toString() + "</td></tr>";
								
							}
							currentDepartmentNetTotal = 0.00;
							currentDepartmentDepositTotal = 0.00;
							currentDepartmentDispenseTotal = 0.00;
							currentDepartmentId = result.REGISTER_ID;

							currentDepartmentDepositTotal += parseFloat(result.DEPOSIT_AMOUNT);
							currentDepartmentDispenseTotal += parseFloat(result.DISPENSE_AMOUNT);

							currentDepartmentNetTotal += parseFloat(result.AMOUNT);

						}
						else{
							currentDepartmentDepositTotal += parseFloat(result.DEPOSIT_AMOUNT);
							currentDepartmentDispenseTotal += parseFloat(result.DISPENSE_AMOUNT);

							currentDepartmentNetTotal += parseFloat(result.AMOUNT);
						}

						
						/*
						var noteDataSets = result.NOTES_EFFECTED.split("|");
						var notes = [];
						noteDataSets.forEach(function(noteDataSet){
							var noteDataSetParts = noteDataSet.split(":");
							var note = new Object();
							note.value = noteDataSetParts[0].trim();
							note.exponentValue = noteDataSetParts[1].trim();
							note.count = noteDataSetParts[2].trim();
							notes[note.value + "|" + note.exponentValue] = note;
						});
						*/
						

						//resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.USER_SESSION_ID + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.SESSION_STATUS + "</td><td>" + result.DISPENSE_AMOUNT + "</td><td>" + result.DEPOSIT_AMOUNT + "</td><td>" + ( (result.AMOUNT != null) ?  result.AMOUNT : 0 ) + "</td><td>" + ((sortedDispenseNotes["0.01|0.01"] != null) ? sortedDispenseNotes["0.01|0.01"].count : 0) + "</td><td>" + ((sortedDispenseNotes["0.05|0.01"] != null) ? sortedDispenseNotes["0.05|0.01"].count : 0) + "</td><td>" + ((sortedDispenseNotes["0.10|0.01"] != null) ? sortedDispenseNotes["0.10|0.01"].count : 0) + "</td><td>" + ((sortedDispenseNotes["0.25|0.01"] != null) ? sortedDispenseNotes["0.25|0.01"].count : 0) + "</td><td>" + ((sortedDispenseNotes["0.50|0.01"] != null) ? sortedDispenseNotes["0.50|0.01"].count : 0) + "</td><td>" + ((sortedDispenseNotes["1.00|0.01"] != null) ? sortedDispenseNotes["1.00|0.01"].count : 0)  + "</td><td>" + ((sortedDispenseNotes["1.00|1.00"] != null) ? sortedDispenseNotes["1.00|1.00"].count : 0) + "</td><td>" + ((sortedDispenseNotes["2.00|1.00"] != null) ? sortedDispenseNotes["2.00|1.00"].count : 0) + "</td><td>" + ((sortedDispenseNotes["5.00|1.00"] != null) ? sortedDispenseNotes["5.00|1.00"].count : 0) + "</td><td>" + ((sortedDispenseNotes["10.00|1.00"] != null) ? sortedDispenseNotes["10.00|1.00"].count : 0) + "</td><td>" + ((sortedDispenseNotes["20.00|1.00"] != null) ? sortedDispenseNotes["20.00|1.00"].count : 0) + "</td><td>" + ((sortedDispenseNotes["50.00|1.00"] != null) ? sortedDispenseNotes["50.00|1.00"].count : 0) + "</td><td>" + ((sortedDispenseNotes["100.00|1.00"] != null) ? sortedDispenseNotes["100.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["0.01|0.01"] != null) ? sortedDepositNotes["0.01|0.01"].count : 0) + "</td><td>" + ((sortedDepositNotes["0.05|0.01"] != null) ? sortedDepositNotes["0.05|0.01"].count : 0) + "</td><td>" + ((sortedDepositNotes["0.10|0.01"] != null) ? sortedDepositNotes["0.10|0.01"].count : 0) + "</td><td>" + ((sortedDepositNotes["0.25|0.01"] != null) ? sortedDepositNotes["0.25|0.01"].count : 0) + "</td><td>" + ((sortedDepositNotes["0.50|0.01"] != null) ? sortedDepositNotes["0.50|0.01"].count : 0) + "</td><td>" + ((sortedDepositNotes["1.00|0.01"] != null) ? sortedDepositNotes["1.00|0.01"].count : 0)  + "</td><td>" + ((sortedDepositNotes["1.00|1.00"] != null) ? sortedDepositNotes["1.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["2.00|1.00"] != null) ? sortedDepositNotes["2.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["5.00|1.00"] != null) ? sortedDepositNotes["5.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["10.00|1.00"] != null) ? sortedDepositNotes["10.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["20.00|1.00"] != null) ? sortedDepositNotes["20.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["50.00|1.00"] != null) ? sortedDepositNotes["50.00|1.00"].count : 0) + "</td><td>" + ((sortedDepositNotes["100.00|1.00"] != null) ? sortedDepositNotes["100.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["0.01|0.01"] != null) ? sortedNetNotes["0.01|0.01"].count : 0) + "</td><td>" + ((sortedNetNotes["0.05|0.01"] != null) ? sortedNetNotes["0.05|0.01"].count : 0) + "</td><td>" + ((sortedNetNotes["0.10|0.01"] != null) ? sortedNetNotes["0.10|0.01"].count : 0) + "</td><td>" + ((sortedNetNotes["0.25|0.01"] != null) ? sortedNetNotes["0.25|0.01"].count : 0) + "</td><td>" + ((sortedNetNotes["0.50|0.01"] != null) ? sortedNetNotes["0.50|0.01"].count : 0) + "</td><td>" + ((sortedNetNotes["1.00|0.01"] != null) ? sortedNetNotes["1.00|0.01"].count : 0)  + "</td><td>" + ((sortedNetNotes["1.00|1.00"] != null) ? sortedNetNotes["1.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["2.00|1.00"] != null) ? sortedNetNotes["2.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["5.00|1.00"] != null) ? sortedNetNotes["5.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["10.00|1.00"] != null) ? sortedNetNotes["10.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["20.00|1.00"] != null) ? sortedNetNotes["20.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["50.00|1.00"] != null) ? sortedNetNotes["50.00|1.00"].count : 0) + "</td><td>" + ((sortedNetNotes["100.00|1.00"] != null) ? sortedNetNotes["100.00|1.00"].count : 0) + "</td></tr>";

						resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.SESSION_STATUS + "</td><td>" + result.DISPENSE_AMOUNT + "</td><td>" + result.DEPOSIT_AMOUNT + "</td><td>" + ( (result.AMOUNT != null) ?  result.AMOUNT : 0 ) + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"userTransactionReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";

						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Dispense </th> <th> Deposit </th> <th> Net </th> </tr> <tr> <td> 1¢ </td> <td>" + ((sortedDispenseNotes["0.01|0.01"] != null) ? sortedDispenseNotes["0.01|0.01"].count : 0) + "</td> <td>" + ((sortedDepositNotes["0.01|0.01"] != null) ? sortedDepositNotes["0.01|0.01"].count : 0) + "</td> <td>" + ((sortedNetNotes["0.01|0.01"] != null) ? sortedNetNotes["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((sortedDispenseNotes["0.05|0.01"] != null) ? sortedDispenseNotes["0.05|0.01"].count : 0) + "</td> <td>" + ((sortedDepositNotes["0.05|0.01"] != null) ? sortedDepositNotes["0.05|0.01"].count : 0) + "</td> <td>" + ((sortedNetNotes["0.05|0.01"] != null) ? sortedNetNotes["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((sortedDispenseNotes["0.10|0.01"] != null) ? sortedDispenseNotes["0.10|0.01"].count : 0) + "</td> <td>" + ((sortedDepositNotes["0.10|0.01"] != null) ? sortedDepositNotes["0.10|0.01"].count : 0) + "</td> <td>" + ((sortedNetNotes["0.10|0.01"] != null) ? sortedNetNotes["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((sortedDispenseNotes["0.25|0.01"] != null) ? sortedDispenseNotes["0.25|0.01"].count : 0) + "</td> <td>" + ((sortedDepositNotes["0.25|0.01"] != null) ? sortedDepositNotes["0.25|0.01"].count : 0) + "</td> <td>" + ((sortedNetNotes["0.25|0.01"] != null) ? sortedNetNotes["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((sortedDispenseNotes["0.50|0.01"] != null) ? sortedDispenseNotes["0.50|0.01"].count : 0) + "</td> <td>" + ((sortedDepositNotes["0.50|0.01"] != null) ? sortedDepositNotes["0.50|0.01"].count : 0) + "</td> <td>" + ((sortedNetNotes["0.50|0.01"] != null) ? sortedNetNotes["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((sortedDispenseNotes["1.00|0.01"] != null) ? sortedDispenseNotes["1.00|0.01"].count : 0) + "</td> <td>" + ((sortedDepositNotes["1.00|0.01"] != null) ? sortedDepositNotes["1.00|0.01"].count : 0) + "</td> <td>" + ((sortedNetNotes["1.00|0.01"] != null) ? sortedNetNotes["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((sortedDispenseNotes["1.00|1.00"] != null) ? sortedDispenseNotes["1.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["1.00|1.00"] != null) ? sortedDepositNotes["1.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["1.00|1.00"] != null) ? sortedNetNotes["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((sortedDispenseNotes["2.00|1.00"] != null) ? sortedDispenseNotes["2.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["2.00|1.00"] != null) ? sortedDepositNotes["2.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["2.00|1.00"] != null) ? sortedNetNotes["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((sortedDispenseNotes["5.00|1.00"] != null) ? sortedDispenseNotes["5.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["5.00|1.00"] != null) ? sortedDepositNotes["5.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["5.00|1.00"] != null) ? sortedNetNotes["5.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $10 </td> <td>" + ((sortedDispenseNotes["10.00|1.00"] != null) ? sortedDispenseNotes["10.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["10.00|1.00"] != null) ? sortedDepositNotes["10.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["10.00|1.00"] != null) ? sortedNetNotes["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((sortedDispenseNotes["20.00|1.00"] != null) ? sortedDispenseNotes["20.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["20.00|1.00"] != null) ? sortedDepositNotes["20.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["20.00|1.00"] != null) ? sortedNetNotes["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((sortedDispenseNotes["50.00|1.00"] != null) ? sortedDispenseNotes["50.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["50.00|1.00"] != null) ? sortedDepositNotes["50.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["50.00|1.00"] != null) ? sortedNetNotes["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((sortedDispenseNotes["100.00|1.00"] != null) ? sortedDispenseNotes["100.00|1.00"].count : 0) + "</td> <td>" + ((sortedDepositNotes["100.00|1.00"] != null) ? sortedDepositNotes["100.00|1.00"].count : 0) + "</td> <td>" + ((sortedNetNotes["100.00|1.00"] != null) ? sortedNetNotes["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";
					});

					resultHTML += "<tr><th colspan=3>Department Dispense Amount: " + parseFloat( currentDepartmentDispenseTotal ).toFixed(2).toString() + " </th><th colspan=3>Department Deposit Amount: " + parseFloat( currentDepartmentDepositTotal ).toFixed(2).toString() + "</th><th colspan=100>Department Total Amount: " + parseFloat( currentDepartmentNetTotal ).toFixed(2).toString()  + "</th></tr>";


					resultHTML += "<tr><th colspan=3>Dispense Grand Total Amount: " + parseFloat( dispenseGrandTotalAmount ).toFixed(2).toString() + " </th><th colspan=3>Deposit Grand Total Amount: " + parseFloat( depositGrandTotalAmount ).toFixed(2).toString() + "</th><th colspan=100>Net Grand Total Amount: " + parseFloat( grandTotalAmount ).toFixed(2).toString()  + "</th></tr>";

					//resultHTML += "<tr><th colspan=11 class=\"text-center\">Grand Total Amount: " + grandTotalAmount.toFixed(2).toString() + " </th></tr>";
					
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		renderTransactionLogReport: function(){
			$("#reportTableBody").html("<tr class=\"success text-center\"><td colspan=99>Loading...(This may take a few minutes)...</td></tr>");

			$.post("https://" + HOST + "/?controller=ReportController&action=getTransactionLog&userOrMachine=" + $("#userOrMachine").val() + "&recyclerId=" + $("#recyclerId").val() + "&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>User ID</th><th>User Name</th><th>Register Name</th><th>Recycler Name</th><th>Function Level</th><th>Business Date</th><th>Date Time</th><th>Transaction Name</th><th>Transaction Status</th><th>Transaction Details</th><th>Proxy User</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						/*
						var noteDataSets = result.NOTES_EFFECTED.split("|");
						var notes = [];
						noteDataSets.forEach(function(noteDataSet){
							var noteDataSetParts = noteDataSet.split(":");
							var note = new Object();
							note.value = noteDataSetParts[0].trim();
							note.exponentValue = noteDataSetParts[1].trim();
							note.count = noteDataSetParts[2].trim();
							notes[note.value + "|" + note.exponentValue] = note;
						});
						*/

						notes = result.NOTES_EFFECTED;



						//resultHTML += "<tr class=\"success\"><td>" + result.UserID + "</td><td>" + result.UserName + "</td><td>" + result.RegisterName + "</td><td>" + result.RecyclerName + "</td><td>" + getFunctionLevelDescription( result.FunctionLevel ) + "</td><td>" + result.BusinessDate.date + "</td><td>" + result.DateTime.date + "</td><td>" + result.TransactionName + "</td><td>" + parseFloat( result.TransactionDetails ).toFixed(2).toString() + "</td><td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td><td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td><td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td><td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td><td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td><td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0)  + "</td><td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td><td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td><td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td><td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td><td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td><td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td><td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td></tr>";

						resultHTML += "<tr class=\"success\"><td>" + result.UserID + "</td><td>" + result.UserName + "</td><td>" + result.RegisterName + "</td><td>" + result.RecyclerName + "</td><td>" + result.FunctionLevel  + "</td><td>" + result.BusinessDate + "</td><td>" + result.DateTime + "</td><td>" + result.TransactionName + "</td><td>" + result.TRANS_STATUS + "</td><td>" + parseFloat( result.TransactionDetails ).toFixed(2).toString() + "</td><td>" + ( (result.PROXY_USER != null) ? result.PROXY_USER : "" )  + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"userTransactionReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";
						
						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Count </th> </tr> <tr> <td> 1¢ </td> <td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td></tr> <tr> <td> $10 </td> <td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";

					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportForcedNotesReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getForcedNotesCSV&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderForcedNotesReport: function(){
			//$("#reportTableBody").html("<tr class=\"success text-center\"><td colspan=99>Loading...(This may take a few minutes)...</td></tr>");

			$.post("https://" + HOST + "/?controller=ReportController&action=getForcedNotes&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					//$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Transaction ID</th><th>Transaction Name</th><th>Business Date</th><th>Date Created</th><th>Amount</th><th>1¢</th><th>5¢</th><th>10¢</th><th>25¢</th><th>50¢</th><th>100¢</th><th>$1</th><th>$2</th><th>$5</th><th>$10</th><th>$20</th><th>$50</th><th>$100</th></tr>");
					$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Transaction ID</th><th>Transaction Name</th><th>Business Date</th><th>Date Created</th><th>Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						var notes = result.NOTES_EFFECTED;
						//resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.TRANS_ID + "</td><td>" + result.TRANS_TYPE_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE.date + "</td><td>" + result.AMOUNT + "</td><td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td><td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td><td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td><td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td><td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td><td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0)  + "</td><td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td><td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td><td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td><td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td><td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td><td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td><td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td></tr>";
						resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.TRANS_ID + "</td><td>" + result.TRANS_TYPE_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE.date + "</td><td>" + result.AMOUNT + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"forcedNoteReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";
						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Count </th> </tr> <tr> <td> 1¢ </td> <td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td></tr> <tr> <td> $10 </td> <td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";

					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportCashSettingsReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getCashSettingsCSV&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderCashSettingsReport: function(){
			//$("#reportTableBody").html("<tr class=\"success text-center\"><td colspan=99>Loading...(This may take a few minutes)...</td></tr>");

			$.post("https://" + HOST + "/?controller=ReportController&action=getCashSettings&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					//$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Transaction ID</th><th>Transaction Name</th><th>Business Date</th><th>Date Created</th><th>Previous Summary Amount</th><th>Adjusted Summary Amount</th><th>Summary Amount</th><th>Previous 1¢</th><th>Previous 5¢</th><th>Previous 10¢</th><th>Previous 25¢</th><th>Previous 50¢</th><th>Previous 100¢</th><th>Previous $1</th><th>Previous $2</th><th>Previous $5</th><th>Previous $10</th><th>Previous $20</th><th>Previous $50</th><th>Previous $100</th><th>Adjusted 1¢</th><th>Adjusted 5¢</th><th>Adjusted 10¢</th><th>Adjusted 25¢</th><th>Adjusted 50¢</th><th>Adjusted 100¢</th><th>Adjusted $1</th><th>Adjusted $2</th><th>Adjusted $5</th><th>Adjusted $10</th><th>Adjusted $20</th><th>Adjusted $50</th><th>Adjusted $100</th><th>Final 1¢</th><th>Final 5¢</th><th>Final 10¢</th><th>Final 25¢</th><th>Final 50¢</th><th>Final 100¢</th><th>Final $1</th><th>Final $2</th><th>Final $5</th><th>Final $10</th><th>Final $20</th><th>Final $50</th><th>Final $100</th></tr>");
					$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Transaction ID</th><th>Transaction Name</th><th>Business Date</th><th>Date Created</th><th>Previous Summary Amount</th><th>Adjusted Summary Amount</th><th>Summary Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						//resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.TRANS_ID + "</td><td>" + result.TRANS_TYPE_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE.date + "</td><td>" + result.PRIOR_AMOUNT + "</td><td>" + result.NET_AMOUNT + "</td><td>" + result.AMOUNT + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["0.01|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.01|0.01"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["0.05|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.05|0.01"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["0.10|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.10|0.01"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["0.25|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.25|0.01"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["0.50|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.50|0.01"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["1.00|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["1.00|0.01"].count : 0)  + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["1.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["1.00|1.00"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["2.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["2.00|1.00"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["5.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["5.00|1.00"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["10.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["10.00|1.00"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["20.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["20.00|1.00"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["50.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["50.00|1.00"].count : 0) + "</td><td>" + ((result.PRIOR_NOTE_LEVELS["100.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["100.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["0.01|0.01"] != null) ? result.NET_NOTE_LEVELS["0.01|0.01"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["0.05|0.01"] != null) ? result.NET_NOTE_LEVELS["0.05|0.01"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["0.10|0.01"] != null) ? result.NET_NOTE_LEVELS["0.10|0.01"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["0.25|0.01"] != null) ? result.NET_NOTE_LEVELS["0.25|0.01"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["0.50|0.01"] != null) ? result.NET_NOTE_LEVELS["0.50|0.01"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["1.00|0.01"] != null) ? result.NET_NOTE_LEVELS["1.00|0.01"].count : 0)  + "</td><td>" + ((result.NET_NOTE_LEVELS["1.00|1.00"] != null) ? result.NET_NOTE_LEVELS["1.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["2.00|1.00"] != null) ? result.NET_NOTE_LEVELS["2.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["5.00|1.00"] != null) ? result.NET_NOTE_LEVELS["5.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["10.00|1.00"] != null) ? result.NET_NOTE_LEVELS["10.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["20.00|1.00"] != null) ? result.NET_NOTE_LEVELS["20.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["50.00|1.00"] != null) ? result.NET_NOTE_LEVELS["50.00|1.00"].count : 0) + "</td><td>" + ((result.NET_NOTE_LEVELS["100.00|1.00"] != null) ? result.NET_NOTE_LEVELS["100.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["0.01|0.01"] != null) ? result.NOTE_LEVELS["0.01|0.01"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["0.05|0.01"] != null) ? result.NOTE_LEVELS["0.05|0.01"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["0.10|0.01"] != null) ? result.NOTE_LEVELS["0.10|0.01"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["0.25|0.01"] != null) ? result.NOTE_LEVELS["0.25|0.01"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["0.50|0.01"] != null) ? result.NOTE_LEVELS["0.50|0.01"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["1.00|0.01"] != null) ? result.NOTE_LEVELS["1.00|0.01"].count : 0)  + "</td><td>" + ((result.NOTE_LEVELS["1.00|1.00"] != null) ? result.NOTE_LEVELS["1.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["2.00|1.00"] != null) ? result.NOTE_LEVELS["2.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["5.00|1.00"] != null) ? result.NOTE_LEVELS["5.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["10.00|1.00"] != null) ? result.NOTE_LEVELS["10.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["20.00|1.00"] != null) ? result.NOTE_LEVELS["20.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["50.00|1.00"] != null) ? result.NOTE_LEVELS["50.00|1.00"].count : 0) + "</td><td>" + ((result.NOTE_LEVELS["100.00|1.00"] != null) ? result.NOTE_LEVELS["100.00|1.00"].count : 0) + "</td></tr>";
						resultHTML += "<tr class=\"success\"><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.TRANS_ID + "</td><td>" + result.TRANS_TYPE_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE.date + "</td><td>" + result.PRIOR_AMOUNT + "</td><td>" + result.NET_AMOUNT + "</td><td>" + result.AMOUNT + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"recyclerTransactionReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";
						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Before </th> <th> After </th> <th> Net </th> </tr> <tr> <td> 1¢ </td> <td>" + ((result.PRIOR_NOTE_LEVELS["0.01|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.01|0.01"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["0.01|0.01"] != null) ? result.NOTE_LEVELS["0.01|0.01"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["0.01|0.01"] != null) ? result.NET_NOTE_LEVELS["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((result.PRIOR_NOTE_LEVELS["0.05|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.05|0.01"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["0.05|0.01"] != null) ? result.NOTE_LEVELS["0.05|0.01"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["0.05|0.01"] != null) ? result.NET_NOTE_LEVELS["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((result.PRIOR_NOTE_LEVELS["0.10|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.10|0.01"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["0.10|0.01"] != null) ? result.NOTE_LEVELS["0.10|0.01"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["0.10|0.01"] != null) ? result.NET_NOTE_LEVELS["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((result.PRIOR_NOTE_LEVELS["0.25|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.25|0.01"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["0.25|0.01"] != null) ? result.NOTE_LEVELS["0.25|0.01"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["0.25|0.01"] != null) ? result.NET_NOTE_LEVELS["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((result.PRIOR_NOTE_LEVELS["0.50|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["0.50|0.01"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["0.50|0.01"] != null) ? result.NOTE_LEVELS["0.50|0.01"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["0.50|0.01"] != null) ? result.NET_NOTE_LEVELS["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((result.PRIOR_NOTE_LEVELS["1.00|0.01"] != null) ? result.PRIOR_NOTE_LEVELS["1.00|0.01"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["1.00|0.01"] != null) ? result.NOTE_LEVELS["1.00|0.01"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["1.00|0.01"] != null) ? result.NET_NOTE_LEVELS["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["1.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["1.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["1.00|1.00"] != null) ? result.NOTE_LEVELS["1.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["1.00|1.00"] != null) ? result.NET_NOTE_LEVELS["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["2.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["2.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["2.00|1.00"] != null) ? result.NOTE_LEVELS["2.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["2.00|1.00"] != null) ? result.NET_NOTE_LEVELS["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["5.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["5.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["5.00|1.00"] != null) ? result.NOTE_LEVELS["5.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["5.00|1.00"] != null) ? result.NET_NOTE_LEVELS["5.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $10 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["10.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["10.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["10.00|1.00"] != null) ? result.NOTE_LEVELS["10.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["10.00|1.00"] != null) ? result.NET_NOTE_LEVELS["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["20.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["20.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["20.00|1.00"] != null) ? result.NOTE_LEVELS["20.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["20.00|1.00"] != null) ? result.NET_NOTE_LEVELS["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["50.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["50.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["50.00|1.00"] != null) ? result.NOTE_LEVELS["50.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["50.00|1.00"] != null) ? result.NET_NOTE_LEVELS["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((result.PRIOR_NOTE_LEVELS["100.00|1.00"] != null) ? result.PRIOR_NOTE_LEVELS["100.00|1.00"].count : 0) + "</td> <td>" + ((result.NOTE_LEVELS["100.00|1.00"] != null) ? result.NOTE_LEVELS["100.00|1.00"].count : 0) + "</td> <td>" + ((result.NET_NOTE_LEVELS["100.00|1.00"] != null) ? result.NET_NOTE_LEVELS["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportTerminalSummaryReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getTerminalSummaryCSV&terminalIDList=" + encodeURIComponent( JSON.stringify( $("#multiTerminalId").val() ) ) + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderTerminalSummaryReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getTerminalSummary&terminalIDList=" + encodeURIComponent( JSON.stringify( $("#multiTerminalId").val() ) ) + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var grandTotalAmount = 0.00;
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Terminal ID</th><th>Terminal Name</th><th>Dispense Amount</th><th>Deposit Amount</th><th>Total Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.TerminalID + "</td><td>" + result.TerminalName + "</td><td>" + parseFloat( result.DispenseAmount ).toFixed(2).toString() + "</td><td>" + parseFloat( result.DepositAmount ).toFixed(2).toString() + "</td><td>" + parseFloat( result.TotalAmount ).toFixed(2).toString() + "</td></tr>";
						grandTotalAmount += result.TotalAmount;
					});

					resultHTML += "<tr><th colspan=11 class=\"text-center\">Grand Total Amount: " + parseFloat( grandTotalAmount ).toFixed(2).toString() + " </th></tr>";
					//resultHTML += "<tr class=\"success\"><td colspan=3>Total</td><td>" + parseFloat( grandTotalAmount ).toFixed(2).toString() + "</td></tr>";
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportTerminalDetailReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getTerminalDetailCSV&terminalId=" + $("#terminalId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderTerminalDetailReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getTerminalDetail&terminalId=" + $("#terminalId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Terminal ID</th><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Business Date</th><th>Date Time</th><th>Transaction Name</th><th>Transaction Status</th><th>Proxy User</th><th>Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						var notes = result.NOTES_EFFECTED;

						resultHTML += "<tr class=\"success\"><td>" + result.TERMINAL_ID + "</td><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE + "</td><td>" + result.TRANS_NAME + "</td><td>" + getTransactionStatusDescription( result.TRANS_STATUS ) + "</td><td>" + result.PROXY_USER + "</td><td>" + parseFloat( result.AMOUNT ).toFixed(2).toString() + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"userDetailReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";
						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Count </th> </tr> <tr> <td> 1¢ </td> <td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td></tr> <tr> <td> $10 </td> <td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
				/*
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Terminal ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Business Date</th><th>Date Time</th><th>Transaction Name</th><th>Transaction Status</th><th>Transaction Details</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.TerminalID + "</td><td>" + result.RegisterName + "</td><td>" + result.UserID + "</td><td>" + result.UserName + "</td><td>" + result.BusinessDate + "</td><td>" + result.DateTime.date + "</td><td>" + result.TransactionName + "</td><td>" + getTransactionStatusDescription( result.TransactionStatus ) + "</td><td>" + parseFloat( result.TransactionDetails ).toFixed(2).toString() + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}*/
			});
		},
		exportRegisterSummaryReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getRegisterSummaryCSV&registerId=" + $("#registerId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderRegisterSummaryReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getRegisterSummary&registerId=" + $("#registerId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Register ID</th><th>Register Name</th><th>Business Date</th><th>Dispense Amount</th><th>Deposit Amount</th><th>Total Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.RegisterID + "</td><td>" + result.RegisterName + "</td><td>" + result.BusinessDate + "</td><td>" + parseFloat( result.DispenseAmount ).toFixed(2).toString() + "</td><td>" + parseFloat( result.DepositAmount ).toFixed(2).toString() + "</td><td>" + parseFloat( result.TotalAmount ).toFixed(2).toString() + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		
		exportNoteCountReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getNoteCountCSV&recyclerId=" + $("#recyclerId").val() + "&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		exportDailyTotalsReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getDailyTotalsCSV&recyclerId=" + $("#recyclerId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderNoteCountReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getNoteCount&recyclerId=" + $("#recyclerId").val() + "&businessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					console.log(results);
					$("#reportTableHeader").html("<tr><th>Deposit Count</th><th>Dispense Count</th><th>Total</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + ( (result.deposit_count != null) ?  result.deposit_count : 0 ) + "</td><td>" + ( (result.dispense_count != null) ?  result.dispense_count : 0 ) + "</td><td>" + ( (result.total != null) ?  result.total : 0 ) + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		renderDailyTotalsReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getDailyTotals&recyclerId=" + $("#recyclerId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Note</th><th>Deposit Count</th><th>Dispense Count</th><th>Difference</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + ( (result.EXPONENT_VALUE == "1.00") ? "$" : "" ) + ( (result.EXPONENT_VALUE == ".01") ? ( (result.note * 100) + "¢" )  : result.note ) + "</td><td>" + result.deposit_count + "</td><td>" + result.dispense_count + "</td><td>" + result.difference + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportRegisterDetailReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getRegisterDetailCSV&registerId=" + $("#registerId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderRegisterDetailReport: function(){
			$("#reportTableBody").html("<tr class=\"success text-center\"><td colspan=99>Loading...(This may take a few minutes)...</td></tr>");

			$.post("https://" + HOST + "/?controller=ReportController&action=getRegisterDetail&registerId=" + $("#registerId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Terminal ID</th><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Business Date</th><th>Date Time</th><th>Transaction Name</th><th>Transaction Status</th><th>Proxy User</th><th>Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						var notes = result.NOTES_EFFECTED;

						resultHTML += "<tr class=\"success\"><td>" + result.TERMINAL_ID + "</td><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE + "</td><td>" + result.TRANS_NAME + "</td><td>" + getTransactionStatusDescription( result.TRANS_STATUS ) + "</td><td>" + result.PROXY_USER + "</td><td>" + parseFloat( result.AMOUNT ).toFixed(2).toString() + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"userDetailReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";
						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Count </th> </tr> <tr> <td> 1¢ </td> <td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td></tr> <tr> <td> $10 </td> <td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportUserDetailReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getUserDetailCSV&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderUserDetailReport: function(){
			$("#reportTableBody").html("<tr class=\"success text-center\"><td colspan=99>Loading...(This may take a few minutes)...</td></tr>");

			$.post("https://" + HOST + "/?controller=ReportController&action=getUserDetail&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Terminal ID</th><th>Register ID</th><th>Register Name</th><th>User ID</th><th>User Name</th><th>Business Date</th><th>Date Time</th><th>Transaction Name</th><th>Transaction Status</th><th>Proxy User</th><th>Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						var notes = result.NOTES_EFFECTED;

						resultHTML += "<tr class=\"success\"><td>" + result.TERMINAL_ID + "</td><td>" + result.REGISTER_ID + "</td><td>" + result.REGISTER_NAME + "</td><td>" + result.USER_ID + "</td><td>" + result.USER_NAME + "</td><td>" + result.START_BUS_DATE + "</td><td>" + result.CREATE_DATE + "</td><td>" + result.TRANS_NAME + "</td><td>" + getTransactionStatusDescription( result.TRANS_STATUS ) + "</td><td>" + result.PROXY_USER + "</td><td>" + parseFloat( result.AMOUNT ).toFixed(2).toString() + "</td><td><button type=\"button\" class=\"btn btn-default\" onclick=\"userDetailReportShowNoteDetails(this)\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button></td></tr>";
						resultHTML += "<tr style=\"display: none;\"><td colspan=\"11\"> <table class=\"table table-condensed\"> <tr> <th>Note & Coin</th> <th> Count </th> </tr> <tr> <td> 1¢ </td> <td>" + ((notes["0.01|0.01"] != null) ? notes["0.01|0.01"].count : 0) + "</td> </tr> <tr> <td> 5¢ </td> <td>" + ((notes["0.05|0.01"] != null) ? notes["0.05|0.01"].count : 0) + "</td> </tr> <tr> <td> 10¢ </td> <td>" + ((notes["0.10|0.01"] != null) ? notes["0.10|0.01"].count : 0) + "</td> </tr> <tr> <td> 25¢ </td> <td>" + ((notes["0.25|0.01"] != null) ? notes["0.25|0.01"].count : 0) + "</td> </tr> <tr> <td> 50¢ </td> <td>" + ((notes["0.50|0.01"] != null) ? notes["0.50|0.01"].count : 0) + "</td> </tr> <tr> <td> 100¢ </td> <td>" + ((notes["1.00|0.01"] != null) ? notes["1.00|0.01"].count : 0) + "</td> </tr> <tr> <td> $1 </td> <td>" + ((notes["1.00|1.00"] != null) ? notes["1.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $2 </td> <td>" + ((notes["2.00|1.00"] != null) ? notes["2.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $5 </td> <td>" + ((notes["5.00|1.00"] != null) ? notes["5.00|1.00"].count : 0) + "</td></tr> <tr> <td> $10 </td> <td>" + ((notes["10.00|1.00"] != null) ? notes["10.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $20 </td> <td>" + ((notes["20.00|1.00"] != null) ? notes["20.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $50 </td> <td>" + ((notes["50.00|1.00"] != null) ? notes["50.00|1.00"].count : 0) + "</td> </tr> <tr> <td> $100 </td> <td>" + ((notes["100.00|1.00"] != null) ? notes["100.00|1.00"].count : 0) + "</td> </tr> </table> </td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportUserSummaryReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getUserSummaryCSV&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderUserSummaryReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getUserSummary&userId=" + $("#userId").val() + "&startBusinessDate=" + $("#startBusinessDate").val() + "&endBusinessDate=" + $("#endBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>User ID</th><th>User Name</th><th>Session Status</th><th>Register ID</th><th>Business Date</th><th>Dispense Amount</th><th>Deposit Amount</th><th>Total Amount</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.UserID + "</td><td>" + result.UserName + "</td><td>" + getSessionStatus(result.SessionStatus) + "</td><td>" + result.RegisterID + "</td><td>" + result.BusinessDate + "</td><td>" + parseFloat( result.DispenseAmount ).toFixed(2).toString() + "</td><td>" + parseFloat( result.DepositAmount ).toFixed(2).toString() + "</td><td>" + parseFloat( result.TotalAmount ).toFixed(2).toString() + "</td></tr>";
					});
					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportGrandTotalByDateReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getGrandTotalsByDateCSV&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		renderGrandTotalByDateReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getGrandTotalsByDate&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Recycler ID</th><th>CU</th><th>Note</th><th>Quantity</th><th>Amount</th><th>Business Date</th></tr>");
					var grandTotalAmount = 0.00;
					var resultHTML = "";
					results.forEach(function(result){
						grandTotalAmount += parseFloat( result.Amount );
						resultHTML += "<tr class=\"success\"><td>" + result.RecyclerID + "</td><td>" + result.CU + "</td><td>" + result.Note + "</td><td>" + result.Quantity + "</td><td>" + parseFloat( result.Amount ).toFixed(2).toString() + "</td><td>" + result.START_BUS_DATE + "</td></tr>";
					});
					
					resultHTML += "<tr><th colspan=11 class=\"text-center\">Grand Total Amount: " + parseFloat( grandTotalAmount ).toFixed(2).toString() + "</th></tr>";

					//resultHTML += "<tr class=\"success\"><td colspan=3>Total</td><td>" + parseFloat( grandTotalAmount ).toFixed(2).toString() + "</td></tr>";

					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		exportGrandTotalByDateReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getGrandTotalsByDateCSV&startBusinessDate=" + $("#startBusinessDate").val() + "&api_key=" + API_KEY;
		},
		exportGrandTotalReportCSV: function(){
			window.location = "https://" + HOST + "/?controller=ReportController&action=getGrandTotalsCSV&recyclerId=" + $("#recyclerId").val() + "&api_key=" + API_KEY;
		},
		renderGrandTotalReport: function(){
			$.post("https://" + HOST + "/?controller=ReportController&action=getGrandTotals&recyclerId=" + $("#recyclerId").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != "false"){
					var results = JSON.parse(response);
					$("#reportTableHeader").html("<tr><th>Recycler ID</th><th>CU</th><th>Note</th><th>Quantity</th><th>Amount</th><th>Business Date</th></tr>");
					var resultHTML = "";
					results.forEach(function(result){
						resultHTML += "<tr class=\"success\"><td>" + result.RECYCLER_ID + "</td><td>" + result.CU + "</td><td>" + result.Note + "</td><td>" + result.Quantity + "</td><td>" + parseFloat( result.Amount ).toFixed(2).toString() + "</td><td>" + result.START_BUS_DATE + "</td></tr>";
					});
					
					resultHTML += "<tr><th colspan=11 class=\"text-center\">Grand Total Amount: " + parseFloat( results[0].TotalAmount ).toFixed(2).toString() + " </th></tr>";

					//resultHTML += "<tr class=\"success\"><td colspan=6 class=\"text-center\">Total: " + parseFloat( results[0].TotalAmount ).toFixed(2).toString() + "</td></tr>";

					$("#reportTableBody").html(resultHTML);
				}
				else{
					$("#reportTableBody").html("<tr class=\"danger text-center\"><td colspan=99>No results!</td></tr>");
				}
			});
		},
		renderGrandTotalReportRecord: function(recyclerInventoryLists){
			var noteTypeIds = [];

			recyclerInventoryLists.forEach(function(recyclerInventoryList){
				noteTypeIds.push(recyclerInventoryList.noteTypeId);
			});

			var noteType = JSON.parse( $.ajax({
		        type: "POST",
		        url: "https://" + HOST + "/?controller=NoteTypeController&action=getById&id=" + noteTypeIds[0] + "&api_key=" + API_KEY,
		        data:{},
		        async: false
		    }).responseText );

			var title = ( (noteType.cuType == 5) ? parseInt( (noteType.exponentValue * noteType.value).toPrecision(2) * 100 ) + "¢" : "$" + (noteType.exponentValue * noteType.value) );

		    if(noteType.reject == 1){
		    	title = "REJECT"
		    }
		    else if(noteType.reject == 2){
		    	title = "FORCED";
		    }

		    
		    var tableRecordHTML = "<tr id=\"" + noteTypeIds.join("-") + "\" class=\"success\" data-noteTypeIds=\"" + noteTypeIds.join("|") + "\"><td class=\"denominationTitle\">" + title +"</td><td class=\"denominationCount\">0</td><td class=\"denominationAmount\">$0.00</td></tr>";
			//var reportController = this;

			//$("#cassettePieCharts").append(pieChartHTML);
			//$(pieChartHTML).appendTo("#cassettePieCharts");

			$(tableRecordHTML).appendTo("#reportTableBody");
		}
	}
});

App.SettingController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		},
		loadSettings: function(){
			//console.log(" --- Loading Settings --- ");
			$.post("https://" + HOST + "/?controller=TerminalSettingController&action=getByTerminalId&terminalId=" + $("#terminalId").val() + "&api_key=" + API_KEY, {}, function(response){
				if(response.trim().toLowerCase() != 'false'){
					var setting = JSON.parse(response);
					$("#mtcLogFilePath").val(setting.mtcLogPath);
				}
				else{
					$("#mtcLogFilePath").val("");
				}
			});
		},
		updateSettings: function(){
			var options = {
				mtcLogPath: $("#mtcLogFilePath").val()
			};

			$.post("https://" + HOST + "/?controller=TerminalSettingController&action=update&terminalId=" + $("#terminalId").val() + "&api_key=" + API_KEY, JSON.stringify(options), function(response){
				//console.log(response);
				//var setting = JSON.parse(response);
				//$("#mtcLogFilePath").val(setting.mtcLogPath);
			});
		},
		renderTerminalSelectionOptions: function(){
			var terminalOptionsElement = $("#terminalId");
			terminalOptionsElement.html("");
			var optionsHTML = "";
			var controller = this;
			$.post("https://" + HOST + "/?controller=TerminalController&action=getAll&api_key=" + API_KEY, {}, function(response){
				var terminals = JSON.parse(response);
				terminals.forEach(function(terminal){
					optionsHTML += "<option value=\"" + terminal.id + "\">" + terminal.name + "</option>";
				});
				terminalOptionsElement.html(optionsHTML);
				controller.send("loadSettings");
			});

		}
	}
});


$()

App.LoginController = Ember.Controller.extend({
	actions: {
		showOption: function(){
		},
		showBadLoginCredentialsPrompt: function(){
			//$("#badLoginCredentialsPrompt").show();
			$("#badLoginCredentialsPrompt").removeClass("hidden");
		},
		hideBadLoginCredentialsPrompt: function(){
			//$("#badLoginCredentialsPrompt").hide();
			$("#badLoginCredentialsPrompt").addClass("hidden");
		},
		showAlertSection: function(){
			//$("#badLoginCredentialsPrompt").show();
			$("#alertNavMenuItem").removeClass("hidden");
		},
		hideAlertSection: function(){
			//$("#badLoginCredentialsPrompt").show();
			$("#alertNavMenuItem").addClass("hidden");
		},
		showMemberSection: function(){
			//$("#badLoginCredentialsPrompt").show();
			$("#memberNavMenuItem").removeClass("hidden");
		},
		hideMemberSection: function(){
			//$("#badLoginCredentialsPrompt").show();
			$("#memberNavMenuItem").addClass("hidden");
		},
		goToDashboard: function(){
			$("#menunavbar").css("display", "inline");
			this.transitionToRoute("dashboard");
		},
		goToTerminal: function(){
			$("#menunavbar").css("display", "inline");
			this.transitionToRoute("terminal");
		},
		goToUserImport: function(){
			$("#menunavbar").css("display", "inline");
			this.transitionToRoute("userimport");
		},
		doAuthenticate: function(){
			var emailAddress = $("#inputEmail").val();
			var password = $("#inputPassword").val();

			var loginController = this;

			if(emailAddress != "" && password != ""){
				

				$.post("https://" + HOST + "/?controller=MemberController&action=doAuthenticate&emailAddress=" + emailAddress + "&password=" + password + "&api_key=" + API_KEY, {}, function(response){

					App.MEMBER_ID = JSON.parse(response);
					
					$.post("https://" + HOST + "/?controller=MemberController&action=isAuthenticated&id=" + App.MEMBER_ID + "&api_key=" + API_KEY, {}, function(response){

						var isAuthenticated = JSON.parse(response);
						//console.log(response);
						//console.log(isAuthenticated);
						if(isAuthenticated > 0){
							$.post("https://" + HOST + "/?controller=MemberController&action=getById&id=" + App.MEMBER_ID  + "&api_key=" + API_KEY, {}, function(response){
								var member = JSON.parse(response);

								//console.log(member);

								if(member.isAdmin > 0){
									loginController.send("showMemberSection");
								}
								else{
									loginController.send("hideMemberSection");
								}

								if(member.alertsEnabled > 0){
									loginController.send("showAlertSection");
								}
								else{
									loginController.send("hideAlertSection");
								}

								loginController.send("goToTerminal");

							});

							
						}
						else{
							loginController.send("showBadLoginCredentialsPrompt");
						}
					});
				});
			}
			else{
				loginController.send("showBadLoginCredentialsPrompt");
			}
			 
		}
	}
});

	
App.TerminalSelectionComponent = Ember.Component.extend({
	templateName: "components/terminal-selection",
	didInsertElement: function(){

	},
	actions: {
		remove: function(){
			this.remove();
		}
	}

});