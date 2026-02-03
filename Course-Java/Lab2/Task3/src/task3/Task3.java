/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task3;

/**
 *
 * @author mawad
 */
public class Task3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int[] largeArray = new int[1000];
        for (int i = 999; i >= 0; i--) {
            largeArray[i] = i+1; 
        }
        
        for(int i=0;i<largeArray.length;i++){
            int minIndex = i; 
            
            for(int j=i+1;j<largeArray.length;j++){
                if(largeArray[j] < largeArray[minIndex]){
                    minIndex = j;
                    
                }
            }
            int temp = largeArray[i];
            largeArray[i] = largeArray[minIndex];
            largeArray[minIndex] = temp;
        }
        MinMax array = new MinMax();
         long startTime = System.nanoTime();
        int maxValue = array.max(largeArray);
        long endTime = System.nanoTime();
        long maxDuration = endTime - startTime;
         System.out.println("Max value: " + maxValue);
         System.out.println("Time taken for max: " + maxDuration);
         
          startTime = System.nanoTime();
        int minValue = array.min(largeArray);
        endTime = System.nanoTime();
        long minDuration = endTime - startTime;
       
         System.out.println("Min value: " + minValue);
         System.out.println("Time taken for min: " + minDuration);
         
         BinarySerach binarySearch = new BinarySerach();
         int target = 150;
         startTime = System.nanoTime();
          int index = binarySearch.search(largeArray, target);
          endTime = System.nanoTime(); 
          long searchDuration = endTime - startTime;
          
           if (index != -1) {
                System.out.println("target found at index :" + index);
            } else {
                System.out.println("target not found!");
            }
                  System.out.println("Search time: " + searchDuration);


    }
    
}
