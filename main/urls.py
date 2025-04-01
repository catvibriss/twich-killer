from django.urls import path
from .views import crash, crash_get, home, about, support, profile, roulette, balance, roulette_get, loginpage, regopage, money_add

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('support/', support, name='support'),
    path('profile/', profile, name="profile"),
    path('roulette/', roulette, name='roulette'),
    path('balance/', balance, name='balance'),
    path('roulette_get/', roulette_get, name="roulette_get"),
    path('money_add/', money_add, name="money_add"),
    path('yobaniuy_login/', loginpage, name="loginpage"),
    path('rego/', regopage, name="rego"),
    path('crash_get/', crash_get, name="crash_get"),
    path('crash/', crash, name="crash"),
    # path('debug_more_money', debug_more_money, name="debug_more_money")
]
