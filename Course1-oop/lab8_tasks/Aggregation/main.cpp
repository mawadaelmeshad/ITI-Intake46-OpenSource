#include <iostream>

using namespace std;
class Point{
public:
    int x;
    int y;
    Point(int _x, int _y){
        x=_x;
        y=_y;
    }
};

class Rectangle{
    Point* ul;
    Point* lr;
public:
    Rectangle(int x1, int y1, int x2, int y2){
        ul = new Point(x1,y1);
        lr = new Point(x2,y2);
    }
    Rectangle(Point* _ul, Point* _lr)  {
        ul=_ul;
        lr=_lr;
    }
    ~Rectangle() {
        cout<<"Destroying Rectangle...."<<endl;
        delete ul;
        delete lr;
    }
    void Print(){
        cout<<"Upper left corner is : ("<<ul->x<<","<<ul->y<<") and lower right corner is : ("<<lr->x<<","<<lr->y<<")"<<endl;
    }
};

class Circle{
    Point* p;
    int radius;

public:
    Circle(int _radius, int x, int y) {
        p = new Point (x,y);
        radius= _radius;

    }
    Circle(int _radius, Point* _p) :  radius(_radius), p(_p){
    }
    ~Circle() {
        cout<<"Destroying Circle...."<<endl;
        delete p;
    }
     void Print(){
        cout<<"the point is: ("<<p->x<<","<<p->y<<") and the radius is : "<<radius<<endl;
    }


};

class Triangle{
    Point* u;
    Point* lr;
    Point* ll;

public:
    Triangle (int x1, int y1, int x2, int y2, int x3, int y3){
        u = new Point (x1,y1);
        lr = new Point (x2,y2);
        ll = new Point (x3,y3);

    }
    Triangle(Point* _u, Point* _lr, Point* _ll) : u(_u), lr(_lr), ll(_ll) {
    }
    ~Triangle() {
        cout<<"Destroying triangle...."<<endl;
        delete u;
        delete lr;
        delete ll;
    }
    void Print(){
        cout<<"Upper corner is : ("<<u->x<<","<<u->y<<") and lower right corner is : ("<<lr->x<<","<<lr->y<<")"<<") and lower left corner is : ("<<ll->x<<","<<ll->y<<")"<<endl;
    }
};

int main()
{
    cout<<"______________ Rectangle _______________"<<endl;
    Point p1(2, 5);
    Point p2(6, 1);
    Rectangle rect(&p1, &p2);
    rect.Print();

    cout<<"______________ Circle _______________"<<endl;
    int radius=2;
    Circle c (radius, &p1);
    c.Print();

    cout<<"______________ Triangle _______________"<<endl;
    Point p3(3, 4);
    Triangle t(&p1, &p2, &p3);
    t.Print();


    return 0;
}
