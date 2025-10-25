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
            arr= new int[size];
        }
        ~Stack(){
            cout<<"destruction...."<<endl;
            delete[] arr;
        }
        void push(int data){
            if(tos<size-1){
                tos++;
                arr[tos]=data;
            }
            else{
                cout<<"stack is full"<<endl;
            }

        }
        int pop(int& data){
            if(tos>-1){
                data=arr[tos];
                tos--;
                return 1;
            }
            else{
                 cout<<"stack is empty"<<endl;
                 return 0;
            }


        }

};

void Empty(Stack& s){
    int x=0;
    while(s.pop(x)==1){
        cout<<x<<endl;
    }

}

int main()
{
    int s;
    cout<<"Enter size of the stack"<<endl;
    cin>>s;

    Stack s1(s);

    for(int i=0;i<s;i++){
        s1.push(i);
    }

    cout<<"Removing all elements ...."<<endl;
   Empty(s1);

    return 0;
}
