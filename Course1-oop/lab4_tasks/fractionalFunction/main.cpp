#include <iostream>

using namespace std;


int factorial(int x) {
    int result = 1;
    for(int i = 1; i <= x; i++) {
        result *= i;
    }
    return result;
}
int main()
{
    int num;
    cout<<"please enter the number: "<<endl;
    cin>>num;

    cout<<"factorial is: " <<factorial(num);
    return 0;
}

