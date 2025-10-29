#include <iostream>

using namespace std;
class StackOperands{

    int* arr;
    int tos;
    int size;

    public:
        StackOperands(int _size=5){
            size=_size;
            tos=-1;
            arr= new int[size];
        }
        ~StackOperands(){
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
class StackOperators{

    char* arr;
    int tos;
    int size;

    public:
        StackOperators(int _size=5){
            size=_size;
            tos=-1;
            arr= new char[size];
        }
        ~StackOperators(){
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


int main()
{
    char number[100]="1+3*2+(5-1)";
    StackOperators st1;
    StackOperands st2;
    for(int i=0;i<100;i++){
        if(number[i]=='+' || number[i]=='-' || number[i]=='*' || number[i]=='/' || number[i]=='(' || number[i]==')' ){
            st1.push(number[i]);
        }
        else{
            st2.push(number[i]);
        }
    }




    return 0;
}
