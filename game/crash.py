import random
import time

def crash_game():
    print("Добро пожаловать в игру Crash!")
    print("Ваша задача: вывести ставку до того, как коэффициент упадет.")
    
    # Игрок делает ставку
    bet = float(input("Введите вашу ставку: "))
    
    # Начальный коэффициент
    multiplier = 1.0
    
    # Игроку нужно выбрать момент для вывода средств
    print("Ставка принята! Ждите начала игры...")
    time.sleep(2)

    max_mul = random.uniform(-52, 1)
    print(max_mul)
    time.sleep(2)
    # Симуляция роста коэффициента
    while multiplier > max_mul:
        multiplier += random.uniform(-0.1, -0.05)  # случайное увеличение коэффициента
        print(f"Коэффициент: {multiplier:.2f}")
        time.sleep(0.02)  # задержка, чтобы видеть прогресс
    print("крашнуло")
    return
    # Симуляция "крэша"
    crash_point = random.uniform(1.5, 2.5)
    
    if multiplier >= crash_point:
        print(f"Игра окончена! Коэффициент упал на {crash_point:.2f}")
        print(f"Вы проиграли {bet}.")
    else:
        print(f"Игра продолжилась до коэффициента {multiplier:.2f}.")
        print(f"Вы выиграли {bet * crash_point:.2f}!")
    
if __name__ == "__main__":
    crash_game()
