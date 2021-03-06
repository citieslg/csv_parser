///////////////////////////////////////////////////////////////////////////////
//CONSTS BLOCK
///////////////////////////////////////////////////////////////////////////////
//ROW COMMON CONSTS
const ID_DELETE = "del_"
const NAME_ROW = "row"
const ID_ROW = "row_"//for ID use row + order = "row_1"
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
//class for order col
const ADD_ORDER_CLASS_VALID = "form-control custom-select is-valid"
const ADD_ORDER_CLASS_INVALID = "form-control custom-select is-invalid"
//border class
const ADD_CLASS_BORDER_VALID = "border border-success rounded p-3"
const ADD_CLASS_BORDER_INVALID = "border border-danger rounded p-3"
const ADD_BUTTON_ID = "add_submit"
//BOOTSTRAP
const CLASS_ROW = "form-row mt-2"
const CLASS_INPUT = "form-control"
const CLASS_SELECT = "form-control custom-select"
const CLASS_COL_MD_1 = "form-group col-md-1 mb-0"
const CLASS_COL_MD_2 = "form-group col-md-2 mb-0"
const CLASS_COL_MD_4 = "form-group col-md-4 mb-0"
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
	//on load function makes selected "all" matches state!!!
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
	this.childrens = []
	//set order value
	if (logicoperator === "or") {
		this.order = this.parentorder.split("_")
		this.order[this.order.length -1] = +this.order[this.order.length -1] + 1
		this.order = this.order.join("_")
	} else if (logicoperator == "and") {
		this.order = parentorder + "_1"
	} else {
		this.order = "nothing"
	}
}

///////////////////////////////////////////////////////////////////////////////
// TIME OBJ
///////////////////////////////////////////////////////////////////////////////
function Time(logicoperator, parentorder) {
	Row.call(this, logicoperator, parentorder);
	this.name = "Time"
	this.timetype = null
	this.valfrom = null
	this.valto = null
}

///////////////////////////////////////////////////////////////////////////////
// SCORE OBJ
///////////////////////////////////////////////////////////////////////////////
function Score(logicoperator, parentorder) {
	Row.call(this, logicoperator, parentorder);
	this.name = "Score"
	this.scoretype = null
	this.compairson = null
	//for type total, guest, home
	this.score = null
	//for type compairson
	this.valhome = null
	this.valguest = null
	// this.value = range()
}

