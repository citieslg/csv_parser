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
	"num": "number",
	"tm" : "time"
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
	"c" : "compair",
}
//if total or home or huest
//col input score value
const SCORE_NAME_INPUT_SCORE = "score_name_"//+order
const SCORE_ID_INPUT_SCORE = "id_score_input_"//+order
//col class for name input
const SCORE_STYLE_TITLE = "margin-top: 40px;"
//col colmpairson choices
const SCORE_COMPAIR_CHOICES_OBJ = {
	"==" : "==",
	"<=" : "&lt;=",
	">=" : "&gt;=",
	">" : "&gt;",
	"<" : "&lt;"
}
//if compair
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
const TIME_NAME_SELECT_STSTUS = "match_ststus_"//+ order
const TIME_SELECT_STATUS_OBJ = {
		"n" : "now",
		"t" : "time table"
		}
//col Time from
const TIME_NAME_FROM = "time_name_from_"//+order
const TINE_ID_FROM = "id_from_"//+order
//col Time to
const TIME_NAME_TO = "time_name_to_"//+order
const TINE_ID_TO = "id_to_"//+order

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
	"f" : "finished",
}
const STATE_OREDER_NAME = "name_state_order_1"
const STATE_ID_ORDER = "1"

//ADD ROW CONSTS
//col name
const ADD_COL_NAME = "add_name"
const ADD_ID_COL_NAME = "id_add_name"
//col filter type
const ADD_SELECT_TYPE_NAME = "add_name_select_type"
const ADD_ID_SELECT_TYPE = "id_add_select_type"
//col radio new
const ADD_RADIO_NEW_NAME = "add_name_radionew"
const ADD_ID_RADIO_NEW = "id_add_radionew"
const ADD_RADIO_NEW_VALUE = "neworder"
//col new order, type text with min max attrs
const ADD_ORDER_NAME = "add_name_neworder"
const ADD_ID_ORDER_NEW = "id_add_neworder"
//col add order
const ADD_RADIO_ADD_NAME = "add_name_order"
const ADD_ID_RADIO_ADD = "id_add_order"
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
const DEFAULT_INPUT_NAME = "Name will be generated"


//CREATE ROW
function create_row() {
	let 
}
//CREATE ROW - TIME
//time view managers
//CREATE ROW - SCORE
//score view managers
//INITIAL ADD ROW FORM
let AddForm = {
	//add form object
}
//add row managers
//ROW object
//ROWs MANAGER OBJ
//{'1': {'row': obj, 'logicoperator': null, 'childrens':}}
let Rows = {}

function Row(type, order, parentOrChildren, logicoperator) {
	this.type = type;
	this.order = order;
	this.childrens = {1:null};
	this.logicoperator = logicoperator;

	function addChildren(rowObj) {

		// body...
	}

	// body...
}





























//COMMON FUNCTIONS
function createTagWithAttrs(tag, ...options) {
	//...will retun Object with attrs
	console.log(options.length)
	let elemAttrs = {}
	for (let i = 0; i < options.length; i++) {
		console.log(typeof options[i])
		Object.assign(elemAttrs, options[i])
	}
	console.log(`createTagWithAttrs tag = ${tag} and options = ${elemAttrs}`)
	let tagElem = document.createElement(tag)
	for (key in elemAttrs) {
		console.log(`key = ${key}, value = ${elemAttrs[key]}`)
		if (key == "innerHTML") {
			tagElem.innerHTML = elemAttrs[key]
		} else {
			tagElem.setAttribute(key, elemAttrs[key])
		}
		
	}
	return tagElem
}

function appendAllChild(parentElem, ...childrensElem) {
	console.log('appendAllChild')
	for (let i = 0; i < childrensElem.length; i++ ) {

		console.log(`	parent element = ${parentElem}\n 	appending = ${childrensElem[i]}`)
		parentElem.appendChild(childrensElem[i])
		}
	return parentElem
}

function insertAfter(parentElement, newElement) {
	return parentElement.insertAdjacentElement('afterend', newElement);
}

//CREATE COMMON OBJ
function createColName(order, labelinnerHtml, logicoperator="") {
	console.log("createColName")
	//DIV NAME
	let nameAttrs = {
		class: CLASS_COL_MD_2
		}
	let divName = createTagWithAttrs("div", nameAttrs)
	//LABEL
	let labelAttrs = {
		"for" : ID_TIME_NAME + order,
		"innerHTML" : labelinnerHtml
		}
	let labelName = createTagWithAttrs("label", labelAttrs)
	//INPUT
	let inputAttr = {
		type : INPUT_TYPE_OBJ.txt,
		// name value uses in Django as a input & output for ModelForm
		name : logicoperator + ID_TIME_NAME + order,
		value : logicoperator + ' time...',
		id    : ID_TIME_NAME + order, 
		class : CLASS_INPUT,
		disabled : true
		}
	let inputName = createTagWithAttrs("input", inputAttr)
	console.log("	createColName we append childrens")
	divName = appendAllChild(divName, labelName, inputName)
	return divName
}

