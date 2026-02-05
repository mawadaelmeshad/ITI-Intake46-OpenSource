/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task3;

import javax.swing.JFrame;
import threads.BallPanel;

/**
 *
 * @author mawad
 */
public class Task3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
          JFrame f = new JFrame();
        f.setTitle("Hello Frame!");
        BallPanel mp = new BallPanel();
        f.setContentPane(mp);
        f.setSize(500, 300);
        f.setVisible(true);
    }
    
}
