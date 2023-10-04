from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# SERVE SINGLE PAGE APP
index = never_cache(TemplateView.as_view(template_name='index.html'))
