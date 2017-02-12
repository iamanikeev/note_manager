import uuid as uuid
from django.db import models

CATEGORIES = (
    ('L', 'Link'),
    ('R', 'Reminder'),
    ('N', 'Note'),
    ('TD', 'TODO'),
)


class Note(models.Model):

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey('auth.User', related_name='notes', on_delete=models.CASCADE)
    created_datetime = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=1000, blank=True)
    category = models.CharField(max_length=4, choices=CATEGORIES)
    chosen = models.BooleanField(default=False)



