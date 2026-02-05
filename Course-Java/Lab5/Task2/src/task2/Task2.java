/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task2;

import Thrds.WordPanel;
import javax.swing.JFrame;

/**
 *
 * @author mawad
 */
public class Task2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
         JFrame f = new JFrame();
        f.setTitle("Hello Frame!");
        WordPanel mp = new WordPanel();
        f.setContentPane(mp);
        f.setSize(500, 300);
        f.setVisible(true);
    }
    
}
