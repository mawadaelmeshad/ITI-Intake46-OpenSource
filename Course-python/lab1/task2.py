# s= input("enter any string: ")
# for i in range(len(s)):
#     if s[i] == "i":
#         print(i)





number = input("enter any number: ")
if(number.isdigit()):
    number = int(number)
    count=0
    while(count<=number):
        print(count,"*",number,"=",count*number)
        count+=1
else:
    print("enter a valid number")