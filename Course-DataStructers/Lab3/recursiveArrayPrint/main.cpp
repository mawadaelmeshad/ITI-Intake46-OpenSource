#include <iostream>

using namespace std;

void printArray(int arr[], int index, int sizee){
    if(index==sizee){
        return;
    }
    else{
        printArray(arr, index+1,sizee);
        cout<<arr[index]<<endl;

    }
}

int main()
{
    int arr[10]={1,2,3,4,5,6,7,8,9,10};
    printArray(arr, 0, 10);
    return 0;
}
