from django.shortcuts import render
import requests
from django.shortcuts import redirect
from django.contrib.auth import login
from django.conf import settings
import json
import random
from django.http import JsonResponse

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

def roulette_get(request):
    rand = random.randint(0,100)
    res = {
        "success": 1,
        "out": rand
    }
    return JsonResponse(res)