function createColSelectWithOptions(order,objOptions, onchangeFunc, nameInnerHTML) {
	// objOptions {key : value...}
	//main DIV
	let divStatus = createTagWithAttrs("div", {"class" : CLASS_COL_MD_1})
	//LABEL
	let labelStatusAttrs = {
		"for" : ID_TIME_STATUS + order,
		"innerHTML" : nameInnerHTML
		}
	let labelStatus = createTagWithAttrs("label", labelStatusAttrs)
	//SELECT
	let selectAttrs = {
		onchange : onchangeFunc,
		name : ID_TIME_STATUS + order,
		id : ID_TIME_STATUS + order,
		class : CLASS_SELECT
		}
	let selectBlock = createTagWithAttrs("select", selectAttrs)
	let option = null
	for (key in objOptions) {
		if (option == null) {
			option = createTagWithAttrs("option", {
				"value" : key,
				"innerHTML" : objOptions[key],
				"selected" : ""})
		} else {
			option = createTagWithAttrs("option", {
				"value" : key,
				"innerHTML" : objOptions[key],
			})
		}
		selectBlock.appendChild(option)
	}
	return appendAllChild(divStatus, labelStatus, selectBlock)
}


function createEmptyCols(cols=1) {
	return createTagWithAttrs("div", {
		"class": `form-group col-md-${cols} mb-0`
		}
	)
}

//COMMON COL FOR ANY ROW DIVs: name, order, delete
function createColsOrderAndDelete(order){
	//COLUMN ORDER
	let divOrder = createTagWithAttrs("div", {"class":CLASS_COL_MD_1})
	let labelAttrs = {
		"for" : NAME_ORDER + order,
		innerHTML : "Order:"
		}
	let labelOrder = createTagWithAttrs("label", labelAttrs)
	let inputAttrs = {
		type : INPUT_TYPE_OBJ.txt,
		name : NAME_ORDER + order,
		required : "",
		id : order,
		className : CLASS_INPUT,
		disabled: true
		}
	let inputOrder = createTagWithAttrs("input", inputAttrs)
	divOrder = appendAllChild(divOrder, labelOrder, inputOrder)
	//COLUMN DELETE
	let divDel = createTagWithAttrs("div", {"class":CLASS_COL_MD_1})
	let wrapperOptions = {
		style : "margin-top: 40px; margin-left: 5px;"
		}
	let aOptions = {
		className : "text-danger control mt-5",
		onclick : `javascript:deleteRow(${order})`
		}
	let divStyleWraper = createTagWithAttrs("div", wrapperOptions)
	let a = createTagWithAttrs("a", aOptions)
	divStyleWraper.appendChild(a)
	divDel.appendChild(divStyleWraper)
	return insertAfter(divOrder, divDel)
}

function deleteRow(order) {
	alert(`delete order #${order}`)
	// body...have to del all childrens)
}

// FIRST COLOMN FUNCTIONS
function onChangeStatus(id_col_name, id_select) {
	// method wich get selected option and set name for first colomn
	console.log(`onChangeStatus name_ID = ${id_col_name}`)
	let name = document.getElementById(id_col_name)
	let statusSelectTag = document.getElementById(id_select)
	name.value = statusSelectTag.options[statusSelectTag.options.selectedIndex].text
	// the method have to add the val to fisrt col obj to SchemaColumnManager...
	}

//TIME ROW
function createColTimeRange(order) {
	//main DIVs
	let divFrom = createTagWithAttrs("div", {"class":CLASS_COL_MD_1})
	let divTo = createTagWithAttrs("div", {"class":CLASS_COL_MD_1})
	//label,input for divFrom
	let labelFromAttrs = {
		"for" : ID_TIME_FROM + order,
		"innerHTML" : "Time from:"
		}
	let labelFrom = createTagWithAttrs("label", labelFromAttrs)
	let inputFromAttrs = {
		"type" : INPUT_TYPE_OBJ.num,
		"name" : ID_TIME_FROM + order,
		"required" : "",
		'id' : ID_TIME_FROM + order,
		"class" : CLASS_INPUT,
		"min" : 0,
		"max" : 150
		}
	let inputFrom = createTagWithAttrs("input", inputFromAttrs)
	//label,input for divTo
	let labelToAttrs = {
		"for" : ID_TIME_TO + order,
		"innerHTML" : "Time to:"
		}
	let labelTo = createTagWithAttrs("label", labelToAttrs)
	let inputToAttrs = Object.assign({}, inputFromAttrs, {
			"name" : ID_TIME_TO + order,
			"id" : ID_TIME_TO + order
			}
		)
	console.log("\n\n\n\nFINISH createColTimeRange will create big object")
	let inputTo = createTagWithAttrs("input", inputToAttrs)
	//create two colomns
	divFrom = appendAllChild(divFrom, labelFrom, inputFrom)
	divTo = appendAllChild(divTo, labelTo, inputTo)
	return insertAfter(divFrom, divTo)
}

