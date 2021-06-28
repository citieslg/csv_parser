import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


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
		# 	print('userprofile already exist')
		# else:


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
	isnew = models.BooleanField(default=True)
	# columns = models.ManyToManyField('Column', blank=True, related_name='related_dataschema')

	def __str__(self):
		return self.name

	def __repr__(self):
		return self.name

	# def get_data_set_for_user(self, user):
		# return self.objects.filter(owner=user)


# like Product
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


# ouput CSV file models and def-s
# def get_user_direct(instance):
# 	'''
# 	return PATH to CSVfile item
# 	used in class CSVfile field upload
# 	'''
# 	return '{0}/{1}/{2}{3}'.format(
# 			instance.dataschema.profile.user.slug,
# 			instance.self.dataschema.name,
# 			instance.date,
# 			instance.formatfile
# 			)


# class CSVfile():
# 	dataschema = models.ForeignKey(Dataschema, on_delete=models.CASCADE)
# 	formatfile = models.CharField(max_length=4, default='.csv')
# 	date = models.DateTimeField()
# 	upload = models.FileField(upload_to=get_user_direct)
# 	# is the CSV file was added to archive
# 	# celery will check is file was added to archive before
# 	# celery will check max lenth for every Datascheme and res of file
# 	# will add to archive
# 	isarchive = models.BooleanField(default=False)
# 	archivename = models.CharField(max_length=150, default='No archive method. Celery test system')
