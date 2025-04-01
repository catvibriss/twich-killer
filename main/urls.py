from django.urls import path
from .views import home, about, support, profile, roulette, balance

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('support/', support, name='support'),
    path('profile/', profile, name="profile"),
    path('roulette/', roulette, name='roulette'),
    path('balance/', balance, name='balance')
]
