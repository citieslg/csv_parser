///////////////////////////////////////////////////////////////////////////////
//COSTS BLOCK
///////////////////////////////////////////////////////////////////////////////
//ROW COMMON CONSTS
const NAME_ROW = "row"
const ID_ROW = "row_" //for ID use row + order = "row_1"
//COL NAME
const NAME_COL_NAME = "name_" //logicoperator + "_" + "name_" + filter_type + order
const ID_COL_NAME = "id_name_" //+order
//COLS ORDER & DELETE
const NAME_ORDER = "order_"//+order
const DELETE_STYLE = "margin-top: 40px; margin-left: 5px;"
//TYPE INPUT
const INPUT_TYPE_OBJ = {
	"txt": "text",
	"n": "number",
	"t" : "time"
}
//ROW SCORE
//col name
const SCORE_FILTER_NAME = "_sccore_"
const SCORE_ID = "id_score_"
//col select score type filter
const SCORE_NAME_TYPE_SELECT = "score_type_select_"//+ order
const SCORE_ID_TYPE_SELECT = "id_score_type_"//+order
const SCORE_COMPAIR_TYPE_OBJ = {
	"t" : "total",
	"h" : "home",
	"g" : "guest",
	"c" : "compair"
}
//if total or home or huest
//col input score value
const SCORE_NAME_INPUT_SCORE = "score_input_name_"//+order
const SCORE_ID_INPUT_SCORE = "id_score_input_"//+order
//col colmpairson choices
const SCORE_ID_COMPAIR_TYPE = "id_compair_"//+order
const SCORE_NAME_COMPAIR = "compair_"//+order
const SCORE_COMPAIR_CHOICES_OBJ = {
	"==" : "==",
	"<=" : "&lt;=",
	">=" : "&gt;=",
	">" : "&gt;",
	"<" : "&lt;"
}
//if compair
//col class for name input
const SCORE_STYLE_TITLE = "margin-top: 40px;"
//with cols home
const SCORE_NAME_INPUT_HOME = "score_name_home"
const SCORE_ID_INPUT_HOME = "id_score_home"
//with cols guest
const SCORE_NAME_INPUT_GUEST = "score_name_guest"
const SCORE_ID_INPUT_GUEST = "id_score_guest"

//ROW TIME
//col name
const TIME_FILTER_NAME = "_time_" //name+...+id
const TIME_ID = "id_time_"//+ order
//col select match ststus: now, time table
const TIME_NAME_SELECT_STSTUS = "match_type_"//+ order
const TIME_ID_SELECT_STSTUS = "id_match_type_"//+ order
const TIME_SELECT_STATUS_OBJ = {
		"n" : "now",
		"t" : "time table"
		}
//col Time from
const TIME_NAME_FROM = "time_name_from_"//+order
const TIME_ID_FROM = "id_from_"//+order
//col Time to
const TIME_NAME_TO = "time_name_to_"//+order
const TIME_ID_TO = "id_to_"//+order

//ROW INITIAL STATE
//col name
const STATE_NAME = "name_state_1"
const STATE_ID_NAME = "id_state_1"
//col select state
const STATE_SELECT_NAME = "name_select_state_1"
const STATE_SELECT_ID = "id_select_state_1"
//col choices obj
const STATE_SELECT_OBJ = {
	"a" : "all",
	"s" : "soon",
	"n" : "now",
	"f" : "finished"
}
const STATE_OREDER_NAME = "name_state_order_1"
const STATE_ID_ORDER = "1"

//LOGIC BLOCK CONSTS
const LOGIC_NAME = "_logicoperator_"//logic Vlaue+LOGIC_NAME+order
const LOGIC_ID = "id_logicoperator_"//+order

