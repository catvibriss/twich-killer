import random

def calculate_win(bet): 
    multi = random.randint(-50, 10)/10
    return bet * multi, multi # выигрыш и множитель

def start_round(bet):
    win_amount, m = calculate_win(bet)
    print('Ваша ставка:', bet)
    print('Ваш выигрыш:', win_amount)
    print(f'множитель: {m}')

bet = float(input("Введите ставку: "))
start_round(bet)

