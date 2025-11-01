#include <iostream>

using namespace std;
class StackOperands{

    double* arr;
    int tos;
    int size;

    public:
        StackOperands(int _size=20){
            size=_size;
            tos=-1;
            arr= new double[size];
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
        double pop(){
            if(tos>-1){
                return arr[tos--];
            }
            else{
                 cout<<"stack is empty"<<endl;
                 return 0;
            }


        }
         bool isEmpty(){
            return tos == -1;
        }


};
class StackOperators{

    char* arr;
    int tos;
    int size;

    public:
        StackOperators(int _size=20){
            size=_size;
            tos=-1;
            arr= new char[size];
        }
        ~StackOperators(){
            cout<<"destruction...."<<endl;
            delete[] arr;
        }
        void push(char data){
            if(tos<size-1){
                tos++;
                arr[tos]=data;
            }
            else{
                cout<<"stack is full"<<endl;
            }

        }
        char pop(){
            if(tos>-1){
                return arr[tos--];
            }
            else{
                 cout<<"stack is empty"<<endl;
                 return '\0';
            }


        }
        char peek(){
             if(tos>-1){
                return arr[tos];
            }
            else{
                return '\0';
            }
        }
         bool isEmpty(){
            return tos == -1;
        }


};



int precedence(char c){
    if(c=='*' || c=='/'){
        return 2;
    }
    else if(c=='+' || c=='-'){
        return 1;
    }
}

double applyOperation(double a, double b, char op){
    switch(op){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
    return 0;
}


void processOperator(StackOperands& operands, StackOperators& operators){
    char op = operators.pop();
    double b = operands.pop();  // Second operand (right side)
    double a = operands.pop();  // First operand (left side)
    double result = applyOperation(a, b, op);
    operands.push(result);
}


int main()
{
    char* number="1+3*2+(5-1)";
    StackOperators st1;
    StackOperands st2;
     for(int i=0;number[i]!='\0';i++){
        if(isdigit(number[i])){
           double num=0;
        while(number[i]!='\0' && isdigit(number[i])){
            num=num*10+(number[i] - '0');
            i++;
        }
            i--;
           st2.push(num);
        }
        else if(number[i]=='('){

           st1.push(number[i]);
        }
        else if(number[i]=='+' || number[i]=='-' || number[i]=='*' || number[i]=='/'){
            while(!st1.isEmpty() && st1.peek()!='(' && precedence(st1.peek())>= precedence(number[i])){
                    processOperator(st2,st1);
                  }
                  st1.push(number[i]);
        }


        else if(number[i]==')'){
            while(st1.peek()!='(' && !st1.isEmpty()){
                   processOperator(st2,st1);
              }
              if(!st1.isEmpty()){
                 st1.pop();
              }


        }

    }
    while(!st1.isEmpty()){
        processOperator(st2, st1);
    }

    double result = st2.pop();
    cout << "\nResult: " << result << endl;

//    char c;
//    while(st1.pop(c)){
//        cout<<c<<" ";
//    }
//   double num;
//   while(st2.pop(num)){
//     cout<<num<<" ";
//   }

//    int x;
//
//   if(st2.pop(x)==1){
//    cout<<x<<endl;
//   }
//   if(st2.pop(x)==1){
//    cout<<x<<endl;
//   }
//   if(st2.pop(x)==1){
//    cout<<x<<endl;
//   }
//   if(st2.pop(x)==1){
//    cout<<x<<endl;
//   }
//
//   char c;
//
// if(st1.pop(c)==1){
//    cout<<c<<endl;
//   }
//   if(st1.pop(c)==1){
//    cout<<c<<endl;
//   }
//   if(st1.pop(c)==1){
//    cout<<c<<endl;
//   }
//   if(st1.pop(c)==1){
//    cout<<c<<endl;
//   }




    return 0;
}