RowManager = {
	//first
	name: "RowManager",
	state:"all",
	order: "1",
	childrens: [],
	allOrders: [],
	timeOROrders: [],
	timeANDOrders: [],
	scoreOROrders: [],
	scoreANDOrders: [],
	deletedOrders: [],
	redefinedRows: [],
	avaliableScoreChoicesObj: {},
	redefineOrdersIterator: null,



	getLastOrder: function (object_order) {
		this.allOrders = []
		let obj = this.getRowObjectByOrder(object_order)
		if (object_order != "1") {
			if (obj.childrens.length === 0) {
				return obj.order
			} else {
				this.getAllOrders(obj.childrens)
				return this.allOrders[this.allOrders.length-1]
			}
		} else {
			return this.order
		}
	},

	getAllOrders: function (childrensArray) {
	//the idea is that the method fill arrays:
	//timeOrOrders, timeAndOrders,
	//scoreOrOrders, scoreAndOrders
		for (item of childrensArray) {
			if (item.childrens.length > 0) {
				this.getAllOrders(item.childrens)
			} else {
				this.allOrders.push(item.order)
			}
		}
	},

	getRowObjectByOrder: function (order) {
		let indexList = order.split("_")
		let obj = this
		//we take ome by one index-1 in obj.childrens and go deeper
		for (index of indexList.slice(1)) {
			obj = obj.childrens[+index-1]
		}
		return obj
	},

	validateOrderByLogic: function (toOrderVal, logicoperator) {
		if (logicoperator === "or") {
				return toOrderVal.slice(0, toOrderVal.lastIndexOf("_"))
			} else if (logicoperator === "and") {
				return toOrderVal
			} else { 
				console.warn("validateOrderByLogic NO LOGIC")
				return 0
		}
	},

	addRowObj: function (row, toOrderVal, obj=null) {
		if (toOrderVal=="1") {
			//get and set State row type and add first filter row
			let stateNode = document.getElementById(STATE_SELECT_ID)
			this.state = stateNode.options[stateNode.selectedIndex].text
			this.childrens.push(row)
		} else {
			order = this.validateOrderByLogic(toOrderVal, row.logicoperator)
			obj = this.getRowObjectByOrder(order)
			if (order == "1") {
				this.childrens.push(row)
			} else {
				obj.childrens.push(row)
			}
		}
	},
	//Order calculators
	calculateTimeOrOrders: function (childrensArray = this.childrens) {
		for (item of childrensArray) {
			if (item.childrens.length > 0) {
				if (item.name === "Time" && childrensArray.indexOf(item) === childrensArray.length-1) {
					this.timeOROrders.push(item.order)
				}
				this.calculateTimeOrOrders(item.childrens)
			} else {
				if (item.name === "Time" && childrensArray.indexOf(item) === childrensArray.length-1) {
					this.timeOROrders.push(item.order)
				}
			}
		}
	},

	calculateScoreOrOrders: function (childrensArray = this.childrens) {
		for (item of childrensArray) {
			if (item.childrens.length > 0) {
				if (item.name === "Score" && childrensArray.indexOf(item) === childrensArray.length-1) {
					this.scoreOROrders.push(item.order)
				}
				this.calculateScoreOrOrders(item.childrens)
			} else {
				if (item.name === "Score" && childrensArray.indexOf(item) === childrensArray.length-1) {
					this.scoreOROrders.push(item.order)
				}
			}
		}
	},

	calculateTimeAndOrders: function (childrensArray = this.childrens) {
		for (item of childrensArray) {
			if (item.childrens.length > 0) {
				if (item.name != "Time") {
					this.calculateTimeAndOrders(item.childrens)
				}
			} else {
				if (item.name != "Time") {
					this.timeANDOrders.push(item.order)
				}
			}
		}
	},

	calculateScoreAndOrders: function (childrensArray = this.childrens, scorelist = []) {
		for (item of childrensArray) {
			if (item.childrens.length > 0) {
				if (item.name === "Score") {
					scorelist.push(item.scoretype)
				}
				this.calculateScoreAndOrders(item.childrens, scorelist)
			} else {
				if (item.name === "Score") {
					scorelist.push(item.scoretype)
				}
				if (scorelist.length < Object.values(SCORE_COMPAIR_TYPE_OBJ).length) {
					this.scoreANDOrders.push(item.order)
				} else {
				}
			}
		}
	},
	//score calculators, creats avaliable score row choices
	getAvaliableScoreChoices: function (order) {
		orderIndexes = order.split("_")
		obj = this
		//returns Array with keys
		scoreDataList = Object.values(SCORE_COMPAIR_TYPE_OBJ)
		for (index of orderIndexes.slice(1)) {
			obj = obj.childrens[+index-1]
			if (obj.name === "Score") {
				scoreDataList.splice(scoreDataList.indexOf(obj.scoretype),1)
			}
		}
		this.avaliableScoreChoicesObj = {}
		if (scoreDataList.length > 0) {
			for (val of scoreDataList) {
				this.avaliableScoreChoicesObj[getKeyValByValueInObj(val,SCORE_COMPAIR_TYPE_OBJ)] = val
			}
		// this.avaliableScoreChoicesObj
		return true
		}
		return false
	},
	//delete managers
	extractRow: function (order) {
		let indexes = order.split("_").splice(1)
		obj = this
		for (let i = 0; i < indexes.length; i++) {
			if (i === indexes.length-1) {
				// this.redefinedRows = obj.childrens.slice(+indexes[i]) with childrens in one array
				let redefinedList = obj.childrens.slice(+indexes[i])
				this.setredifinedRows(redefinedList)
				let objForDelete = obj.childrens.splice(+indexes[i]-1,1).pop()
				this.deletedOrders.push(objForDelete.order)
				if (objForDelete.childrens.length > 0) {
					this.extractAllOrders(objForDelete)
				}
				return objForDelete
			} else {
				obj = obj.childrens[+indexes[i]-1]
			}
		}
	return false
	},

	extractAllOrders: function (obj) {
		for (item of obj.childrens) {
			this.deletedOrders.push(item.order)
			if (item.childrens.length > 0) {
				extractAllOrders(item)
			}
		}
	},

	redefineRowsOrdersGenerator: function* (newOrderVal, newParentOrderVal, newLogic) {
		//newOrderVal = deletedRow.order,
		//newParentOrderVal = deletedRow.parentorder,
		//newLogic = deletedRow.logicoperator
		let index = 0
		let rootLength = newOrderVal.length
		//get value of Row logic and type
		let RowLogicVal = newLogic
		//usually not need but if deleted order 1_1
		//logic for 1_2 has to change to and
		this.redefinedRows[index].logicoperator = newLogic
		let RowType = (this.redefinedRows[index].hasOwnProperty("timetype") === true) ? this.redefinedRows[index].name.toLowerCase() : this.redefinedRows[index].scoretype
		//get Row order and parentorder val
		let rowOrderVal = this.redefinedRows[index].order
		let rootValue = newOrderVal
		let newRootParent = newOrderVal
		//set vars new order and parentorder
		//redefine new value for order and parent order for Row
		this.redefinedRows[index].order = newOrderVal
		this.redefinedRows[index].parentorder = newParentOrderVal
		while (index < this.redefinedRows.length) {
			yield [RowLogicVal, rowOrderVal, newOrderVal, RowType];
			index++
			//really not need to check this, but its extra check
			if (this.redefinedRows[index] != undefined) {
				//get logic and type Row
				RowLogicVal = this.redefinedRows[index].logicoperator
				RowType = (this.redefinedRows[index].hasOwnProperty("timetype") === true) ? this.redefinedRows[index].name.toLowerCase() : this.redefinedRows[index].scoretype
				// set new root
				if (this.redefinedRows[index].order.length === rootLength) {
					//calculate new parentorder
					this.redefinedRows[index].parentorder = newRootParent
					//calculate new order and root
					orderArray = this.redefinedRows[index].order.split("_")
					//get and redefine last element
					orderArray[orderArray.length-1] = orderArray[orderArray.length-1] - 1
					newOrderVal = orderArray.join("_")
					rowOrderVal = this.redefinedRows[index].order
					//set new value for root
					rootValue = newOrderVal
					//set new order value for Row obj
					this.redefinedRows[index].order = newOrderVal
					//set new RootParent
					newRootParent = newOrderVal
					//we need the value below
					newParentOrderVal = newOrderVal
				} else {
					rowOrderVal = this.redefinedRows[index].order
					newOrderVal = rootValue + rowOrderVal.slice(rootLength)
					this.redefinedRows[index].order = newOrderVal
					this.redefinedRows[index].parentorder = newParentOrderVal
					newParentOrderVal = newOrderVal
				}
			}
		}
	},

	setredifinedRows: function (arrayOfRows) {
		for (row of arrayOfRows) {
			if (row.childrens.length!=0) {
				this.redefinedRows.push(row)
				this.setredifinedRows(row.childrens)
			} else {
				this.redefinedRows.push(row)
			}
		}
	},

	setDefaultValues: function () {
		this.allOrders = []
		this.timeOROrders = []
		this.timeANDOrders = []
		this.scoreOROrders = []
		this.scoreANDOrders = []
		this.deletedOrders = []
		this.redefinedRows = []
		this.avaliableScoreChoicesObj = {}
		this.redefineOrdersIterator = null
	}
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
	//get logicoperator value
	let logicoperator = document.getElementById(ADD_ID_SELECT_LOGIC)
	let logicoperatorValue = 
		logicoperator.options[logicoperator.options.selectedIndex].value
	//get order value
	let order = document.getElementById(ADD_ID_SELECT_ADD_OREDER)
	let orderValue = order.options[order.options.selectedIndex].text
	//get new value for order
	// let neworder = getNewOrder(orderValue)
	//set not editable widgets for parent row
	// setPropertyDisabledForRow(orderValue, true)
	//get last order in branch
	lastOrderValue = RowManager.getLastOrder(orderValue)
	let newrow = null
	if (typerowValue === "score") {
		if (RowManager.getAvaliableScoreChoices(orderValue)) {
			newrow = new Score(logicoperatorValue, orderValue)
			RowManager.addRowObj(newrow, orderValue)
			createRow(typerowValue, newrow, logicoperatorValue, lastOrderValue)
		}
	} else if (typerowValue === "time") {
			newrow = new Time(logicoperatorValue, orderValue)
			RowManager.addRowObj(newrow, orderValue)
			createRow(typerowValue, newrow, logicoperatorValue, lastOrderValue)
	}
	//redefine orders and set ADD block with TIME OR orders
	setInitialAddForm()
}

