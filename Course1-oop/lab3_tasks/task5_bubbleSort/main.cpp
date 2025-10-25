#include <iostream>

using namespace std;

int main()
{
    int arr[5];
    cout<<"Enter 5 elements of the array"<<endl;
    for(int i=0;i<5;i++){
        cin>>arr[i];
    }
    for (int i=0;i<4;i++) {
        for (int j=0;j<4;j++) {
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
        }
    }

    for (int i=0; i<5;i++) {
        cout<<arr[i]<<" ";
    }

    return 0;
}
