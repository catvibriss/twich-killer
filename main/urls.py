from django.urls import path
from .views import home, about, support, profile, roulette, balance, roulette_get, loginpage, regopage #,debug_more_money

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('support/', support, name='support'),
    path('profile/', profile, name="profile"),
    path('roulette/', roulette, name='roulette'),
    path('balance/', balance, name='balance'),
    path('roulette_get/', roulette_get, name="roulette_get"),
    path('yobaniuy_login/', loginpage, name="loginpage"),
    path('rego/', regopage, name="rego")
    # path('debug_more_money', debug_more_money, name="debug_more_money")
]
