/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package task2;

/**
 *
 * @author mawad
 */
public class wordCount {
    String sentence;
    String word;
    
    public wordCount(String sentence, String word){
        this.sentence = sentence;
        this.word = word;
    }
    public int countByIndexOf(){
        int count=0;
        int index=0;
        word = " " + word + " ";
       while ((index = sentence.indexOf(word, index)) != -1) {
            count++;
            index = index + word.length();
        }

        return count;
    }
    public int countBySplit() {
        String[] words = sentence.toLowerCase().split(" ");
        int count = 0;
        for (String w : words) {
            if (w.equals(word.toLowerCase())) {
                count++;
            }
        }
        return count;
    }
    
    
}
