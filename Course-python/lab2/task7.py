import random
words=["mawada" , "mawadaa", "mawadaaa"]
word= random.choice(words)
name = input("enter your name : ")
print("*****************")
guess= input("guess any alphabet : ")
print("*****************")

if not guess.isalpha():
    print("enter valid alphabet")
    print("*****************")

    guess = input("guess any alphabet : ")
trial=1
guessed = ""
won=False
while trial!=7:
    done = True
    for letter in word:
        if letter not in guessed:
            done = False
            break
    if word==guess or done:
        print("congrats you won")
        won=True
        break
    elif word.count(guess) > 0 and len(guess)==1:
        if guess in guessed :
            print("you guessed this character before")
            guess = input("guess any alphabet : ")
            continue
            
        else:
            print("you guessed correctly")
            guessed+=guess
            for i in range(len(word)):
                if word[i] in guessed:
                    print(word[i], end="")
                else:
                    print("_", end="")
            print()
            done = True
            for letter in word:
                if letter not in guessed:
                    done = False
                    break
        
    else:
        print("wrong guess","turns left : ", 7 - trial)
        print("*****************")
        trial+=1
    guess= input("guess another alphabet : ")
    if not guess.isalpha():
        print("enter valid alphabet")
        guess= input("guess another alphabet : ")

if not won : 
    print("game over!")


