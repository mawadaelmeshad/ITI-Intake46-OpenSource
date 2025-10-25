#include <iostream>

using namespace std;

int main()
{   string s ;
    cout << "Enter the sentence" << endl;
    getline(cin, s);
    int countWords=1;
    int countChars=0;
    for(int i=0;i<s.length();i++){
            if(int(s[i])== 32){
                countWords++;
            }
            else{
                countChars++;
            }

    }
    cout<<"number of words: "<<countWords<<endl;
    cout<<"number of chars: "<<countChars<<endl;
    return 0;
}
