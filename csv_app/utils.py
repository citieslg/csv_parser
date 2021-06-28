from csv_app.models import (Dataschema, 
							Column, 
							Typestatus, 
							Typetime, 
							Typescore, 
							User,
							ContentType)

def get_filters_dict(dict_request):
	# delete pairs of key value from request.QueryDict
	# to pass new dict to save it in DB
	deleted_keys = [ "name",
					 "column_separator",
					 "string_cherecter",
					 "csrfmiddlewaretoken"]
	return {key:value for (key, value) in dict_request.items() \
			if key not in deleted_keys}

def save_filters(dict_request, user_name, name_schema):
	'''
	save filters to db
	'''
	# key patterns for dict_request
	# STATE ROW CONST
	STATE_SELECT = "name_select_state_1"
	# TIME ROW CONST
	TIME_SELECT = "match_type_"
	TIME_INPUT_FROM = "time_name_from_"
	TIME_INPUT_TO = "time_name_to_"
	# STATE ROW CONST
	SCORE_SELECT = "score_type_select_"
	SCORE_COMPAIR = "compair_"
	# total, home, guest consts
	SCORE_INPUT_VALUE = "score_input_name_"
	# compairson consts
	SCORE_INPUT_HOME = "score_name_home_"
	SCORE_INPUT_GUEST = "score_name_guest_"
	#COLUMN NAMES
	INIT = 'Select matches '
	#time dict
	TIME_NAME = {
		'n': "Filter from matches now from valfrom to valto",
		't': "Filter  matches from time table from valfrom to valto"
	}
	# score name dicts
	SCORE_NAME_COMMON = "Filter all mathes where "
	# create init Col which is parent for otherone
	# get Userprofile inst
	userprofile = User.objects.get(username=user_name).userprofile
	# get Schema
	DATA_SCHEMA = \
		Dataschema.objects.filter(profile=userprofile).get(name=name_schema)
	# create Typestatus row
	# get value from dict_request
	col_type_item = dict_request.pop(STATE_SELECT)
	type_status_obj = Typestatus.objects.create(matchestate=col_type_item)
	# set name. Typestatus.STATES has all avliable names
	name = f'{INIT}{dict(Typestatus.STATES).get(col_type_item)}'
	column_obj = Column.objects.create(
		logicoperator = 'and',
		name = name,
		order = "1",
		dataschema = DATA_SCHEMA,
		content_object=type_status_obj
		)
	# init list with orders
	saved_parent_order_list = [(1,)]
	is_list_not_empty = True
	# this while goes throught orders to append +1 to last element in the order
	while is_list_not_empty:
		#extract first element
		order = saved_parent_order_list.pop(0)
		# get column to set it as parent for next col if exists
		parent_obj = DATA_SCHEMA.related_column.get(order=\
											"_".join((str(i) for i in order)))
		#add '1' to end of typle
		order = list(order) + [1]
		is_next = True
		# this while goes throw orders to add +1 to last element in the order
		while is_next:
			no_error = True
			str_order = "_".join((str(i) for i in order))
			# try parse Typetime
			try:
				time_type = dict_request.pop(f'{TIME_SELECT}{str_order}')
				time_from = dict_request.pop(f'{TIME_INPUT_FROM}{str_order}')
				time_to = dict_request.pop(f'{TIME_INPUT_TO}{str_order}')
				type_obj = Typetime.objects.create(
					match_status = time_type,
					valfrom = str(time_from),
					valto = str(time_to))
				# define name for new Col obj
				name = TIME_NAME.get(time_type)
				name = name.replace("valfrom", time_from)
				name = name.replace("valto", time_to)
			except KeyError:
				# else try parse Typescore
				try:
					score_type = dict_request.pop(f'{SCORE_SELECT}{str_order}')
					# filter_name = dict_request.pop(f'{SCORE_SELECT}{str_order}')
					score_compair = \
						dict_request.pop(f'{SCORE_COMPAIR}{str_order}')
					val_score, val_first, val_second = False, False, False
					if dict_request.get(f'{SCORE_INPUT_VALUE}{str_order}'):
						val_score = \
							dict_request.pop(f'{SCORE_INPUT_VALUE}{str_order}')
						tail_score_name = dict(Typescore.TOTAL).get(score_type)+\
										'score ' + score_compair + val_score
					else:
						val_first = \
							dict_request.pop(f'{SCORE_INPUT_HOME}{str_order}')
						val_second = \
							dict_request.pop(f'{SCORE_INPUT_GUEST}{str_order}')
						tail_score_name = 'score ' + val_first + score_compair +\
										' guest score ' + val_second
					name = f'{SCORE_NAME_COMMON}{tail_score_name}'
					# create Typescore onj
					type_obj = Typescore.objects.create(
							score = score_type,
							comparison = score_compair,
							valfirst = \
								int(val_score) \
								if score_type in ['t', 'h', 'g'] \
								else int(val_first),
							valsecond = val_second if score_type == 'c' else 0)
				except KeyError:
					is_next, no_error = False, False
			if no_error:
				cl = Column.objects.create(
						logicoperator='or',
						name=name,
						order=str_order,
						dataschema=DATA_SCHEMA,
						content_object=type_obj,
						parent=parent_obj
						)
				# add new order to saved_parent_order_list
				saved_parent_order_list.append(tuple(order.copy()))
				# try to find next
				order[-1] = order[-1] + 1
		# check is list Empty
		is_list_not_empty = True if len(saved_parent_order_list) > 1 else False




