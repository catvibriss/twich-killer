import random
import time

def crash_game():
    print("Добро пожаловать в игру Crash!")
    print("Ваша задача: вывести ставку до того, как коэффициент упадет.")
    
    bet = float(input("Введите вашу ставку: "))

    multiplier = 1.0
    print("Ставка принята! Ждите начала игры...")
    max_mul = random.uniform(-52, 1)
    print(max_mul)
    time.sleep(2)

    # Симуляция роста коэффициента
    while multiplier > max_mul:
        multiplier += random.uniform(-0.1, -0.05)  # случайное увеличение коэффициента
        print(f"Коэффициент: {multiplier:.2f}")
        time.sleep(0.02)  # задержка, чтобы видеть прогресс
        stop = random.randint(0, 100)
        if stop == 52:
            print("stop")
            print(multiplier)
            print(bet*multiplier)
            break
    else:
        print("крашнуло на максимуме")

if __name__ == "__main__":
    crash_game()
