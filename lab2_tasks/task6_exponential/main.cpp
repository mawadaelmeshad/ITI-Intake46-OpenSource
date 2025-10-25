#include <iostream>

using namespace std;

int main()
{
    int num1,num2;
    cout << "Enter first number" << endl;
    cin>>num1;
    cout << "Enter second number" << endl;
    cin>>num2;
    int result=1;
    while(num2--){
        result*=num1;
    }
    cout<<"result is: "<<result<<endl;
    return 0;
}