//ADD ROW CONSTS
//col name
const ADD_COL_NAME = "add_name"
const ADD_ID_COL_NAME = "id_add_name"
//col filter type
const ADD_SELECT_TYPE_NAME = "add_name_select_type"
const ADD_ID_SELECT_TYPE = "id_add_select_type"
// col add select, choices generate by JS function
const ADD_SELECT_ADD_ORDER_NAME = "add_name_oreder_select"
const ADD_ID_SELECT_ADD_OREDER = "id_add_order_select"
//col add logic operator
const ADD_SELECT_LOGIC_NAME = "add_name_select_logic"
const ADD_ID_SELECT_LOGIC = "id_add_select_logic"
const ADD_SELECT_LOGIC = {
	"or": "OR",
	"and": "AND",
}
//BOOTSTRAP
const CLASS_ROW = "form-row mt-2"
const CLASS_INPUT = "form-control"
const CLASS_SELECT = "form-control custom-select"
const CLASS_COL_MD_1 = "form-group col-md-1 mb-0"
const CLASS_COL_MD_2 = "form-group col-md-2 mb-0"
const CLASS_DELETE = "text-danger control mt-5"

// CONSTS ETC
const NAME_FORM_SUMBMIT = "form_submit"
const TIME_NAME_OBJ = {
	"n" : "events now",
	"t" : "events"
}
const TIME_MIN_MAX = {
	"t" : {
		"min": "00:00",
		"max": "23:59",
	},
	"n": {
		"min": "0",
		"max": "130",
	}
}
const SCORE_NAME_OBJ = {
	"total":"common total",
	"home":"team home",
	"guest":"team guest",
	"compairson":"set patameters",
}
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// onload
///////////////////////////////////////////////////////////////////////////////
function setDefaultState() {
	//selected all matches state!!!
	let select = document.getElementById(STATE_SELECT_ID)
	select.options[0].selected=true
	manageAddFormByStateRow()
}

///////////////////////////////////////////////////////////////////////////////
//ROW OBJ
///////////////////////////////////////////////////////////////////////////////
function Row(logicoperator,parentorder) {
	this.iseditable = true
	this.logicoperator = logicoperator
	this.parentorder = parentorder
	this.logicindent = 0
	//set order value
	if (logicoperator === "or") {
		console.log("OR")
		this.order = this.parentorder.split("_")
		this.order[this.order.length -1] = +this.order[this.order.length -1] + 1
		this.order = this.order.join("_")
	} else if (logicoperator == "and") {
		console.log("AND")
		this.order = parentorder + "_1"
	} else {
		console.log("SOmething wrong")
		this.order = "nothing"
	}
}

function Time(logicoperator, parentorder) {
	Row.call(this, logicoperator, parentorder);
	this.timetype = null
	this.valfrom = null
	this.valto = null
}

function Score(logicoperator, parentorder) {
	Row.call(this, logicoperator, parentorder);
	this.scoretype = null
	this.compairson = null
	//for type total, guest, home
	this.score = null
	//for type compairson
	this.valhome = null
	this.valguest = null
}


function RowManager(row, rowobj, logicoperator) {
	this.row = row
	this.rowobj = rowobj
	this.logicoperator = logicoperator
	this.childrens = null
	this.getorders = function (argument) {
		// body...
	};
}
// let t1 = new Time(logicoperator = "or", parentorder = "1_1")
// console.log(t1.logicoperator)
// let t2 = new Score("and", "1_1")
// console.log(t1.order)
// console.log(t2.order)
// let t3 = new Row(logicoperator = "or", parentorder = "1_1")
// console.log(t3.order)


///////////////////////////////////////////////////////////////////////////////
//Rows obj with Order manager
///////////////////////////////////////////////////////////////////////////////
let StateRowObj = {
	order : "1",
	statustype : "all",
	childrens : null
}
let state = new RowManager(row="status", rowobj=StateRowObj, logicoperator=null)
let RowsManager = {
	"1" : state,
}

///////////////////////////////////////////////////////////////////////////////
//ADD FORM
///////////////////////////////////////////////////////////////////////////////
//add new Row
function addNewRow() {
	// func get data of ADD form and pass to func createRow
	//get type row
	let typerow = document.getElementById(ADD_ID_SELECT_TYPE)
	let typerowValue = typerow.options[typerow.options.selectedIndex].value
	//get order value
	let order = document.getElementById(ADD_ID_SELECT_ADD_OREDER)
	let orderValue = order.options[order.options.selectedIndex].text
	//get logicoperator value
	let logicoperator = document.getElementById(ADD_ID_SELECT_LOGIC)
	let logicoperatorValue = 
		logicoperator.options[logicoperator.options.selectedIndex].value
	//get new value for order
	let neworder = getNewOrder(orderValue)
	createRow(typerowValue, neworder, logicoperatorValue, orderValue)
	//create RowObj(order, logicoperator, rowtype, rowobj)
	//add to RowsObj
}

