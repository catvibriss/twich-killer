from django.shortcuts import render
import requests
from django.shortcuts import redirect
from django.contrib.auth import login
from django.conf import settings
from .models import CustomUser


def google_callback(request):
    """ Обработка входа через Google """
    user = request.user

    if user.is_authenticated:
        # Запрос к Google API для получения данных
        google_id = user.socialaccount_set.filter(provider='google').first().uid
        api_url = f"https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token={user.socialaccount_set.first().socialtoken_set.first().token}"
        response = requests.get(api_url).json()

        user.google_id = google_id
        user.avatar = response.get("picture", "")
        user.save()

    return redirect("/")

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def support(request):
    return render(request, 'support.html')

def profile(request):
    return render(request, 'profile.html')

def roulette(request):
    return render(request, 'roulette.html')

def balance(request):
    return render(request, 'balance.html')