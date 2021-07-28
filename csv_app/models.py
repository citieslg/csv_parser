import os
import uuid
import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.conf import settings


def create_user_dir(user_pk):
	os.mkdir(os.path.join(settings.MEDIA_ROOT, str(user_pk)))

def create_folder_for_schema(user_pk, schema_name):
	os.mkdir(os.path.join(
		settings.MEDIA_ROOT,
		str(user_pk),
		str(schema_name)
		)
	)

def add_style_to_filters_name(name_val, order_val):
	order_val = "{0}{1}{2}".format("<strong class='text-success'>",
		order_val,
		"</strong>")
	new_name_val = ''
	start = False
	for leter in name_val:
		if (leter.isdigit() or leter in ("<",">", "=")) and start == False:
			new_name_val+="<strong class='text-danger'>" + leter
			start = True
		elif (leter.isdigit() == False and leter not in ("<",">", "=")) and start == True:
			new_name_val+="</strong>" + leter
			start = False
		else:
			new_name_val+=leter
	# because lase is number in name of cols
	new_name_val+="</strong>"
	output = '{0} with order {1}'.format(new_name_val, order_val)
	print(output)

	return output

# ouput CSV file models and def-s
def get_file_path(instance):
# 	'''
# 	return PATH to CSVfile item
# 	used in class CSVfile field upload
# 	'''
	return os.path.join(
		settings.MEDIA_ROOT,
		instance.dataschema.profile.user.pk,
		instance.dataschema.id,
		instance.created_date + '.csv'
		)

# Create your models here.
class User(AbstractUser):

	REQUIRED_FIELDS = ['password']

	slug = models.UUIDField(
		primary_key=True,
		default = uuid.uuid4,
		editable=False
		)

	def save(self,*args, **kwargs):
		'''
		the method create Userprofile for new user
		'''
		print('User save method')
		super().save(*args,**kwargs)
		if not getattr(self, 'userprofile', False):
			print('Userprofile not crated lets do it')
			Userprofile.objects.create(user=self)
			create_user_dir(self.pk)



class Userprofile(models.Model):
	user = models.OneToOneField(
		User,
		on_delete=models.CASCADE,
		primary_key=True
		)

	def __str__(self):
		return self.user.username

	def __repr__(self):
		return self.user.username


class Dataschema(models.Model):

	class Meta:
		ordering = ['-modifired']

	COLUMN_SEPARATOR = (
		(',','Comma'),
		(';','Semicolon'),
		)

	STRING_CHERECTER = (
		('\'','Single quotes'),
		('"','Double quates'),
		('`','Back quotes')
		)

	profile = models.ForeignKey(
		Userprofile,
		on_delete=models.CASCADE,
		related_name='dataschemas',
		related_query_name='dataschema',
		null=True
		)
	name = models.CharField(
		max_length=30,
		default='None'
		)
	column_separator = models.CharField(
		max_length=1,
		default=',',
		choices=COLUMN_SEPARATOR
		)
	string_cherecter = models.CharField(
		max_length=2,
		default='\'',
		choices=STRING_CHERECTER
		)
	modifired = models.DateTimeField(auto_now=True)
	getnew = models.BooleanField(default=False)
	schema_folder = models.CharField(max_length=150,default='')

	def get_last_csv(self):
		try:
			csv = self.csvfile_set.filter(dataschema=self).first()
			csv = csv.created_date
		except:
			csv = "No data"
		return csv


	def __str__(self):
		return self.name

	def __repr__(self):
		return self.name

	def save(self,*args, **kwargs):
		# create a folder for Schema
		create_folder_for_schema(self.profile.user.pk, self.name)
		self.schema_folder = '{}/{}'.format(self.profile.user.pk, self.name)
		super().save(*args, **kwargs)

	def get_coll_childrens(self, childrens, list_copy=[], counter=0):
		for i in range(len(childrens)):
			if len(childrens[i].children.all()) > 0:
				list_copy.append(add_style_to_filters_name(childrens[i].name, childrens[i].order))
				self.get_coll_childrens(childrens[i].children.all(), list_copy, counter+1)
				list_copy = list_copy.copy()[:counter + 1]
			else:
				tail = list_copy.copy()
				tail.append(add_style_to_filters_name(childrens[i].name, childrens[i].order))
				self.list_columns.append(tail)


	def get_columns(self):
		self.list_columns = []
		column = []
		first = self.related_column.all().get(order=1)
		print("First colummn name = ", first.name)
		data = first.children.all()
		column.append(first.name)
		if len(data) > 0:
			self.get_coll_childrens(data, column)
		else:
			self.list_columns = [column]
		return self.list_columns


