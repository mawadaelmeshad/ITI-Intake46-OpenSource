#include <iostream>

using namespace std;
int binarySearch(int arr[], int key, int sizee){
    int start=0;
    int endd=sizee-1;
    int mid;
    while(start<=endd){
        mid=(start+endd)/2;
           if(arr[mid]==key){
                return mid;
            }
            else if(arr[mid]<key){
                start=mid+1;
            }
            else{
                endd=mid-1;
            }

    }
    return -1;
}
int main()
{
    int arr[10]={1,2,3,4,5,6,7,8,9,10};
  cout<< binarySearch(arr, 5, 10);
    return 0;
}
