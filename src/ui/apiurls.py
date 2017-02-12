from django.conf.urls import url
from ui import views


urlpatterns = [
    url(r'^auth/permissions/$', views.permissions, name='permissions'),
]