class Column(models.Model):
	LOGICAL_OPERATOR = (
		('or', 'OR'),
		('and', 'AND')
		)
	# if model child then choose logical operator
	logicoperator = models.CharField(
		blank=True,
		null=True,
		max_length=3,
		choices=LOGICAL_OPERATOR
		)
	name = models.CharField(max_length=100, default='column name')
	order = models.CharField(max_length=20, default='')
	dataschema = models.ForeignKey(
		Dataschema,
		on_delete=models.CASCADE,
		related_name='related_column',
		blank=True,
		null=True
		)
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey('content_type', 'object_id')
	# here we  have to define content type object
	# typecolumn = models.ForeignKey(
	# 	'Typecolumn',
	# 	on_delete=models.CASCADE,
	# 	blank=True)
	parent = models.ForeignKey(
		'self',
		null=True,
		blank=True,
		related_name='children',
		db_index=True,
		on_delete=models.SET_NULL
		)

	def __str__(self):
		return self.name

	def save(self, instance=None, *args, **kwargs):
		if instance:
			content_type = ContentType.objects.get(
				model=instance.__class__.__name__.lower()
				),
			object_id = instance.id
		super().save(*args, **kwargs)


# like NoteBook, SmartFone
class Typestatus(models.Model):
	STATES = (
		('a', 'all'),
		('s', 'soon'),
		('n', 'now'),
		('f', 'finished') 
		)
	# redefine as a content type object
	matchestate = models.CharField(
		max_length=1,
		default='a',
		choices=STATES
		)


class Typetime(models.Model):
	STATUS_MATCH = (
		('n', 'now'),
		('t', 'time table')
		)
	match_status = models.CharField(
		max_length=1,
		default='n',
		choices=STATUS_MATCH
		)
	# have to pass to form CHOICES for diferent type of Typetime model
	valfrom = models.CharField(max_length=7,default='')
	valto = models.CharField(max_length=7,default='')


class Typescore(models.Model):
	TOTAL = (
		('t', 'total'),
		('h', 'home'),
		('g', 'guest'),
		('c', 'compair')
		)
	COMPAIR = (
		('==','=='),
		('<=','<='),
		('>=','>='),
		('>','>'),
		('<','<'),
		)
	score = models.CharField(
		max_length=1,
		default='a',
		choices=TOTAL
		)
	comparison = models.CharField(
		max_length=2,
		default='==',
		choices=COMPAIR
		)
	# from if total, home, guest only valfirst is set
	valfirst = models.IntegerField(default=0)
	# to
	valsecond = models.IntegerField(default=0)


class XMLfile(models.Model):

	@classmethod
	def setIsnewFalse(cls):
		obj = cls.objects.first()
		print(type(obj))
		if obj:
			print("obj exists")
			obj.isnew = False
			super(XMLfile, obj).save()

	class Meta:
		ordering = ['-created_date']

	created_date = models.DateTimeField(auto_now_add=True)
	isnew = models.BooleanField(default=True)
	total_events = models.IntegerField(default=0)
	events_now = models.IntegerField(default=0)
	events_finished = models.IntegerField(default=0)
	future_events = models.IntegerField(default=0)

	def __str__(self):
		return str(self.created_date) + str(self.isnew)

	def __repr__(self):
		return str(self.created_date) + str(self.isnew)

	def save(self, *args, **kwargs):
		self.setIsnewFalse()
		super().save(*args, **kwargs)


class CSVfile(models.Model):

	@classmethod
	def setIsnewFalse(cls, schema_id):
		obj = cls.objects.filter(dataschema=schema_id).first()
		if obj:
			obj.isnew = False
			super(CSVfile, obj).save()

	class Meta:
		ordering = ['-created_date']

	created_date = models.DateTimeField(auto_now_add=True)
	upload = models.FileField(upload_to=get_file_path)
	total_events = models.IntegerField(default=0)
	selected_evets = models.IntegerField(default=0)
	dataschema = models.ForeignKey(Dataschema, on_delete=models.CASCADE)
	xmlfile = models.ForeignKey(XMLfile, on_delete=models.CASCADE)

	def __str__(self):
		return str(self.created_date)


	def __repr__(self):
		return str(self.created_date)

	# def save(self, *args, **kwargs):
	# 	self.setIsnewFalse(kwargs.pop('schema_id'))
	# 	super().save(*args, **kwargs)


class Parser(models.Model):

	lastdate = models.DateTimeField(blank=True, null=True)
	nextdate = models.DateTimeField(blank=True, null=True)
	interval = models.IntegerField(blank=True, null=True)
	randomval = models.IntegerField(blank=True, null=True)


