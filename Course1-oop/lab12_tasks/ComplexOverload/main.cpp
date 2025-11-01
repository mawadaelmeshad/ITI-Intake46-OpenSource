#include <iostream>

using namespace std;

class Complex{
    int real;
    int img;
public:
    Complex(int _real, int _img){
        real=_real;
        img=_img;
    }
    Complex operator+(Complex c){
        Complex res(real+c.real,img+c.img);
        return res;

    }
    Complex operator+(int c){
        Complex res(real+c,img);
        return res;

    }
    int operator==(Complex c){
        return real==c.real && img==c.img;
    }
    int operator!=(Complex c){
        return real!=c.real && img!=c.img;
    }

    Complex operator++(){
      real++;
        return *this;
    }
    Complex operator++(int){
      Complex res(real,img);
      real++;
        return res;
    }
    explicit operator int(){
        return real;
    }

    void print(){
        if(img>0){
            cout<<real<<"+"<<img<<"i"<<endl;
        }
        else{
            cout<<real<<img<<"i"<<endl;
        }
    }
    friend Complex operator+(int num, Complex c);
};
Complex operator+(int num, Complex c){
    Complex res(c.real+num, c.img);
    return res;

}
int main()
{
   Complex c1(2,3),c2(4,5),c3(0,0),c4(0,0),c5(0,0);
   c3=c1+2;
   c4=c1+c2;
   c5=2+c2;
   cout<<"Complex , int :"<<endl;
   c3.print();
   cout<<"Complex , complex :"<<endl;
   c4.print();
   cout<<"int , complex:"<<endl;
   c5.print();
   if(c1==c2){
    cout<<"Equals"<<endl;
   }
   else if(c1!=c2){
    cout<<"Not Equals"<<endl;
   }
   cout<<"++:"<<endl;
   Complex old = ++c2;
   cout << "Old value: "; old.print();
   cout << "New value: "; c2.print();
   cout<<"_______Casting_____"<<endl;
   int res=int(c1);
   cout<<res<<endl;

    return 0;
}
