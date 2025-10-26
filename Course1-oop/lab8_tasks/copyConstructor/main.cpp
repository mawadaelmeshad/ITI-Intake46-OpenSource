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
        // copy constructor
        Stack(Stack& st){
            size=st.size;
            tos=st.tos;
            arr= new int[size];
            for(int i=0;i<=tos;i++){
                arr[i]=st.arr[i];
            }
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
    s1.push(4);
    s1.push(5);
    s1.push(6);

    Stack s2(s1);
    int x=0;
    if(s2.pop(x)==1){
        cout<<x<<endl;
    }


    return 0;
}
