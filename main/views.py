from django.shortcuts import render
import requests
from django.shortcuts import redirect
from django.contrib.auth import login
from django.conf import settings
from django.http import HttpResponse
import json
import random
from django.http import JsonResponse
from django.template import loader

import csv

def home(request):
    return render(request, 'home.html')

def about(request):
    
    return render(request, 'about.html')

def support(request):
    return render(request, 'support.html')

def profile(request):
    return render(request, 'profile.html')

def roulette(request):
    bobra = request.COOKIES.get('usa')
    a = open("main/static/accounts3.csv", "r")
    redo = a.readlines()

    balance = 424242424242
    login = True

    print(redo)

    for x in redo:
        sp = x.rstrip().split(",")
        if sp[0] == bobra:
            balance = sp[1]
            login = False
    context = {
        'usa': bobra,
        'balance': balance,
        'login': login
    }
    return render(request, 'roulette.html', context=context)

def balance(request):
    return render(request, 'balance.html')

def roulette_get(request):
    rand = random.randint(0,100)
    res = {
        "success": 1,
        "out": rand
    }
    return JsonResponse(res)

def loginpage(request):
    if request.POST:
        a = open("main/static/accounts3.csv", "r")
        loga = request.POST["ABSOLUTELOGUIN"]
        redo = a.readlines()

        print(redo)

        for x in redo:
            sp = x.rstrip().split(",")
            print(sp, sp[0], loga, )
            if sp[0] == loga:
                response = redirect("/") # first Http Response
                response.set_cookie('usa', loga)
                return response
        a.close()
    return render(request, 'login.html')

def regopage(request):
    if request.POST:
        a = open("main/static/accounts3.csv", "a")
        regoo = request.POST["ABSOLUTELOGUIN"]
        a.write(f"{regoo},-1000\n")
        a.close()
    return render(request, 'rego.html')

def money_add(request):
    money = request.GET["amount"]

    bobra = request.COOKIES.get('usa')
    a = open("main/static/accounts3.csv", "r")
    redo = a.readlines()

    balance = 424242424242

    futurestring =""

    for x in redo:
        sp = x.rstrip().split(",")
        if sp[0] == bobra:
            balance = int(sp[1])+int(money)
        else: # TODO: remove
            balance = sp[1]
        futurestring += f"{sp[0]},{balance}\n"
    a.close()
    a = open("main/static/accounts3.csv", "w")
    a.write(futurestring)
    a.close()
    respo = {
        "status": "success"
    }
    return JsonResponse(respo)