function createRow(typerow, neworder, logicoperator, add_to_orderVal) {
	//the function creates HTML for layout
	//the divElement is block after which the block of new Row will be added
	let divElement = document.getElementById(ID_ROW + add_to_orderVal)
	//create main div for row
	let mainDivAttrs = {
		"class": CLASS_ROW,
		"name": NAME_ROW,
		"id": ID_ROW + neworder
	}
	let mainDiv = createTagWithAttrs("div", mainDivAttrs)
	let colName = createNameCol(typerow, neworder, logicoperator)
	let widgets = []
	let empty = 0
	if (typerow === "time"){
		widgets = createTimerow(neworder)
		empty = 4
	} else {
		widgets = createScorerow(neworder)
		empty = 5
	}
	//empty block
	let emptyCols = createEmptyCols(empty)
	//delete and order cols
	let [orderCol, delCol] = createColsOrderAndDelete(neworder, typerow)
	mainDiv = appendAllChild(mainDiv, colName, widgets, emptyCols, orderCol, delCol)
	insertAfter(divElement, mainDiv)
	//logic operator will be add to the block Row abowe it
	createLogic(logicoperator, neworder)
}

///////////////////////////////////////////////////////////////////////////////
//CREATE ORDER FOR NEW ROW
///////////////////////////////////////////////////////////////////////////////
function getNewOrder(order) {
	//the func get example "1_2_1" and add +1 to last number => "1_2_2"
	let neworder = order.split("_")
	neworder[order.length - 1] = +neworder[order.length - 1] + 1
	return neworder.join("_")
}

///////////////////////////////////////////////////////////////////////////////
//TIME ROW
///////////////////////////////////////////////////////////////////////////////
//create Time Row
function createTimerow(order) {
	let ststusValue = document.getElementById(STATE_SELECT_ID).value
	switch (ststusValue) {
		//time values will be numbers
		case "n":
		case "a":
			inputType = INPUT_TYPE_OBJ.n
			break
		//time values will in time format
		case "s":
		case "f":
			inputType = INPUT_TYPE_OBJ.t
			break
		default:
			//by default time row will create for matches onlin-"now"
			//time values will be numbers
			inputType = INPUT_TYPE_OBJ.n
	}
	//col select match type
	let matchTypeChoicesDiv = createChoices("time" ,order, ststusValue)
	//col from
	//col to
	let [from, to] = createTimeRangeBlock(inputType, order)
	return [matchTypeChoicesDiv, from, to]
}

//create FROM and TO TIME Cols
function createTimeRangeBlock(typeinput, order) {
	let rangeBlock = []
	let rangeValues = [
		{
			"label": "From:",
			"name": TIME_NAME_FROM,
			"id" : TIME_ID_FROM
		}, 
		{
			"label": "To:",
			"name": TIME_NAME_TO,
			"id" : TIME_ID_TO
		}
	]
	for (let i = 0; i < rangeValues.length; i++) {
		let div = createTagWithAttrs("div", {"class" : CLASS_COL_MD_1})
		let labelAttrs = {
			"for" : rangeValues[i]["id"] + order,
			"innerHTML" : rangeValues[i]["label"]
		}
		let label = createTagWithAttrs("label", labelAttrs)
		let inputAttrs = {
			"class": CLASS_INPUT,
			"id": rangeValues[i]["id"] + order,
			"type": typeinput, 
			"name": rangeValues[i]["name"] + order,
			"onchange": `onChangeTime("${rangeValues[i]["label"].toLowerCase()}","${order}")`
		}
		//define type for input widget in time row
		if (typeinput == "number") {
			inputAttrs["min"] = "0"
			inputAttrs["max"] = "130"
		} else {
			inputAttrs["min"] = "00:00"
			inputAttrs["max"] = "23:59"
		}
		let input = createTagWithAttrs("input", inputAttrs)
		div = appendAllChild(div, label, input)
		rangeBlock.push(div)
	}
	return rangeBlock
}

