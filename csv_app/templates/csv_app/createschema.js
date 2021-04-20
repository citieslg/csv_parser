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
const SCORE_NAME_INPUT_HOME = "score_name_home_"
const SCORE_ID_INPUT_HOME = "id_score_home_"
//with cols guest
const SCORE_NAME_INPUT_GUEST = "score_name_guest_"
const SCORE_ID_INPUT_GUEST = "id_score_guest_"

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
const CLASS_COL_MD_5 = "form-group col-md-5 mb-0"
const CLASS_DELETE = "text-danger control mt-5"

// CONSTS ETC
const NAME_FORM_SUMBMIT = "form_submit"
const TIME_NAME_OBJ = {
	"n" : "events now from",
	"t" : "events from"
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
	"t":"common total ",
	"h":"team home ",
	"g":"team guest ",
	"c":"where ",
}

///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// onload
///////////////////////////////////////////////////////////////////////////////
function setDefaultState() {
	//on load function makes selected all matches state!!!
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
			"id" : TIME_ID_FROM,
			"value": (typeinput === "number") ? "0" : "00:00"
		}, 
		{
			"label": "To:",
			"name": TIME_NAME_TO,
			"id" : TIME_ID_TO,
			"value": (typeinput === "number") ? "130" : "23:59"
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
			"value": rangeValues[i]["value"],
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
		"class": CLASS_INPUT,
		"value": 0,
		"onchange" : `onChangeScore("score", ${order})`
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
		timefrom.value = TIME_MIN_MAX[timetype.value].min
		timeto.min = TIME_MIN_MAX[timetype.value].min
		timeto.max = TIME_MIN_MAX[timetype.value].max
		timeto.value = TIME_MIN_MAX[timetype.value].max
		// (timeto.min, timeto.max) = (TIME_MIN_MAX[timetype.value].min, TIME_MIN_MAX[timetype.value].max)
	} else if (type == "from:") {
		timeto.min = (timetype.value === "t") ? setTime(timefrom.value,"+") : +timefrom.value + 1
	} else if (type == "to:") {
		timefrom.max = (timetype.value === "t") ? setTime(timeto.value,"-") : +timeto.value - 1
	} else {
		console.warn("Error with Time parameters...")
	}
	timename.value = `${TIME_NAME_OBJ[timetype.value]} ${timefrom.value} - ${timeto.value}`
}

///////////////////////////////////////////////////////////////////////////////
// help functions for onChangeScore
///////////////////////////////////////////////////////////////////////////////
function createCompairsonBlockforScoreRow(order) {
	////////////////////////////////////////////////////////////////////////
	//edit old Dom elements for Guest Side: input + title in paragraph block
	////////////////////////////////////////////////////////////////////////
	//get total, guest, home widgets: label, input
	let scorelabel = document.querySelector(`label[for=${SCORE_ID_INPUT_SCORE}${order}]`)
	let scoreinput = document.getElementById(SCORE_ID_INPUT_SCORE+order)
	//redefine input params
	scoreinput.min = -5
	scoreinput.max = 5
	scoreinput.value = 0
	scoreinput.id = SCORE_ID_INPUT_GUEST + order
	scoreinput.name = SCORE_NAME_INPUT_GUEST + order
	scoreinput.setAttribute("onchange", `onChangeScore("foraguest",${order})`)
	//redefine label params
	scorelabel.innerHTML = "Fora guest:"
	scorelabel.htmlFor = SCORE_ID_INPUT_GUEST + order
	//create p col : "Team guest"
	let divParagraphAttrs = {
		"innerHTML": "<p>Team guest</p>",
		"style": SCORE_STYLE_TITLE
		}
	let divGuestParagraphCol = createTagWithAttrs("div", divParagraphAttrs)
	let divGuestParagraphWraper = createTagWithAttrs("div", {"class" : CLASS_COL_MD_1})
	divGuestParagraphWraper.appendChild(divGuestParagraphCol)
	//get parent div label + input
	let divInputGuest = scorelabel.parentNode
	//redefine empty div
	let divEmpty = divInputGuest.nextSibling
	divEmpty.setAttribute("class", CLASS_COL_MD_2)
	//insert divParagraf after input+label block
	divInputGuest.after(divGuestParagraphWraper)
	/////////////////////////////////////
	//create new block for Home Team side
	/////////////////////////////////////
	//create Title Block
	let divHomeParagraphWraper = createTagWithAttrs("div", {"class": CLASS_COL_MD_1})
	let divHomeParagraphWraperAttrs = {
		"innerHTML": "<p>Team home</p>",
		"style": SCORE_STYLE_TITLE
		}
	let divHomeParagraphCol = createTagWithAttrs("div", divHomeParagraphWraperAttrs)
	divHomeParagraphWraper = appendAllChild(divHomeParagraphWraper, divHomeParagraphCol)
	//create input Block
	let divForaHome = createTagWithAttrs("div", {"class": CLASS_COL_MD_1})
	let labelHome = createTagWithAttrs("label", {"for": SCORE_ID_INPUT_HOME + order})
	labelHome.innerHTML = "Fora home:"
	let inputHomeForaAttrs = {
		"min": -5,
		"max": 5,
		"value": 0,
		"id": SCORE_ID_INPUT_HOME + order,
		"name": SCORE_NAME_INPUT_HOME + order,
		"class": CLASS_INPUT,
		"onchange": `onChangeScore("forahome", ${order})`,
		"type": INPUT_TYPE_OBJ.n,
		"required": ""
		}
	let inputHomeFora = createTagWithAttrs("input", inputHomeForaAttrs)
	divForaHome = appendAllChild(divForaHome, labelHome, inputHomeFora)
	//get div input state Row and append after it Paragraph and Input Divs
	let selectState = document.getElementById(SCORE_ID_TYPE_SELECT+order)
	let parent = selectState.parentNode
	parent.after(divForaHome)
	parent.after(divHomeParagraphWraper)
}

