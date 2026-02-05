/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package thrdPkg;

import java.awt.Color;
import java.awt.Graphics;
import java.lang.System.Logger;
import java.lang.System.Logger.Level;
import java.util.Date;
import javax.swing.JPanel;

/**
 *
 * @author mawad
 */
public class MyPanel extends JPanel implements Runnable {
    private static final Logger logger = System.getLogger(MyPanel.class.getName());

    public MyPanel(){
        this.setBackground(Color.pink);
        new Thread(this).start();
    }
    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        g.drawString(new Date().toString(), 100, 100);
    }
    @Override
    public void run(){
        while(true){
            try{
                this.repaint();
                Thread.sleep(1000);
            }
            catch(InterruptedException ex){
                 logger.log(Level.ERROR, "Thread interrupted", ex);
                
                
            }
        }
    }
}