///////////////////////////////////////////////////////////////////////////////
//SCORE ROW
///////////////////////////////////////////////////////////////////////////////
function createScorerow(order) {
	//by default creates with type choice == total
	let type =       createChoices("score", order)//type choices: total, home, guest, compairson
	let compairson = createChoices("compair", order)//==, <, > ...
	//div input
	let divInput = createTagWithAttrs("div", {"class": CLASS_COL_MD_1})
	let labelAttrs = {
		"for": SCORE_ID_INPUT_SCORE + order,
		"innerHTML": "Score:"
	}
	let labelinput = createTagWithAttrs("label", labelAttrs)
	let inputAttrs = {
		"id": SCORE_ID_INPUT_SCORE + order,
		"name": SCORE_NAME_INPUT_SCORE + order,
		"min": 0,
		"max": 20,
		"required": "",
		"type": "number",
		"class": CLASS_INPUT
	}
	let scoreinput = createTagWithAttrs("input", inputAttrs)
	divInput = appendAllChild(divInput, labelinput, scoreinput)
	return [type, compairson, divInput]
}

///////////////////////////////////////////////////////////////////////////////
//MANAGERS
///////////////////////////////////////////////////////////////////////////////
function manageAddFormByStateRow() {
	//the function inputs name into input name of initial row of state
	let nameStatus = document.getElementById(STATE_ID_NAME)
	let stateVal = document.getElementById(STATE_SELECT_ID)
	let filterchoices = document.getElementById(ADD_ID_SELECT_TYPE)
	filterchoices.disabled = false
	if (stateVal.value == "s") {
		//only time row avaliable
		filterchoices.options[0].selected = true
		filterchoices.disabled = true
		nameStatus.value = "matches coming soon"
	} else if(stateVal.value == "a") {
		nameStatus.value = "all matches today"
	} else if (stateVal.value == "n") {
		nameStatus.value = "current matches today"
	} else if (stateVal.value == "f") {
		nameStatus.value = "completed matches today"
	}
}


function onChangeTime(type, order) {
	let timename = document.getElementById(TIME_ID+order)
	let timetype = document.getElementById(TIME_ID_SELECT_STSTUS+order)
	let timefrom = document.getElementById(TIME_ID_FROM+order)
	let timeto = document.getElementById(TIME_ID_TO+order)
	if (type == "time") {
		timefrom.type = INPUT_TYPE_OBJ[timetype.value]
		timeto.type = INPUT_TYPE_OBJ[timetype.value]
		//define default min and max values
		timefrom.min = TIME_MIN_MAX[timetype.value].min
		timefrom.max = TIME_MIN_MAX[timetype.value].max
		timeto.min = TIME_MIN_MAX[timetype.value].min
		timeto.max = TIME_MIN_MAX[timetype.value].max
		// (timeto.min, timeto.max) = (TIME_MIN_MAX[timetype.value].min, TIME_MIN_MAX[timetype.value].max)
	} else if (type == "from:") {
		timeto.min = (timetype.value === "t") ? setTime(timefrom.value,"+") : +timefrom.value + 1
	} else if (type == "to:") {
		timefrom.max = (timetype.value === "t") ? setTime(timeto.value,"-") : +timeto.value - 1
	} else {
		console.log("onChangeTime ELSE")
	}
	timename.value = `${TIME_NAME_OBJ[timetype.value]} ${timefrom.value} to ${timeto.value}`
}

function onChangeScore(type, order) {
	let scorename = document.getElementById(TIME_ID+order)
	let scoretype = document.getElementById(TIME_ID_SELECT_STSTUS+order)
	//set name
	scorename.value = SCORE_NAME_OBJ[scoretype.value]
	if (scoretype.value==="compairson") {
		//create new layout
		//edit name
	} else if (type == "score") {
		//edit name
	} else if (type == "compairstate") {
		//edit name
	} else if (type == "forehome") {
		//edit name
	} else if (type == "foraguest") {
		//edit name
	}
}

function deleteRow(order) {
	// body...
	//delete logicoperator block
	//delete div with row by order
	alert("WE USE DELE FOR ORDER = " + order)
	let logicBlok = document.getElementById(LOGIC_ID+order)
	let divBlock = document.getElementById(ID_ROW+order)
	logicBlok.remove()
	divBlock.remove()
}