function createDefaultBlockforScoreRow(order) {
	////////////////////////////////////////////////////////////
	//delete COMPAIR COLS: p-Home, labelHome, inputHome, p-Guest
	//redefine inputGuest, labelGuest to Score
	//redefine EmptyDiv class
	////////////////////////////////////////////////////////////
	let row = document.getElementById(ID_ROW+order)
	let deletelist = []
	for (node of row.childNodes) {
		if (["Fora home:","Team home", "Team guest"].includes(node.textContent)) {
			deletelist.push(node)
		} else if (node.textContent == "Fora guest:") {
			let label = document.querySelector(`label[for=${SCORE_ID_INPUT_GUEST}${order}]`)
			let input = document.getElementById(SCORE_ID_INPUT_GUEST+order)
			//redeffine label attr "for"
			label.innerHTML = "Score:"
			label.htmlFor = SCORE_ID_INPUT_SCORE + order
			//redefine input attr
			input.min = 0
			input.max = 20
			input.value = 0
			input.id = SCORE_ID_INPUT_SCORE + order
			input.className = CLASS_INPUT
			input.name = SCORE_NAME_INPUT_SCORE + order
			input.setAttribute("onchange", `onChangeScore("score", "${order}")`)
		} else if (node.textContent == "") {
			node.className = CLASS_COL_MD_5
		}
	}
	deletelist.map((elem) => elem.remove())
}

///////////////////////////////////////////////////////////////////////////////
// function to manage Score Row wodgets
///////////////////////////////////////////////////////////////////////////////
function onChangeScore(type, order) {
	let name = ''
	let scorename = document.getElementById(SCORE_ID+order)
	let scoretype = document.getElementById(SCORE_ID_TYPE_SELECT+order)
	//total, home, guest widgets
	if (type === "state") {
		if (scoretype.value === "c") {
			createCompairsonBlockforScoreRow(order)
			name = "set parameters..."
		} else if (["t", "h", "g"].includes(scoretype.value)) {
			// layout: check is value of compair and score widgets have some values and change the name if no generate new layout by defailt if yes change the name
			//check is there compair state widgets
			let foraHomeInput = document.getElementById(SCORE_ID_INPUT_HOME+order)
			if (foraHomeInput != null) {
				createDefaultBlockforScoreRow(order)
				name = "set parameters..."
			} else {
				let compairVal = document.getElementById(SCORE_ID_COMPAIR_TYPE+order).value
				let scoreVal = document.getElementById(SCORE_ID_INPUT_SCORE+order).value
				name = `${SCORE_NAME_OBJ[scoretype.value]}${compairVal}${scoreVal}`
			}
		} else {
			console.warn("Error with Score parameters 'not state'")
		}
	} else if (["score", "compair"].includes(type)) {
		//edit name
		if (scoretype.value === "c") {
			let compairVal = document.getElementById(SCORE_ID_COMPAIR_TYPE+order).value
			let homeForaVal = document.getElementById(SCORE_ID_INPUT_HOME+order).value
			let guestForaVal = document.getElementById(SCORE_ID_INPUT_GUEST+order).value
			name = `${SCORE_NAME_OBJ[scoretype.value]} home(${homeForaVal})${compairVal}guest(${guestForaVal})`
		} else if (["t", "h", "g"].includes(scoretype.value)) {
			let compairVal = document.getElementById(SCORE_ID_COMPAIR_TYPE+order).value
			let scoreVal = document.getElementById(SCORE_ID_INPUT_SCORE+order).value
			name = `${SCORE_NAME_OBJ[scoretype.value]}${compairVal}${scoreVal}`
		} else {
			console.warn("Error with Score parameters 'no score and no compair'")
		}
		//edit name
	} else if (["forahome", "foraguest"].includes(type)) {
		let compairVal = document.getElementById(SCORE_ID_COMPAIR_TYPE+order).value
		let homeForaVal = document.getElementById(SCORE_ID_INPUT_HOME+order).value
		let guestForaVal = document.getElementById(SCORE_ID_INPUT_GUEST+order).value
		name = `${SCORE_NAME_OBJ[scoretype.value]} home(${homeForaVal})${compairVal}guest(${guestForaVal})`
	} else {
		console.warn("Error with Score parameters...")
		//edit name
	}
		//create new layout
	scorename.value = name
}

///////////////////////////////////////////////////////////////////////////////
//delete row and make editable parent Node, redefine "and" & "or" orders lists
///////////////////////////////////////////////////////////////////////////////
function deleteRow(order) {
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
			"onchange": `onChangeScore("compair","${order}")`
		},
		"score": {
			"label": "Type:",
			"classDivCol": CLASS_COL_MD_1,
			"classSelect": CLASS_SELECT,
			"name": SCORE_NAME_TYPE_SELECT + order,
			"id": SCORE_ID_TYPE_SELECT + order,
			"choices": SCORE_COMPAIR_TYPE_OBJ,
			"onchange": `onChangeScore("state","${order}")`
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
