from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('', views.index, name='index'), 
    path('solve/', views.solve_puzzle, name='solve_puzzle'), 
    path('register/', views.register_user, name='register'), 
    path('login/', TokenObtainPairView.as_view(), name='login'),  
    path('protected/', views.protected_view, name='protected'),
]
