/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.mavenproject1;

import java.io.IOException;

/**
 *
 * @author mawad
 */
public class Mavenproject1 {

    public static void main(String[] args) throws IOException, Exception {
       System.out.println("\n====== Stream READ ======");
        StreamReadExample.main(args);

        System.out.println("\n====== Stream WRITE ======");
        StreamWrite.main(args);

        System.out.println("\n====== JSON-B Object → JSON ======");
        JsonBWrite.main(args);
        
        System.out.println("\n====== JSON-B JSON → Object ======");
        JsonBRead.main(args);
    }
}
