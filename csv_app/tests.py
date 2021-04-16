from csv_app.models import *
u1 = User.objects.first()
u2 = User.objects.all()[1]
# oneToOne relationship
pu1 = u1.userprofile
pu2 = u2.userprofile
ds1u1 = Dataschema.objects.create(profile=u1.userprofile, name="Data1")
ds1u2 = Dataschema.objects.create(profile=u2.userprofile, name="Data_1")
ds2u2 = Dataschema.objects.create(profile=u2.userprofile, name="Data_2")

u1.userprofile.dataschemas.all()
# OUTPUT <QuerySet [Data2, Data1]>

col1 = Column.objects.create(
	content_type=ContentType.objects.get(
		model=typstat.__class__.__name__.lower()
		),
	name="colWithTypeStat", 
	dataschema=dt, 
	order=1,
	object_id=typstat.id
	)
print(col1)
# OUTPUT <Column: colWithTypeStat>
col2 = Column.objects.create(
	content_type=ContentType.objects.get(
		model=typscore.__class__.__name__.lower()
		),
	name="colWithSoreCholdren",
	dataschema=dt,
	order=1,
	object_id=typscore.id,
	parent=col1
	)