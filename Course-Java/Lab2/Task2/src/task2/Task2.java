/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task2;

/**
 *
 * @author mawad
 */
public class Task2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String sentence = "java a java b java c";
        String word = "ava";
        wordCount counter = new wordCount(sentence, word);
        System.out.println("Using split: " + counter.countBySplit());
        System.out.println("Using indexOf: " + counter.countByIndexOf());
    }
    
}
