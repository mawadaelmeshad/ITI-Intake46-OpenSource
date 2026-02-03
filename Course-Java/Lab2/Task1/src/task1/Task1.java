/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task1;

/**
 *
 * @author mawad
 */
public class Task1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
         String commandLine = "163.121.12.30";
         IPCutter cut = new IPCutter(commandLine);
         System.out.println("the output of string tokenizer is : " + commandLine);
         int [] splitted = cut.doIPSplit();
         for(int i=0;i<splitted.length;i++){
             System.out.println(splitted[i]);
         }
         
         String commandLine2 = "192.168.1.10";
         IPCutter cut2 = new IPCutter(commandLine2);
         System.out.println("the output of split is : " + commandLine2);
         int [] splitted2 = cut2.doIPSplitWithSplit();
         for(int i=0;i<splitted2.length;i++){
             System.out.println(splitted2[i]);
         }
         
    }
    
}
