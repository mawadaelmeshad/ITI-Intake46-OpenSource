#include <iostream>
#include <cstring>

using namespace std;

struct student{
    int id;
    int age;
    char name[10];
};

void print(int id,int age,char name[]){
    cout<<id<<" "<<age<<" " <<name<<endl;
}
int main()
{
    struct student st1;
    int id,age;
    char name[10];
    cout<<"Enter id of the student : ";
    cin>>id;
    st1.id=id;
    cout<<endl;
    cout<<"Enter age of the student : ";
    cin>>age;
    st1.age=age;
    cout<<endl;
    cout<<"Enter name of the student : ";
    cin>>name;
    strcpy(st1.name,name);
    cout<<endl;

    print(st1.id,st1.age,st1.name);



    return 0;
}
