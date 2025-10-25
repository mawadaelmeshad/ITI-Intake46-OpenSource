#include <iostream>
#include <windows.h>
#define row 2
#define col 2
using namespace std;


 void textattr(int color) {
        HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
        SetConsoleTextAttribute(hConsole, color);
}

int main()
{


    int arr[row][col];
    for(int i=0;i<row;i++){
        for(int j=0;j<col;j++){
            cout<<"enter the value of arr["<<i<<"]"<<"["<<j<<"]"<<endl;
            cin>>arr[i][j];
        }
    }

    //sum of each row
    int sum=0;
    for(int i=0;i<row;i++){
            textattr(0x07);
        for(int j=0;j<col;j++){
            cout<<arr[i][j]<<" ";
            sum+=arr[i][j];
        }
        textattr(0x71);
        cout<<sum<<" ";
        sum=0;
        cout<<endl;
    }

    //avg of each col

     for(int j=0;j<col;j++){
            int colSum=0;
        for(int i=0;i<row;i++){

            colSum+=arr[i][j];
        }
        textattr(0x71);
        cout<<colSum/row<<" ";
        textattr(0x07);
    }
    return 0;
}
