#include <iostream>

using namespace std;

class Parent{
protected:
    int x;
    int y;

public:

    Parent(){
       x=2;
       y=4;
    }
    Parent(int _x, int _y){
        x=_x;
        y=_y;
    }
    virtual int add(){
        return x+y;
    }

};

class Child : public Parent{
protected:
    int z;

public:
    Child(int _z) : Parent(1,2),z(_z) {};
    int add(){
        return x+y+z;
    }

};
int main()
{
    Child c(3);
    cout << "Child add: " << c.add() << endl;
    Parent* ptr = &c;
    cout<<"Parent add : "<<ptr->add()<<endl;


     return 0;
}
