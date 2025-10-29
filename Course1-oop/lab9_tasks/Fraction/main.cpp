#include <iostream>

using namespace std;

int gcd(int num1,int num2){
    int a;
    int b;
    if (num1>num2){
            b=num1;
            a=num2;
    }
    else if(num2>num1){
            b=num2;
            a=num1;
    }
    while(b!=0){
        int temp=b;
        b=a%b;
        a=temp;
    }
    return a;

}

class Fraction{
    int num;
    int den;
public:
    Fraction(){
        num=1;
        den=2;
    }
    Fraction(int _num, int _den){
        num=_num;
        den=_den;
    }

public:
    void Print(){
        if(gcd(num,den)!=1){
            cout<<"The simplest fractional form is : "<<num/gcd(num,den)<<"/"<<den/gcd(num,den)<<endl;
        }
        else
        cout<<"The simplest fractional form is : "<<num<<"/"<<den<<endl;
    }
};

int main()
{
    int num1,num2;
    cout<<"Enter numerator: "<<endl;
    cin>>num1;
     cout<<"Enter denominator: "<<endl;
    cin>>num2;

    Fraction f(num1,num2);
    f.Print();

    return 0;
}
