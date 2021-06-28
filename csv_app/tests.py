from csv_app.models import *
def get_usrs():
	upa = User.objects.first()
	up1 = User.objects.all()[1]
	return upa, up1
def crdataschema(u, name):
	return Dataschema.objects.create(profile=u.userprofile, name=name)
	# create cols
def typestatus():
	return Typestatus.objects.create(matchestate='a')

def typetime(f,t):
	return Typetime.objects.create(match_status='n', valfrom=f, valto=t)

def typescore(t, c, v1,v2):
	return Typescore.objects.create(score=t, comparison=c, valfirst=v1, valsecond=v2)

def createcol(n, order, ds, co, child_col, parent = False):
	ct = ContentType
	if parent:
		return Column.objects.create(logicoperator="and",
								name=n,
								order=order,
								dataschema=ds,
								content_object=co,
								parent=parent
								)
	else:
		return Column.objects.create(logicoperator="and",
								name=n,
								order=order,
								dataschema=ds,
								content_object=co,
								)



def deletall():
	Dataschema.objects.all().delete()
	Column.objects.all().delete()
	Typetime.objects.all().delete()
	Typestatus.objects.all().delete()
	Typescore.objects.all().delete()