function createRow(typerow, newrow, logicoperator, add_to_orderVal) {
	//the function creates HTML for layout
	//the divElement is block after which the block of new Row will be added
	let divElement = document.getElementById(ID_ROW + add_to_orderVal)
	//create main div for row
	let mainDivAttrs = {
		"class": CLASS_ROW,
		"name": NAME_ROW,
		"id": ID_ROW + newrow.order
	}
	let mainDiv = createTagWithAttrs("div", mainDivAttrs)
	let colName = createNameCol(typerow, newrow.order, logicoperator)
	let widgets = []
	let empty = 0
	if (typerow === "time"){
		widgets = createTimerow(newrow)
		empty = 3
	} else {
		widgets = createScorerow(newrow)
		empty = 4
	}
	//empty block
	let emptyCols = createEmptyCols(empty)
	//delete and order cols
	let [orderCol, delCol] = createColsOrderAndDelete(newrow.order, typerow)
	mainDiv = appendAllChild(mainDiv, colName, widgets, emptyCols, orderCol, delCol)
	insertAfter(divElement, mainDiv)
	//logic operator will be add to the block Row abowe it
	createLogic(logicoperator, newrow.order)
	//this is historic desigion only with Score type
	if (newrow.name === "Score") {
		onChangeScore("state", newrow.order)
	}
}

