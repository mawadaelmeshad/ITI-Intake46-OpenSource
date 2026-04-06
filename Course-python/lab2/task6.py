total=0
count=0
while True:
    number = input("enter number of enter done : ")
    
    if number=="done":
        print(total , count , total/count)
        break
    elif number.isdigit():
        number = int(number)
        total+=number
        count+=1
    else:
        print("an error happened")
        
