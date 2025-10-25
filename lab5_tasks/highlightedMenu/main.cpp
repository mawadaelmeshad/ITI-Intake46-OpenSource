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
int main()
{
    home:

    char menu [3][10] = {"new", "display" , "exit"};
    int index=0;
    char ch;
    int size;
    cout<<"\nEnter size of employees array: "<<endl;
    cin>>size;
    struct employee emps [size];
    for(int i=0;i<size;i++){
        emps[i].id= -1; //empty
        emps[i].age=0;
        strcpy(emps[i].name, ""); //empty name
    }

    do{
        system("cls");
        for(int i=0;i<3;i++){
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
            if(ch==80 && index < 2) index++; //down
            break;
        case 13:  //enter key

            if (index == 0) {
                    cout << "\nNew selected!" << endl;
                    cout<<"enter the index to insert at: "<<endl;
                    int idx;
                    cin>>idx;
                    if(emps[idx].id==-1){
                            cout<<"This place is empty , you can enter the data"<<endl;
                    }else{
                        cout<<"This place is not empty , we will override it"<<endl;
                    }

                    cout<<"Enter the id: "<<endl;
                    cin>>emps[idx].id;
                    cout<<"Enter the age: "<<endl;
                    cin>>emps[idx].age;
                    cout<<"Enter the name: "<<endl;
                    cin>>emps[idx].name;
                    cout<<"Data saved successfully"<<endl;
                    getch();
                    break;

            }
            if (index == 1){
                system("cls");
                cout << "\nDisplay sub menu selected!" << endl;
                char subMenu [size+1][10];
                int subIndex=0;
                char subCh;
                for(int i=0;i<size;i++){
                    if(emps[i].id==-1){
                        strcpy(subMenu[i], "Empty");
                    }
                    else{
                       strcpy(subMenu[i], emps[i].name);
                    }

                }

                strcpy(subMenu[size], "Home");

                // ========== SUB-MENU LOOP ==========
                do{
                    system("cls");
                    gotoxy(2,1);
                    cout << "DISPLAY SUB-MENU";

                    // Print sub-menu items (skip Empty)
                    int row = 0;
                    for(int i=0; i<=size; i++){

                        if(row == subIndex)
                            textattr(0x04);
                        else
                            textattr(0x07);

                        gotoxy(2, 3+row);
                        cout << subMenu[i];
                        row++;
                    }
                    textattr(0x07);

                    subCh = getch();
                    switch(subCh){
                    case -32:
                        subCh = getch();
                        if(subCh==72 && subIndex > 0) subIndex--; //up
                        if(subCh==80 && subIndex < size) subIndex++; //down
                        break;

                    case 13:  // Enter
                        if(subIndex < size && emps[subIndex].id != -1){
                            // Display Employee 0
                            system("cls");
                            cout<<"__________Employee  data________"<<endl;
                            cout<<"ID: "<<emps[subIndex].id<<endl;
                            cout<<"Name: "<<emps[subIndex].name<<endl;
                            cout<<"Age: "<<emps[subIndex].age<<endl;
                            getch();
                            break;
                        }

                        if(subIndex == size){  // back
                            goto home;
                        }
                        break;

                    case 27:  // ESC
                        break;
                    }
                }while(subCh!=27);

                // =================================================
            }


            if (index == 2) {
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
