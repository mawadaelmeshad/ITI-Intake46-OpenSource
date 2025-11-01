#include <iostream>

using namespace std;


int gcd(int a,int b){
    a= abs(a);
    b=abs(b);
    if (b == 0) return a;

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
    void reduce() {
        int g = gcd(num, den);
        num /= g;
        den /= g;
    }
public:

    Fraction(){
        num=1;
        den=2;
        reduce();
    }
    Fraction(int _num, int _den){
        num=_num;
        den=_den;
        reduce();
    }
    Fraction operator+(Fraction& f1){
        int new_num =num*f1.den+den*f1.num;
        int new_den= den*f1.den;
        return Fraction(new_num,new_den);
    }
    Fraction operator+(int number){
        int new_num=number*den+1*num;
        int new_den= 1*den;
        return Fraction(new_num,new_den);
    }
    bool operator==(Fraction& f){
        return f.num==num && f.den==den;
    }
    bool operator!=(Fraction& f){
        return f.num!=num && f.den!=den;
    }
    Fraction operator++(){
        num+=den;
        return *this;
    }
    Fraction operator++(int){
        Fraction temp = *this;
        num += den;
        return temp;
    }
    friend Fraction operator+(int number,Fraction& f1);

    void Print(){

        cout<<"Result is : "<<num<<"/"<<den<<endl;
    }

};

Fraction operator+(int number,Fraction& f1){
    int new_num=number*f1.den+1*f1.num;
    int new_den= 1*f1.den;
    return Fraction(new_num,new_den);
}


int main()
{
    Fraction f(1,2);
    Fraction f2(3,5);
    Fraction f3=f2+f;
    f3.Print();
    Fraction f4=f2+2;
    f4.Print();
    Fraction f5=2+f2;
    f5.Print();
    Fraction f6(3,5);
    if(f6==f2){
        cout<<"Equals"<<endl;
    }
    if(f3!=f2){
        cout<<"Not Equals"<<endl;
    }
    cout<<"Postfix : "<<endl;
    Fraction f7=f3++;
    f7.Print();
    cout<<"Prefix : "<<endl;
    Fraction f8=++f3;
    f8.Print();
    return 0;
}
