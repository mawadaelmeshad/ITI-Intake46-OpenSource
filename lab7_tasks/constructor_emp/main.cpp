#include <iostream>
#include <cstring>
using namespace std;

class emp{
private:
    int id;
    char name[10];
    int age;
    int salary;
public:
    emp(int _id, char* _name){
        id=_id;
        strcpy(name,_name);
    }
    emp(int _id, char* _name, int _age){
        id=_id;
        strcpy(name,_name);
        age=_age;
    }
    emp(int _id, char* _name, int _age, int _salary){
        id=_id;
        strcpy(name,_name);
        age=_age;
        salary=_salary;
    }
    void print(){
        cout<<"Id: "<<id<<endl;
        cout<<"name: "<<name<<endl;
        cout<<"age: "<<age<<endl;
        cout<<"salary: "<<salary<<endl;
        cout<<"_________________________"<<endl;
    }
};

int main()
{
    emp e1(1,"alaa");
    emp e2(2,"mawada",20);
    emp e3(3,"aliaa",25,2000);
    e1.print();
    e2.print();
    e3.print();


    return 0;
}
