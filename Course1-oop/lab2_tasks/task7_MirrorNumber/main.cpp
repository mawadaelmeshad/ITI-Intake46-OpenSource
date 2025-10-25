#include <iostream>

using namespace std;

int main()
{
    int number;
    cout << "Enter the number" << endl;
    cin>>number; //123
    int result=0;
    while(number!=0){ //12
        int digit = number % 10; //3   //2
        result=(result*10)+digit; //3  //32
        number/=10;  //12

    }
    cout<<"The reverse of the num is: "<< result<<endl;

    return 0;
}
