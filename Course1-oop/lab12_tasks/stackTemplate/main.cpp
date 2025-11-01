#include <iostream>

using namespace std;
template <class t>
class Stack{
    t* arr;
    int tos;
    int size;

public:
    Stack(int _size=5){
        size=_size;
        tos=-1;
        arr=new t[size];
    }

    void Push(t data){
        if(tos<size-1){
            tos++;
            arr[tos]=data;
        }
        else{
            cout<<"Stack is full"<<endl;
        }
    }
     t pop(){
            if(tos>-1){
                t data=arr[tos];
                tos--;
                return data;
            }
            else{
                 cout<<"stack is empty"<<endl;
            }


        }
};

int main()
{
    cout<<"_____________int stack______________"<<endl;
    Stack<int> st(5);
    st.Push(5);
    st.Push(4);
    st.Push(3);
    st.Push(2);
    st.Push(1);
    cout<<st.pop()<<endl;
    cout<<st.pop()<<endl;
    cout<<st.pop()<<endl;
    cout<<st.pop()<<endl;
    cout<<st.pop()<<endl;

    cout<<"_____________Double stack______________"<<endl;

    Stack<double> st2(5);
    st2.Push(5.5);
    st2.Push(4.5);
    st2.Push(3.5);
    st2.Push(2.5);
    st2.Push(1.5);
    cout<<st2.pop()<<endl;
    cout<<st2.pop()<<endl;
    cout<<st2.pop()<<endl;
    cout<<st2.pop()<<endl;
    cout<<st2.pop()<<endl;

    cout<<"_____________char stack______________"<<endl;

    Stack<char> st3(5);
    st3.Push('a');
    st3.Push('b');
    st3.Push('c');
    st3.Push('d');
    st3.Push('e');
    cout<<st3.pop()<<endl;
    cout<<st3.pop()<<endl;
    cout<<st3.pop()<<endl;
    cout<<st3.pop()<<endl;
    cout<<st3.pop()<<endl;
    return 0;
}