function createTimeRow(order=2, logicoperator="", id_row="time_row_") {
	//id_row incluses type_row: logicoperator + time, score + order
	//column Name attr name: logicoperator + time, score + order
	console.log("createTimeRow")
	//DIV ROW
	let rowAttrs = {
		"class" : CLASS_ROW,
		"name" : NAME_ROW,
		"id" : logicoperator + ID_TIME_ROW + order
		}
	console.log(`	createTimeRow main DIV`)
	let divRow = createTagWithAttrs("div", rowAttrs)
	// COLUMN NAME
	console.log(`	createTimeRow cal NAME`)
	let nameColumn = createColName(order, "Time name")
	//SELECT BLOCK
	console.log(`	createTimeRow cal SELECT`)
	let select = createColSelectWithOptions(order,
		SELECT_TIME_OBJ,
		`onChangeStatus("${ID_TIME_NAME+order}","${ID_TIME_STATUS + order}")`,
		"Match status:"
		)
	// INPUT QUERY BLOCK
	console.log(`	createTimeRow cal RANGE`)
	let timeRange = createColTimeRange(order)
	// Empty BLOCK
	console.log(`	createTimeRow cal EMPTY DIV`)
	let embtyDiv = createEmptyCols(5)
	//COLUMN ORDER & DELETE
	console.log(`	createTimeRow cal cols ORDER DELETE`)
	let divDelAndOrder = createColsOrderAndDelete(order)
	// console.log(`END createTimeRow`)
	return appendAllChild(divRow, nameColumn, select, timeRange)//, embtyDiv, divDelAndOrder)
}

function onchangeSelectTime(argument) {
	// the finc will change column name and set labelInput type
	alert("onchangeSelectTime")
}

function isOrederId(orderId) {
	// check is a new layout to display ADD FORM
	//tag input in defined columns has id=from2....to N
	console.log("isOrederId ", orderId)
	let orderInput = document.getElementById(orderId)
	console.log("isOrederId " + orderInput)
	if (orderInput == null) {
		console.log(`isOrederId return false`)
		return false
	} else {
		console.log(`isOrederId return true`)
		return true
	}
}

// VALIDATE AND CONTROL - ADD COLUMN FORM
function editableOrNoRadioOrder(func=isOrederId) {
	//use the func use onloadpage, delete column
	//to check is there order to add logic operator
	//or any order to replace colomn with new order
	let editablValue = (func("2")) ? false : true;//reverse return value of isOrederId
	editableOrNoRadioNew(editablValue)
	editableOrNoRadioAdd(editablValue)
	editableOrNoLogicoperator(editablValue)
}

function editableOrNoRadioNew(disabled) {
	let orderRadioNew = document.getElementById(ID_RADIO_NEW)
	let inputNewOrder = document.getElementById(ID_NEW_ORDER)
	orderRadioNew.disabled = disabled
	inputNewOrder.disabled = disabled
}

function editableOrNoRadioAdd(disabled) {
	let orderRadioAdd = document.getElementById(ID_RADIO_ADD)
	let selectOrderAdd = document.getElementById(ID_ADD_ORDER_SELECT)
	orderRadioAdd.disabled = disabled
	selectOrderAdd.disabled = disabled
}

function editableOrNoLogicoperator(disabled) {
	let logicoperator = document.getElementById(ID_ADD_COLUMN_LOGICOPERATOR)
	logicoperator.disabled = disabled
}

function addNewRow() {
	console.log("addNewRow")
	let filterTypeTag = document.getElementById(ID_ADD_COLUMN_FILTER)
	let selectedValue = filterTypeTag.options[filterTypeTag.options.selectedIndex].text
	console.log(`addNewRow selected = ${selectedValue}`)
	if (selectedValue=="by time") {
		let row = createTimeRow()
		let divafter = document.getElementById("row_1")
		insertAfter(divafter, row)
		editableOrNoRadioOrder()
	} else {
		console.log(`addNewRow by SCORE`)
	}
	//select using order choices
}

// MANAGE MAIN FORM



	// body...

// function add_p() {
// 	// body...
// 	let form = document.getElementsByTagName('form')
// 	let p = document.createElement('p')
// 	p.innerHTML = `<label for="id_name">Name11:</label>
// 					<input type="text" name="name1" value="None"\
// 					 maxlength="30" required="" id="id_name">`
// 	form.item(0).appendChild(p)
// }

// this good to manage form columns
// let form = document.forms.addcolumnform;
// let elems = form.elements //return HTMLFormControlsCollection
//HTMLFormControlsCollection 
	// { 0: input#id_name.form-control, 
	// 1: select#id_match_status.form-control.custom-select, 
	// 2: input#orderRadioNew.form-check-input, 
	// 3: input#inputNewOrder.form-control, 
	// 4: input#orderRadioAdd.form-check-input, 
	// 5: select#selectOrderAdd.form-control.custom-select, 
	// 6: select#logicoperat
	// let inputFrom = createTagWithAttrs("")or.form-control.custom-select, 
	// 7: button.btn.btn-primary.btn-lg, length: 
	// 8, … }

//HTMLFormControlsCollection
