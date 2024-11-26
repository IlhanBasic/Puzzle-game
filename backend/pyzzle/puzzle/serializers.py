from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']  # Polja koja želite da serijalizujete

    def create(self, validated_data):
        """
        Kreira korisnika sa validiranim podacima. Lozinka se treba sačuvati u hashovanom obliku.
        """
        user = User.objects.create_user(**validated_data)  # Koristi create_user za bezbedno dodavanje korisnika
        return user
