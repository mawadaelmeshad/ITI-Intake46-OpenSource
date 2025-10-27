#include <iostream>
#include <windows.h>
#include <conio.h>
#include <cstring>

using namespace std;


void gotoxy(int x, int y) {
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}
void textattr(int color) {
        HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
        SetConsoleTextAttribute(hConsole, color);
}

struct employee{
    int id;
    int age;
    char name[10];
};


class Stack{

    employee* arr;
    int tos;
    int size;

    public:
        Stack(int _size=5){
            size=_size;
            tos=-1;
            arr= new employee[size];
             for(int i=0;i<size;i++){
                arr[i].id= -1; //empty
                arr[i].age=0;
                strcpy(arr[i].name, ""); //empty name
            }
        }
        ~Stack(){
            cout<<"destruction...."<<endl;
            delete[] arr;
        }
        void push(employee data){
            if(tos<size-1){
                tos++;
                arr[tos]=data;
            }
            else{
                cout<<"stack is full"<<endl;
            }

        }
        employee& getEmployee(int index){
            return arr[index];
        }
        int pop(employee& data){
            if(tos>-1){
                data=arr[tos];
                tos--;
                return 1;
            }
            else{
                 cout<<"stack is empty"<<endl;
                 return 0;
            }


        }

        bool peek(employee& data) {
            if (tos > -1) {
                data = arr[tos];
                return true;
            } else {
                cout << "Stack is empty" << endl;
                return false;
            }
        }

        void status() {
            if (tos == -1) {
                cout << "Stack is empty" << endl;
            } else if (tos == size - 1) {
                cout << "Stack is full" << endl;
            } else {
                cout << "Stack is neither empty nor full (" << (tos + 1) << "/" << size << " elements)" << endl;
            }
        }
        int getSize() const { return size; }
        int getTos() const { return tos; }

};


int main()
{
    home:

    char menu [5][20] = {"new", "display" , "Peak", "Status", "exit"};
    int index=0;
    char ch;
    int size;
    cout<<"\nEnter size of employees array: "<<endl;
    cin>>size;
    Stack emps(size);

    do{
        system("cls");
        for(int i=0;i<5;i++){
            if(i==index)
                textattr(0x04);
            gotoxy(2,3+i);
            cout<<menu[i];
            textattr(0x07);
        }
        ch=getch();
        switch(ch){
        case -32:
            ch=getch();
            if(ch==72 && index > 0) index--; //up
            if(ch==80 && index < 5) index++; //down
            break;
        case 13:  //enter key

            if (index == 0) {
                    cout << "\nNew selected!" << endl;
                    if (emps.getTos() >= emps.getSize() - 1) {
                        cout << "Stack is full! Cannot add more employees." << endl;
                        getch();
                        break;
                    }
                   employee newEmp;

                    cout<<"Enter the id: "<<endl;
                    cin>>newEmp.id;
                    cout<<"Enter the age: "<<endl;
                    cin>>newEmp.age;
                    cout<<"Enter the name: "<<endl;
                    cin>>newEmp.name;
                    emps.push(newEmp);
                    cout<<"Data saved successfully"<<endl;
                    getch();
                    break;

            }
            if (index == 1){
                system("cls");
                cout << "\nDisplay menu selected!" << endl;
                char subMenu [size+1][10];
               employee x;
                if(emps.pop(x)==1){
                    cout << "Popped employee data:" << endl;
                    cout << "ID: " << x.id << endl;
                    cout << "Name: " << x.name << endl;
                    cout << "Age: " << x.age << endl;
                }


                strcpy(subMenu[size], "Home");
            }
            if (index == 2) {
                system("cls");
                cout << "\nPeak selected!" << endl;
                employee topEmp;
                if (emps.peek(topEmp)) {
                    cout << "Top employee data:" << endl;
                    cout << "ID: " << topEmp.id << endl;
                    cout << "Name: " << topEmp.name << endl;
                    cout << "Age: " << topEmp.age << endl;
                }
                getch();
            }

            if (index == 3) {
                system("cls");
                cout << "\nStatus selected!" << endl;
                emps.status();
                getch();
            }

            if (index == 4) {
                cout << "\nExit selected!" << endl;
                return 0;
            }
            getch();
            break;

        case 27:
            break;
        }
       } while(ch!=27);

    return 0;
}