///////////////////////////////////////////////////////////////////////////////
//ADD FORM MANAGERS
///////////////////////////////////////////////////////////////////////////////
function onChangeAddForm(type) {
	//change orders list for state: time, score with each logicoperators
	let stateVal = document.getElementById(ADD_ID_SELECT_TYPE)
	let logicVal = document.getElementById(ADD_ID_SELECT_LOGIC)
	let orderSelect = document.getElementById(ADD_ID_SELECT_ADD_OREDER)
	//clear orders
	RowManager.allOrders = []
	RowManager.timeOROrders = []
	RowManager.scoreOROrders = []
	RowManager.timeANDOrders = []
	RowManager.scoreANDOrders = []
	let orderList = []
	if (type === "state") {
		//by default will set for logic "OR"
		if (stateVal.value === "time") {
			if (logicVal.value === "or") {
				RowManager.calculateTimeOrOrders()
				orderList = RowManager.timeOROrders
			} else if (logicVal.value === "and") {
				RowManager.calculateTimeAndOrders()
				orderList = RowManager.timeANDOrders
			} else {
				console.warn("Not correct logic value for Time")
			}
		} else if (stateVal.value === "score") {
			//by default set for "OR"
			if (logicVal.value === "or") {
				RowManager.calculateScoreOrOrders()
				orderList = RowManager.scoreOROrders
			} else if (logicVal.value === "and") {
				RowManager.calculateScoreAndOrders()
				orderList = RowManager.scoreANDOrders
			} else {
				console.warn("Not correct logic value Score")
			}
		}
		//set "OR" logic
		// logicVal.options[1].selected = true
		if (RowManager.childrens.length === 0) {
			//set logic "AND"
			logicVal.options[0].selected = true
			//set orderList "1"
			orderList = ["1"]
		}
	} else if (type === "logic" && logicVal.value === "or" ) {
		if (stateVal.value === "time") {
			RowManager.calculateTimeOrOrders()
			orderList = RowManager.timeOROrders
		} else if (stateVal.value === "score") {
			RowManager.calculateScoreOrOrders()
			orderList = RowManager.scoreOROrders
		}
		//update 
	} else if (type === "logic" && logicVal.value === "and") {
		if (stateVal.value === "time") {
			//Time row can be added only to "branch" with no Time row
			RowManager.calculateTimeAndOrders()
			orderList = RowManager.timeANDOrders
		} else if (stateVal.value === "score") {
			//Score row can be add to any Row
			RowManager.calculateScoreAndOrders()
			orderList = RowManager.scoreANDOrders
		}
	}
	//set logic list to Order widget
	validateAddFormByOrder(orderSelect, orderList)
}

function validateAddFormByOrder(selectOrderNode, orderList) {
	let divAddBlock = document.getElementsByName("addcolumnform").item(0)
	let buttonSubmit = document.getElementById(ADD_BUTTON_ID)
	if (orderList.length === 0) {
		//set danger border
		divAddBlock.className = ADD_CLASS_BORDER_INVALID
		//show warning message for order
		selectOrderNode.className = ADD_ORDER_CLASS_INVALID
		//set disabled button
		buttonSubmit.disabled = true
	} else {
		divAddBlock.className = ADD_CLASS_BORDER_VALID
		selectOrderNode.className = ADD_ORDER_CLASS_VALID
		buttonSubmit.disabled = false
	}
	rewriteOrders(selectOrderNode, orderList)
}