///////////////////////////////////////////////////////////////////////////////
//COMMON COLs: name, empty-block, delete, order
///////////////////////////////////////////////////////////////////////////////
function createNameCol(typerow, order, logicoperator) {
	//DIV NAME
	let nameAttrs = {
		class: CLASS_COL_MD_2
		}
	let divName = createTagWithAttrs("div", nameAttrs)
	//LABEL
	let labelAttrs = {
		"for" : "id_" + typerow + "_" + order,
		"innerHTML" : "Filter by " + typerow
		}
	let labelName = createTagWithAttrs("label", labelAttrs)
	//INPUT
	let inputAttr = {
		type : INPUT_TYPE_OBJ.txt,
		// name value uses in Django as a input & output for ModelForm
		name : logicoperator + "_" + typerow + "_" + order,
		value : '...set parameters',
		id    : "id_" + typerow + "_" + order,
		class : CLASS_INPUT,
		disabled : true
		}
	let inputName = createTagWithAttrs("input", inputAttr)
	divName = appendAllChild(divName, labelName, inputName)
	return divName
}

function createColsOrderAndDelete(order, typerow){
	///////////////
	//COLUMN ORDER
	///////////////
	let divOrder = createTagWithAttrs("div", {"class" : CLASS_COL_MD_1})
	let labelAttrs = {
		"for" : order,
		"innerHTML" : "Order:"
		}
	let labelOrder = createTagWithAttrs("label", labelAttrs)
	let inputAttrs = {
		"type" : INPUT_TYPE_OBJ.txt,
		"name" : typerow + "_" + NAME_ORDER + order,
		"required" : "",
		"id" : order,
		"class" : CLASS_INPUT,
		"disabled": true,
		"value" : order
		}
	let inputOrder = createTagWithAttrs("input", inputAttrs)
	divOrder = appendAllChild(divOrder, labelOrder, inputOrder)
	///////////////
	//COLUMN DELETE
	///////////////
	let divDel = createTagWithAttrs("div", {"class":CLASS_COL_MD_1})
	let wrapperAttrs = {
		"style" : DELETE_STYLE
		}
	let aAttrs = {
		"class" : CLASS_DELETE,
		"innerHTML" : "Delete",
		"href" : "#",
		"onclick" : `javascript:deleteRow(${order})`
		}
	let divStyleWraper = createTagWithAttrs("div", wrapperAttrs)
	let a = createTagWithAttrs("a", aAttrs)
	divStyleWraper.appendChild(a)
	divDel.appendChild(divStyleWraper)
	return [divOrder, divDel]
}

function createEmptyCols(cols=1) {
	return createTagWithAttrs("div", {
		"class": `form-group col-md-${cols} mb-0`
		}
	)
}

///////////////////////////////////////////////////////////////////////////////
//CREATE LOGICOPERATOR BLOCK
///////////////////////////////////////////////////////////////////////////////
function createLogic(logicoperatorValue, order) {
	//logic block will have indents dependent from order
	//example: order = "1" or "2", or "n" with no indents
	//order = "1_1" with one indent
	//order = "1_2_1" with two indents
	let arrayFromOrder = order.split("_")
	let elem = document.createElement("div")
	elem.innerHTML = 
	`<div class="form-row mt-2" name="${logicoperatorValue + LOGIC_NAME + order}" id="${LOGIC_ID+order}">
		<div class="form-group col-md-${arrayFromOrder.length-1} mb-0">
		</div>
		<div class="form-group col-md-${12-(arrayFromOrder.length-1)} mb-0">
			<div class="alert alert-info col" role="alert">
				${logicoperatorValue.toUpperCase()}
			</div>
		</div>
	</div>`
	mainDiv = document.getElementById(ID_ROW + order)
	parentDiv = mainDiv.parentNode
	parentDiv.insertBefore(elem.firstChild, mainDiv)
}

