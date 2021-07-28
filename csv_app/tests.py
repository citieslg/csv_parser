from .models import Dataschema
ds = Dataschema.objects.first()
ds.get_columns()
