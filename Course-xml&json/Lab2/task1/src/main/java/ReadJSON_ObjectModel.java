/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author mawad
 */
import jakarta.json.*;
import java.io.FileReader;

public class ReadJSON_ObjectModel {
      public static void main(String[] args) throws Exception {

        JsonReader reader = Json.createReader(new FileReader("library.json"));

        JsonObject jsonObject = reader.readObject();

        String libraryName = jsonObject.getString("library");
        String location = jsonObject.getString("location");

        System.out.println("Library: " + libraryName);
        System.out.println("Location: " + location);

        JsonArray books = jsonObject.getJsonArray("books");

        for (JsonValue value : books) {
            JsonObject book = value.asJsonObject();
            System.out.println("Title: " + book.getString("title"));
            System.out.println("ISBN: " + book.getString("isbn"));
            System.out.println("Author: " + book.getString("author"));
            System.out.println("------------");
        }

        reader.close();
    }
}
