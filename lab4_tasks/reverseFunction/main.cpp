#include <iostream>

using namespace std;


int reverse(int number){

    int result=0;
    while(number!=0){ //12
        int digit = number % 10; //3   //2
        result=(result*10)+digit; //3  //32
        number/=10;  //12
    }
    return result;
}
int main()
{
    int number;
    cout << "Enter the number" << endl;
    cin>>number; //123
    cout<<"mirror number is: "<< reverse(number);
    return 0;
}