function setInitialAddForm() {
	let addFilterType = document.getElementById(ADD_ID_SELECT_TYPE)
	let addLogic = document.getElementById(ADD_ID_SELECT_LOGIC)
	let addOrder = document.getElementById(ADD_ID_SELECT_ADD_OREDER)
	addOrder.disabled = false
	//set logic "OR" by default
	addLogic.options[1].selected = true
	//logic make editable or no
	//if layout state is NOT!!! "soon" logic can be any(OR or AND)
	if (RowManager.state != STATE_SELECT_OBJ.s) {
		//pass
		addLogic.disabled = false
	//if layout state "soon" logic can be only "OR"
	} else {
		addLogic.disabled = true
	}
	//creates new orders
	RowManager.allOrders = []
	RowManager.timeOROrders = []
	RowManager.scoreOROrders = []
	let orderList = []
	//check wich type of row in first line childrens
	//because by default will set up "Or" order list
	//and it it can be avaliable only for same type row
	//set OR option selected
	addLogic.options[1].selected = true
	if (RowManager.childrens[0].name === "Score") {
		RowManager.calculateScoreOrOrders()
		orderList = RowManager.scoreOROrders
		//set score + or layout
		addFilterType.options[1].selected = true
	} else if (RowManager.childrens[0].name === "Time") {
		RowManager.calculateTimeOrOrders()
		orderList = RowManager.timeOROrders
		//set time + or layout
		addFilterType.options[0].selected = true
	} else {
		console.warn("Not correct type in initial function")
	}
	rewriteOrders(addOrder, orderList)
}

