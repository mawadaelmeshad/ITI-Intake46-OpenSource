#include <iostream>

using namespace std;

int main()
{
    int arr[5];
    for(int i=0;i<5;i++){
        cout<<"Enter value of arr ["<<i<<"]"<<endl;
        cin>>arr[i];
    }
    int max=arr[0];
    int min=arr[0];
    int sum=0;
    for(int i=0;i<5;i++){
        sum+=arr[i];
        cout<<arr[i]<<endl;
    }

    for(int i=1;i<5;i++){
        if(arr[i]> max){
            max=arr[i];
        }
        if(arr[i]< min){
            min=arr[i];
        }
    }
    cout<<"Maximun number in the array is : " << max <<endl;
    cout<<"Minimun number in the array is : " << min <<endl;
     cout<<"The sum is : " << sum << endl;
    int searchTerm;
    int index;
    cout<<"Enter the search term"<<endl;
    cin>>searchTerm;
    for(int i=0;i<5;i++){

        if(arr[i]==searchTerm){
            index = i;
        }
    }
    cout<<"The element found at index : " << index << endl;


    return 0;
}
