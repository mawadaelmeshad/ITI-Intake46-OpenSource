#include <iostream>

using namespace std;
class Complex{
    int real;
    int img;
    static int counter;
public:

    Complex(int _real, int _img){
        real=_real;
        img=_img;
        counter++;
    }
    Complex(Complex& c){
        real=c.real;
        img=c.img;
        counter++;
    }
    ~Complex() {
        --counter;
    }


   static int getCounter(){
        return counter;
    }

};

int Complex::counter=0;


int myfun(Complex& c){
    Complex c1(1,2);
    Complex c2(2,3);
    cout<<"Inside "<<c.getCounter()<<endl;

}

int main()
{
   Complex c(4,5);
   Complex x(2,3);
   Complex y(1,2);
   cout<<"Before my fun :"<<c.getCounter()<<endl;
   myfun(x);
   cout<<"After my fun :"<<c.getCounter()<<endl;
    return 0;
}
