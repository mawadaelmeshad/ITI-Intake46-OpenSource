/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package threads;
import java.awt.Color;
import java.awt.Graphics;
import javax.swing.JPanel;
import java.lang.System.Logger;
import java.lang.System.Logger.Level;
/**
 *
 * @author mawad
 */
public class BallPanel extends JPanel implements Runnable{
    private static final Logger logger = System.getLogger(BallPanel.class.getName());
     
    int x = 50;
    int y = 50;
    int dx = 5;
    int dy = 5;
    int radius = 30;
    
    public BallPanel() {
        this.setBackground(Color.pink);
        new Thread(this).start();
    }
     @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.black);
        g.fillOval(x, y, radius, radius);
    }
     @Override
    public void run() {
        while (true) {
            try {
                x += dx;
                y += dy;

                if (x <= 0 || x >= getWidth())
                    dx = -dx;

                if (y <= 0 || y >= getHeight())
                    dy = -dy;

                repaint();
                Thread.sleep(50);
            } catch (InterruptedException ex) {
                logger.log(Level.ERROR, "Thread interrupted", ex);
            }
        }
      }
    
}
