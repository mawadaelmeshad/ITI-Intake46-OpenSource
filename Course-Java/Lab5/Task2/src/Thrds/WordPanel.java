/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Thrds;
import java.awt.Color;
import java.awt.Graphics;
import javax.swing.JPanel;
import java.lang.System.Logger;
import java.lang.System.Logger.Level;

/**
 *
 * @author mawad
 */
public class WordPanel extends JPanel implements Runnable{
    private static final Logger logger = System.getLogger(WordPanel.class.getName());
      String text = "Hello from Mawadah";
      int x = 10;
    public WordPanel() {
        this.setBackground(Color.pink);
        new Thread(this).start();
    }
    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        if(x>= this.getWidth()){
            x=0;
        }
        g.drawString(text, x, 100);
    }
    @Override
    public void run(){
        while(true){
            try{
                Thread.sleep(1000);
                x+=80;
                this.repaint();
               
            }
            catch(InterruptedException ex){
                 logger.log(Level.ERROR, "Thread interrupted", ex);
                
                
            }
        }
    }
     
     
    
}
