#include <iostream>

using namespace std;

class Stack{
    int* arr;
    int tos;
    int size;

public:
    Stack(int _size=5){
        size=_size;
        tos=-1;
        arr=new int[size];
    }

    void Push(int data){
        if(tos<size-1){
            tos++;
            arr[tos]=data;
            cout<<data<<endl;
        }
        else{
            cout<<"Stack is full"<<endl;
        }
    }
     int pop(){
            if(tos>-1){
                int data=arr[tos];
                tos--;
                return data;
            }
            else{
                 cout<<"stack is empty"<<endl;
            }
    }
    void print(){
        for(int i=0;i<size;i++){
            cout<<arr[i]<<" ";
        }
    }
    bool operator==(Stack& s){
        bool flag=true;
        for(int i=0;i<size;i++){
                if(s.arr[i]!=this->arr[i]){
                    flag=false;
                }
                return flag;
        }
    }
    friend Stack operator+(Stack& s1, Stack& s2);
};

Stack operator+(Stack& s1, Stack& s2){
        Stack result(s1.size+s2.size);
        for(int i=0;i<s1.size;i++){
            result.arr[i]=s1.arr[i];
        }
        for(int i=0;i<s2.size;i++){
            result.arr[s1.size+i]=s2.arr[i];
        }
        return result;
}
int main()
{
   Stack st1(3);
   Stack st2(3);

   st1.Push(1);
   st1.Push(2);
   st1.Push(3);

   st2.Push(1);
   st2.Push(2);
   st2.Push(3);
   if(st1==st2){
    cout<<"Equals"<<endl;
   }
   Stack st3=st1+st2;
   cout<<"_____________Concatenation____________"<<endl;
   st3.print();

    return 0;
}
