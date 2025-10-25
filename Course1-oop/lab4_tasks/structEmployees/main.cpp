#include <iostream>
#include <cstring>

using namespace std;

struct employee{
    int id;
    int age;
    char name[10];
};

void print(int id,int age,char name[]){
    cout<<id<<" "<<age<<" " <<name<<endl;
}
int main()
{
    struct employee emp[3];
    for (int i = 0; i < 3; i++) {
        cout << "Enter id: ";
        cin >> emp[i].id;

        cout << "Enter age: ";
        cin >> emp[i].age;

        cout << "Enter name: ";
        cin >> emp[i].name;
    }

    cout <<"\n--- All Employees ---" << endl;
    for (int i = 0; i < 3; i++) {
        print(emp[i].id, emp[i].age, emp[i].name);
    }



    return 0;
}
