def alphaOrder(strr):

    longg = ""
    flag = strr[0]
    for i in range (1,len(strr)):
        if strr[i] > strr[i-1]:
            flag+=strr[i]
        else:
            if(len(flag)>len(longg)):
                longg=flag
            flag = strr[i]
    return longg

strr= input("enter your name: ")
if(not strr.isalpha):
    print("enter a valid name: ")
print(alphaOrder(strr))


