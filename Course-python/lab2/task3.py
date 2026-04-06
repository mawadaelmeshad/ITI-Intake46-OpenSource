def reverse(strr):
    if not strr.isalpha():
        return(print("enter valid string"))
    else:
        strReversed=""
        counter = len(strr)
        while counter:
            strReversed+=strr[counter-1]
            counter-=1
        
        return strReversed

print(reverse("jghhf"))