//validation ADD FORM
function rewriteOrders(selectNode, neworderslist) {
	// delete previous orders
	while (selectNode.options.length) {
		selectNode.options.remove(0)
	}
	for (let i = 0; i < neworderslist.length; i++) {
		let optionAttrs = {
			"innerHTML": neworderslist[i],
			"value": i
		}
		let option = createTagWithAttrs("option", optionAttrs)
		selectNode.appendChild(option)
	}
}
///////////////////////////////////////////////////////////////////////////////
//TIME ROW
///////////////////////////////////////////////////////////////////////////////
//create Time Row
function createTimerow(rowobj) {
	let ststusValue = document.getElementById(STATE_SELECT_ID).value
	switch (ststusValue) {
		//time values will be numbers
		case "n":
		case "a":
			inputType = INPUT_TYPE_OBJ.n
			rowobj.timetype = TIME_SELECT_STATUS_OBJ.n
			break
		//time values will in time format
		case "s":
		case "f":
			inputType = INPUT_TYPE_OBJ.t
			rowobj.timetype = TIME_SELECT_STATUS_OBJ.t
			break
		default:
			//by default time row will create for matches onlin-"now"
			//time values will be numbers
			inputType = INPUT_TYPE_OBJ.n
			rowobj.timetype = TIME_SELECT_STATUS_OBJ.n
	}
	//set default params for RowObj same with layout
	//col select match type
	let matchTypeChoicesDiv = createChoices("time" ,rowobj.order, ststusValue)
	//col from
	//col to
	let [from, to] = createTimeRangeBlock(inputType, rowobj.order)
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
function createScorerow(rowobj) {
	//by default creates with type choice == total
	let type =       createChoices("score", rowobj.order)//type choices: total, home, guest, compairson
	let compairson = createChoices("compair", rowobj.order)//==, <, > ...
	//div input
	let divInput = createTagWithAttrs("div", {"class": CLASS_COL_MD_1})
	let labelAttrs = {
		"for": SCORE_ID_INPUT_SCORE + rowobj.order,
		"innerHTML": "Score:"
	}
	let labelinput = createTagWithAttrs("label", labelAttrs)
	let inputAttrs = {
		"id": SCORE_ID_INPUT_SCORE + rowobj.order,
		"name": SCORE_NAME_INPUT_SCORE + rowobj.order,
		"min": 0,
		"max": 20,
		"required": "",
		"type": "number",
		"class": CLASS_INPUT,
		"value": 0,
		"onchange" : `onChangeScore("score", "${rowobj.order}")`
	}
	let scoreinput = createTagWithAttrs("input", inputAttrs)
	divInput = appendAllChild(divInput, labelinput, scoreinput)
	//set default value
	rowobj.scoretype = RowManager.avaliableScoreChoicesObj[Object.keys(RowManager.avaliableScoreChoicesObj)[0]]//"total"//the value is by default
	return [type, compairson, divInput]
}

///////////////////////////////////////////////////////////////////////////////
//MANAGERS
///////////////////////////////////////////////////////////////////////////////
function manageAddFormByStateRow() {
	//call from html form in ROW STATE block
	//the function gives name for initial row of state
	//and set parameters for ADD block
	let nameStatus = document.getElementById(STATE_ID_NAME)
	let stateVal = document.getElementById(STATE_SELECT_ID)
	let filterchoices = document.getElementById(ADD_ID_SELECT_TYPE)
	let logic = document.getElementById(ADD_ID_SELECT_LOGIC)
	//set AND logic option
	logic.options[0].selected = true
	logic.disabled = true
	filterchoices.options[0].selected = true
	// filterchoices.disabled = false
	if (stateVal.value == "s") {
		//only time row avaliable
		filterchoices.disabled = true
		nameStatus.value = "matches coming soon"
	} else if(stateVal.value == "a") {
		nameStatus.value = "all matches today"
		filterchoices.disabled = false
	} else if (stateVal.value == "n") {
		nameStatus.value = "current matches today"
		filterchoices.disabled = false
	} else if (stateVal.value == "f") {
		nameStatus.value = "completed matches today"
		filterchoices.disabled = false
	}
	//set state for RowManager
	RowManager.state = stateVal.options[stateVal.selectedIndex].text
	//set OrdesChoices = ["1"]
	let orderWidget = document.getElementById(ADD_ID_SELECT_ADD_OREDER)
	rewriteOrders(orderWidget, ["1"])
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
	let obj = RowManager.getRowObjectByOrder(order)
	obj.timetype = TIME_SELECT_STATUS_OBJ[timetype.value]
}

function setPropertyDisabledForRow(order, isDisabled=true) {
	//get div row and make disabled all input widgets
	let rowDiv = document.getElementById(ID_ROW+order)
	for (child of rowDiv.children) {
		for (item of child.children) {
			if (isEditableDisabledOfNode(item.name)) {
				item.disabled = isDisabled
			}
		}
	}
}

function isEditableDisabledOfNode(nodeName) {
	//if Node returns "undefined"
	if (nodeName == null) {
		return false
	}
	//all consts name without order
	let names = [
		SCORE_NAME_TYPE_SELECT,
		SCORE_NAME_INPUT_SCORE,
		SCORE_NAME_COMPAIR,
		SCORE_NAME_INPUT_HOME,
		SCORE_NAME_INPUT_GUEST,
		TIME_NAME_SELECT_STSTUS,
		TIME_NAME_FROM,
		TIME_NAME_TO,
		STATE_SELECT_NAME
		]
	for (name of names) {
		if (nodeName.includes(name)) {
			return true
		}
	}
	return false
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
	scoreinput.setAttribute("name",SCORE_NAME_INPUT_GUEST + order)
	scoreinput.setAttribute('onchange', `onChangeScore('foraguest','${order}')`)
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
	divEmpty.setAttribute("class", CLASS_COL_MD_1)
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
		"onchange": `onChangeScore('forahome', '${order}')`,
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
			node.className = CLASS_COL_MD_4
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
		// let scoreObj = RowManager.getRowObjectByOrder(order)
		// scoreObj.scoretype = 
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
		obj = RowManager.getRowObjectByOrder(order)
		obj.scoretype = SCORE_COMPAIR_TYPE_OBJ[scoretype.value]
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
		let compairVal = document.getElementById(SCORE_ID_COMPAIR_TYPE+order)

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
// delete childrens Nodes
///////////////////////////////////////////////////////////////////////////////
function deleteRow(order) {
	//delete Row with childrens from Row Manager
	let deletedObj = RowManager.extractRow(order)
	let orderList  = RowManager.deletedOrders

	//DELETE ROW ONE BY ONE FROM LAYOUT
	//delete Childrens and logicBlocks
	for (order of orderList) {
		//delete logicoperator block
		let logicBlok = document.getElementById(LOGIC_ID+order)
		//delete div with row by order
		let divBlock = document.getElementById(ID_ROW+order)
		logicBlok.remove()
		divBlock.remove()
	}
	//REDEFINE ORDERS FOR LAYOUT AND ROWMANAGER
	redefineOrders(deletedObj)
	RowManager.setDefaultValues()
	// // order = "1"//for test
	// //set editable parent block
	let parentOrder = deletedObj.parentorder
	if (RowManager.redefinedRows.length === 0) {
		//pass
		// setPropertyDisabledForRow(parentOrder, isDisabled=false)
	}
	if (RowManager.childrens.length > 0) {
		setInitialAddForm()
	} else {
		manageAddFormByStateRow()
	}
	// //set default RowManager params
}

function redefineOrders(deletedRow) {
	let m = RowManager.redefineRowsOrdersGenerator(deletedRow.order, deletedRow.parentorder, deletedRow.logicoperator)
	for (let counter = 0; counter < RowManager.redefinedRows.length; counter++) {
		let [logicValue, oldOrd, newOrd, typeRowValue] = m.next().value
		//redefine layout
		redefineCurentRowWithNewOrder(logicValue, oldOrd, newOrd, typeRowValue)
	}
}

function redefineCurentRowWithNewOrder(logicVal, oldord, neword, typerow) {
	//slice not includes last value === compair
	let name = (typerow === "time") ? typerow : "score"
	let typeSoreArray = Object.values(SCORE_COMPAIR_TYPE_OBJ).slice(0, 3)

	//redefine logic block
	let logic = document.getElementById(LOGIC_ID + oldord)
	//change class and text for 1_1 Row, its has to be AND by default for firs row after STATE
	if (neword === "1_1") {
		logic.lastElementChild.lastElementChild.innerText = "AND"
		logic.lastElementChild.lastElementChild.className = "alert alert-secondary col"
	}
	logic.setAttribute("name", logicVal + LOGIC_NAME + neword)
	logic.id = LOGIC_ID + neword

	//redefine Row
	let divRow = document.getElementById(ID_ROW + oldord)
	divRow.id = ID_ROW + neword

	//name
	let labelName = document.querySelector(`label[for=id_${name}_${oldord}]`)
	let nameInput = document.getElementById(`id_${name}_${oldord}`)
	labelName.htmlFor = "id_" + name + "_" + neword
	nameInput.id = "id_" + name + "_" + neword
	nameInput.setAttribute("name", logicVal + "_" + name + "_" + neword)

	//order
	let ordLabel = document.querySelector(`label[for="${oldord}"]`)
	let inputOrd = document.getElementById(oldord)
	ordLabel.htmlFor = neword
	inputOrd.id = neword
	inputOrd.name = name + "_order_" + neword
	inputOrd.setAttribute("value", neword)

	// delete
	let a = document.getElementById(ID_DELETE + oldord)
	a.setAttribute("onclick", `javascript:deleteRow("${neword}")`)
	a.id = ID_DELETE + neword

	//chenge order for differente Node
	if (typerow === "time") {
		//match type
		let labelMatchType = document.querySelector(`label[for=${TIME_ID_SELECT_STSTUS}${oldord}]`)
		let selectTimeType = document.getElementById(`${TIME_ID_SELECT_STSTUS}${oldord}`)
		labelMatchType.htmlFor = `${TIME_ID_SELECT_STSTUS}${neword}`
		selectTimeType.id = `${TIME_ID_SELECT_STSTUS}${neword}`
		selectTimeType.name = `${TIME_NAME_SELECT_STSTUS}${neword}`
		selectTimeType.setAttribute("onchange", `onChangeTime('time', '${neword}')`)
		//from
		let labelFrom = document.querySelector(`label[for=${TIME_ID_FROM}${oldord}]`)
		let inputFrom = document.getElementById(`${TIME_ID_FROM}${oldord}`)
		labelFrom.htmlFor = `${TIME_ID_FROM}${neword}`
		inputFrom.id = `${TIME_ID_FROM}${neword}`
		inputFrom.name = `${TIME_NAME_FROM}${neword}`
		inputFrom.setAttribute("onchange", `onChangeTime('from', '${neword}')`)
		//to
		let labelTo = document.querySelector(`label[for=${TIME_ID_TO}${oldord}]`)
		let inputTo = document.getElementById(`${TIME_ID_TO}${oldord}`)
		labelTo.htmlFor = `${TIME_ID_TO}${neword}`
		inputTo.id = `${TIME_ID_TO}${neword}`
		inputTo.name = `${TIME_NAME_TO}${neword}`
		inputTo.setAttribute("onchange", `onChangeTime('to', '${neword}')`)
	} else if (typerow == "compair" || typeSoreArray.includes(typerow)) {
		// type
		let labelScoreType = document.querySelector(`label[for=${SCORE_ID_TYPE_SELECT}${oldord}]`)
		let scoreType = document.getElementById(`${SCORE_ID_TYPE_SELECT}${oldord}`)
		labelScoreType.htmlFor = labelScoreType.htmlFor.replace(oldord, neword)
		scoreType.id = scoreType.id.replace(oldord, neword)
		scoreType.name = scoreType.name.replace(oldord, neword)
		scoreType.setAttribute("onchange", `onChangeScore('state', '${neword}')`)
		//compairson
		let labelScoreCompairson = document.querySelector(`label[for=${SCORE_ID_COMPAIR_TYPE}${oldord}]`)
		let compairsonSelect = document.getElementById(`${SCORE_ID_COMPAIR_TYPE}${oldord}`)
		labelScoreCompairson.htmlFor = labelScoreCompairson.htmlFor.replace(oldord, neword)
		compairsonSelect.id = compairsonSelect.id.replace(oldord, neword)
		compairsonSelect.name = compairsonSelect.name.replace(oldord, neword)
		compairsonSelect.setAttribute("onchange", `onChangeScore('compair', '${neword}')`)
		if (typerow == "compair") {
			let labelNode = null
			let inputNode = null
			//fora home and fora guest
			for (fora of [SCORE_ID_INPUT_HOME, SCORE_ID_INPUT_GUEST]) {
				typeOnChange = (fora === SCORE_ID_INPUT_HOME) ? "forahome" : "foraguest"
				labelNode = document.querySelector(`label[for=${fora}${oldord}]`)
				inputNode = document.getElementById(`${fora}${oldord}`)
				labelNode.htmlFor = labelNode.htmlFor.replace(oldord, neword)
				inputNode.id = inputNode.id.replace(oldord, neword)
				inputNode.name = inputNode.name.replace(oldord, neword)
				inputNode.setAttribute("onchange", `onChangeScore('${typeOnChange}', '${neword}')`)
			}
		} else {
			// score
			let labelScoreInput = document.querySelector(`label[for=${SCORE_ID_INPUT_SCORE}${oldord}]`)
			let scoreInputNode = document.getElementById(`${SCORE_ID_INPUT_SCORE}${oldord}`)
			labelScoreInput.htmlFor = labelScoreInput.htmlFor.replace(oldord, neword)
			scoreInputNode.id = scoreInputNode.id.replace(oldord, neword)
			scoreInputNode.name = scoreInputNode.name.replace(oldord, neword)
			scoreInputNode.setAttribute("onchange", `onChangeScore('compair', '${neword}')`)
		}
	} else {
		console.warn("Not correct type row...")
	}
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
	let divOrder = createTagWithAttrs("div", {"class" : CLASS_COL_MD_2})
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
		"id" : ID_DELETE + order,
		"class" : CLASS_DELETE,
		"innerHTML" : "Delete",
		"href" : "#",
		"onclick" : `javascript:deleteRow("${order}")`
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
	let color = (logicoperatorValue === "or") ? "danger":"secondary"
	let arrayFromOrder = order.split("_")
	let elem = document.createElement("div")
	elem.innerHTML = 
	`<div class="form-row mt-2" name="${logicoperatorValue + LOGIC_NAME + order}" id="${LOGIC_ID+order}">
		<div class="form-group col-md-${arrayFromOrder.length} mb-0">
		</div>
		<div class="form-group col-md-${12-(arrayFromOrder.length)} mb-0">
			<div class="alert alert-${color} col" role="alert">
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
			"onchange": `onChangeTime('time',"${order}")`
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
			// "choices": SCORE_COMPAIR_TYPE_OBJ,
			"choices": RowManager.avaliableScoreChoicesObj,
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

function getKeyValByValueInObj(val, obj) {
	return Object.keys(obj).find(item => obj[item] === val)
}

const range = (start, end, length = end-srart +1) =>
	Array.from({ length }, (_,i) => start + i)

window.onload = setDefaultState()