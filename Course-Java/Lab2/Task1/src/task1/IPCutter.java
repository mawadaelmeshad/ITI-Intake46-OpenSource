package task1;
import java.util.StringTokenizer;


/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author mawad
 */
public class IPCutter {
    String cmdLine;
    public IPCutter(String cmdLine) {
        this.cmdLine = cmdLine;
    }
    public int[] doIPSplit() {
        int[] result = new int[4];

        StringTokenizer tokenizer = new StringTokenizer(cmdLine, ".");

        int i = 0;
        while (tokenizer.hasMoreTokens()) {
            result[i] = Integer.parseInt(tokenizer.nextToken());
            i++;
        }

        return result;
    }
     public int[] doIPSplitWithSplit() {

        String[] parts = cmdLine.split("\\.");
         int[] result = new int[parts.length];

        for (int i = 0; i < parts.length; i++) {
            result[i] = Integer.parseInt(parts[i]);
        }
        return result;
    }
    
}
