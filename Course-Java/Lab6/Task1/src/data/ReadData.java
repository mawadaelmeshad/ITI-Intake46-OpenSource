/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package data;
import java.util.*;
import java.io.*;

/**
 *
 * @author mawad
 */
public class ReadData {
    private List<Country> countries;
    private List<City> cities;
    
    public ReadData(String countryFile, String cityFile) {

        countries = readCountries(countryFile);
        cities = readCities(cityFile);
    }
    
    public List<Country> getCountries() {
        return countries;
    }

    public List<City> getCities() {
        return cities;
    }
    
     private List<Country> readCountries(String filePath) {

        List<Country> list = new ArrayList<>();

        try (BufferedReader br =
                     new BufferedReader(new FileReader(filePath))) {

            String line;
            br.readLine(); 

            while ((line = br.readLine()) != null) {

                String[] data = line.split(",");
                String code        = data[0].trim();
                String name        = data[1].trim();
                String continent   = data[2].trim();
                int population     = Integer.parseInt(data[3].trim());
                double surfaceArea = Double.parseDouble(data[4].trim());
                double gnp         = Double.parseDouble(data[5].trim());
                int capital        = Integer.parseInt(data[6].trim());

                 Country country = new Country(code, name, continent, 
                                          surfaceArea, population, gnp, capital);

                list.add(country);
            }

        } catch (IOException e) {
            System.err.println(e.getMessage());
        }

        return list;
    }
     
      private List<City> readCities(String filePath) {

        List<City> list = new ArrayList<>();

        try (BufferedReader br =
                     new BufferedReader(new FileReader(filePath))) {

            String line;
            br.readLine(); // skip header

            while ((line = br.readLine()) != null) {

                String[] data = line.split(",");

                City city = new City(
                        Integer.parseInt(data[0]),
                        data[1],
                        Integer.parseInt(data[2]),
                        data[3]
                );

                list.add(city);
            }
            
            } 
        catch (IOException e) {
             System.err.println(e.getMessage());
        }

        return list;
    }
    
}
