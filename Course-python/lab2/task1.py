
def generateArray(length, start):
    arr=[]
    for i in range(start, start+length):
        number=input("enter array number: ")
        if number.isdigit():
            arr.append(int(number))
            
        else:
            print("enter valid nmber")    
    print(arr)

generateArray(4,0)

