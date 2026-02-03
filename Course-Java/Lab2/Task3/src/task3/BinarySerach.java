/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package task3;

/**
 *
 * @author mawad
 */
public class BinarySerach {
    
     public int search(int[] array, int target) {
        
        int left = 0;
        int right = array.length - 1;
        
        while (left <= right) {
            int mid = (left + right) / 2;
            
            if (array[mid] == target) {
                return mid;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; 
    }
    
}
