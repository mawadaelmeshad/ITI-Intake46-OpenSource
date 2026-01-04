#include <iostream>
struct node{
    int id;
    node *left;
    node *right;
};
using namespace std;
class BST{
    node *root;

private:
    void insertRecursive(node *&r, node* t){
        if(r==nullptr){
            r=t;
        }
        else if(t->id < r->id){
            insertRecursive(r->left, t);
        }
        else{
            insertRecursive(r->right, t);
        }
    }
     int heightRecursive(node* r){
        if(r == nullptr){
            return -1;
        }
        int leftHeight = heightRecursive(r->left);
        int rightHeight = heightRecursive(r->right);

        if(leftHeight > rightHeight){
            return leftHeight + 1;
        }
        else{
            return rightHeight + 1;
        }
    }
     int depthRecursive(node* r, int id, int currentDepth){
        if(r == nullptr){
            return -1;
        }
        if(r->id == id){
            return currentDepth;
        }
        if(id < r->id){
            return depthRecursive(r->left, id, currentDepth + 1);
        }
        else{
            return depthRecursive(r->right, id, currentDepth + 1);
        }
    }
     node* Search(node* r, int &id){
        if(r==nullptr){
            return nullptr;
        }
        else if(id==r->id){
            return r;
        }
        else if(id<r->id){
            return Search(r->left, id);
        }
        else{
            return Search(r->right, id);
        }
    }

    void inOrder(node* r){
        if(r==nullptr){
            return;
        }
        inOrder(r->left);
        cout<<r->id<<" ";
        inOrder(r->right);
    }

    void preOrder(node* r){
        if(r==nullptr){
            return;
        }
        cout<<r->id<<" ";
        preOrder(r->left);
        preOrder(r->right);
    }

      void postOrder(node* r){
        if(r==nullptr){
            return;
        }
        postOrder(r->left);
        postOrder(r->right);
        cout<<r->id<<" ";
    }

    node* findParent(node* r, int id){
        if(r==nullptr || r->id== id){
            return nullptr;
        }
        if((r->left!= nullptr && r->left->id==id) ||
        (r->right!=nullptr && r->right->id==id)){
            return r;
        }
        if(id<r->id){
            return findParent(r->left, id);
        }
        else{
             return findParent(r->right, id);
        }

    }

    node* findMin(node *r){
        if(r==nullptr){
            return nullptr;
        }
        while(r->left !=nullptr){
            r=r->left;
        }
        return r;

    }
    node* findMax(node *r){
        if(r==nullptr){
            return nullptr;
        }
        while(r->right !=nullptr){
            r=r->right;
        }
        return r;

    }

    void deleteNode(int id){
        node* temp = Search(root, id);
        if(temp==nullptr){
            cout<<"node not found"<<endl;
            return;
        }
        node* parent= findParent(root, id);
        // case 1 : no children
        if(temp->left == nullptr && temp->right==nullptr){
            if(parent==nullptr){
                root=nullptr;
            }
            else if(parent->left == temp){
                parent->left=nullptr;
            }
            else{
                parent->right = nullptr;
            }
            delete temp;
            cout<<"deleted node : "<< id<<endl;
        }
        //case 2 : one child
        else if(temp->left==nullptr || temp->right==nullptr){
            node* child = (temp->left!=nullptr) ? temp->left : temp->right;
            if(parent== nullptr){
                root=child;
            }
            else if(parent->left==temp){
                parent->left=child;
            }
            else
            {
                parent->right=child;
            }
            delete temp;
            cout<<"deleted node : "<< id<<endl;
        }

        //case 3 : node has 2 children
        else{
                node* smallest = findMin(temp->right);
                int smallestId = smallest->id;
                deleteNode(smallestId);
                temp->id = smallestId;
                cout<<"deleted node : "<< id<<endl;


        }
    }



public:
    BST(){
        root=nullptr;
    }
    void insertt(int id){
        node * temp = new node();
        temp->right = temp->left = nullptr;
        temp->id= id;
        insertRecursive(root, temp);
    }
    void searchId(int id){
        Search(root, id);
    }

    void inorder(){
        inOrder(root);
    }
    void preorder(){
        preOrder(root);
    }
    void postorder(){
        postOrder(root);
    }
    void deleteId(int id){
        deleteNode(id);
    }
    void getHeight(int id){
         node* temp = Search(root, id);
         if(temp == nullptr){
            cout << "Node " << id << " not found!" <<endl;
            return;
        }
        int height = heightRecursive(temp);
        cout << "height is: " << height << endl;
    }

    void getDepth(int id){
        int depth = depthRecursive(root, id, 0);
        if(depth == -1){
            cout << "Node " << id << " not found!" << endl;
        }
        else{
           cout << "Depth of node " << id << ": " << depth <<endl;
        }
    }


};


int main()
{
    BST b1;
    b1.insertt(10);
    b1.insertt(5);
    b1.insertt(15);
    b1.insertt(3);
    b1.insertt(7);

    b1.searchId(10);



    cout << "Inorder: ";
    b1.inorder();
    cout<<endl;
    b1.deleteId(15);
    b1.getHeight(5);
    b1.getDepth(10);
    b1.getDepth(7);
    return 0;
}
