#include <iostream>

using namespace std;



int power(int x, int y) {
    int result=1;
  while(y--){
    result*=x;
  }
  return result;
}
int main()
{
    int num1,num2;
    cout<<"Enter first num: " <<endl;
    cin>>num1;
    cout<<"Enter second num: " <<endl;
    cin>>num2;

    cout <<"result is : "<< power(num1,num2) << endl;
    return 0;
}
