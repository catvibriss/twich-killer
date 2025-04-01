import random

# Список с секторами и их коэффициентами
sectors = ['2x', '3x', '10x', '20x']
multipliers = {'2x': 2, '3x': 3, '10x': 10, '20x': 20}

# Функция для выбора случайного сектора
def get_random_sector():
    return random.choice(sectors)

# Функция для расчета выигрыша
def calculate_win(bet, sector):
    multiplier = multipliers[sector]  # Получаем коэффициент для выбранного сектора
    # return bet * multiplier
    
# Основная функция для симуляции раунда
def start_round(bet):
    winning_sector = get_random_sector()  # Генерация выигрышного сектора
    win_amount = calculate_win(bet, winning_sector)  # Вычисление выигрыша
    print('Выигрышный сектор:', winning_sector)
    print('Ваша ставка:', bet)
    print('Ваш выигрыш:', win_amount)

# Пример использования
bet = float(input("Введите ставку: "))
start_round(bet)

