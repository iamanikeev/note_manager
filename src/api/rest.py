from django.contrib.auth import get_user_model
from rest_framework import viewsets, serializers, permissions, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

from .models import Note
from .permissions import IsOwner
from django.contrib.auth.models import User


#
# This file holds the REST related code
#


#################################################################################
#
#
#  SERIALIZERS : The serializers specify how the records are serialized in the
#                list or detail-views
#
#
#################################################################################


class NoteSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Note
        fields = ('uuid', 'created_datetime', 'title', 'category', 'text', 'chosen', 'owner')


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    notes = serializers.HyperlinkedRelatedField(many=True, view_name='note-detail', read_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'email', 'notes')


#################################################################################
#
#
#  VIEWSETS : Controllers for incoming requests. They access the model and return
#             the proper output
#
#
#################################################################################


class NoteViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        """
        Retreive user info from request parameters
        :param serializer: 
        :return: 
        """
        serializer.save(owner=self.request.user)


class CreateUserView(generics.CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


#################################################################################
#
# Register viewsets to REST router
#
#################################################################################


def register(restrouter):
    restrouter.register(r'notes', NoteViewSet)