///////////////////////////////////////////////////////////////////////////////
//CREATE CHOICES BLOCK
///////////////////////////////////////////////////////////////////////////////
function createChoices(type, order, state=null) {
	//type can be: time, compair, score
	let choicesManagerConsts = {
		"time": {
			"label": "Matches type:",
			"classDivCol": CLASS_COL_MD_2,
			"classSelect": CLASS_SELECT,
			"name": TIME_NAME_SELECT_STSTUS + order,
			"id": TIME_ID_SELECT_STSTUS + order,
			"choices": state == "s"|| state == "f" ? {"t":"time table"} :
					state == "n" ? {"n":"now"} : TIME_SELECT_STATUS_OBJ,
			"onchange": `onChangeTime('time','${order}')`
		},
		"compair": {
			"label": "Compair:",
			"classDivCol": CLASS_COL_MD_1,
			"classSelect": CLASS_SELECT,
			"name": SCORE_NAME_COMPAIR + order,
			"id": SCORE_ID_COMPAIR_TYPE + order,
			"choices": SCORE_COMPAIR_CHOICES_OBJ,
			"onchange": "alert('SELECT compairson')"
		},
		"score": {
			"label": "Type:",
			"classDivCol": CLASS_COL_MD_1,
			"classSelect": CLASS_SELECT,
			"name": SCORE_NAME_TYPE_SELECT + order,
			"id": SCORE_ID_TYPE_SELECT + order,
			"choices": SCORE_COMPAIR_TYPE_OBJ,
			"onchange": "alert('SELECT Score type')"
		}
	}
	let div = createTagWithAttrs("div", {"class" : choicesManagerConsts[type]["classDivCol"]})
	let labelAttrs = {
		"for" :       choicesManagerConsts[type]["id"],
		"innerHTML" : choicesManagerConsts[type]["label"]
		}
	let label = createTagWithAttrs("label", labelAttrs)
	let selectAttrs = {
		"onchange" : choicesManagerConsts[type]["onchange"],
		"name"     : choicesManagerConsts[type]["name"],
		"id"       : choicesManagerConsts[type]["id"],
		"class"    : choicesManagerConsts[type]["classSelect"]
		}
	//block for time row
	// if (timesoon == true) {
	// 	selectAttrs["disabled"] = true
	// }
	let select = createTagWithAttrs("select", selectAttrs)
	//create options
	let option = null
	for (key in choicesManagerConsts[type]["choices"]) {
		let optionAttrs = {
			"value" : key,
			"innerHTML" : choicesManagerConsts[type]["choices"][key]
			}
		if (option==null) {
			optionAttrs["selected"] = ""
		}
		option = createTagWithAttrs("option", optionAttrs)
		select.appendChild(option)
	}
	div = appendAllChild(div, label, select)
	return div
}

///////////////////////////////////////////////////////////////////////////////
//UTILS
///////////////////////////////////////////////////////////////////////////////
function createTagWithAttrs(tag, ...options) {
	//...will retun Object with attrs
	let elemAttrs = {}
	for (let i = 0; i < options.length; i++) {
		Object.assign(elemAttrs, options[i])
	}
	let tagElem = document.createElement(tag)
	for (key in elemAttrs) {
		if (key == "innerHTML") {
			tagElem.innerHTML = elemAttrs[key]
		} else {
			tagElem.setAttribute(key, elemAttrs[key])
		}
		
	}
	return tagElem
}

function insertAfter(parentElement, newElement) {
	return parentElement.insertAdjacentElement('afterend', newElement)
	}

function appendAllChild(parentElem, ...childrensElem) {
	for (let i = 0; i < childrensElem.length; i++ ) {
		if (Array.isArray(childrensElem[i])) {
			for (elem of childrensElem[i]) {
				parentElem.appendChild(elem)
			}
		} else {
		parentElem.appendChild(childrensElem[i])
		}
	}
	return parentElem
}

function setTime(time, sign) {
	//function returns min and max values for input time Row
	time = time.split(":")
	let houers = +time[0]
	let minutes = +time[1]
	if (sign === "+") {
		minutes += 1
		if (minutes == 60) {
			minutes = "00"
			houers += 1
			if (houers == 24){
				houers = "00"
			}
		}
	} else if (sign === "-") {
		minutes -= 1
		if (minutes == -1) {
			minutes = "59"
			houers-=1
			if (houers == -1) {
				hoers = "23"
			}
		}
	}
	minutes = minutes.toString().length === 1 ? "0"+minutes.toString() : minutes
	houers = houers.toString().length === 1 ? "0"+houers.toString() : houers
	return [houers, minutes].join(":")
}
