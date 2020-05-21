//TODO Wasn't sure where to put this.
package fetch;

import com.google.gson.Gson;
import dao.ProductPrice;
import model.Product;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static java.lang.Float.parseFloat;


public class WalmartFetch {
    public WalmartFetch() {

    }

    private class ModifiedProduct {
        public String name;
        public ModifiedProduct(String name) {
            this.name = name;
        }

        @java.lang.Override
        public java.lang.String toString() {
            return "ModifiedProduct{" +
                    "name='" + name + '\'' +
                    '}';
        }
    }
    private class Ingredients {
        private ModifiedProduct ingredients;

        public Ingredients(ModifiedProduct mp) {
            this.ingredients = mp;
        }


        @java.lang.Override
        public java.lang.String toString() {
            return "Ingredients{" +
                    "name=" + ingredients.name +
                    '}';
        }
    }

    public float getPriceFromUPC(String upc) throws IOException, InterruptedException {
        StringBuilder newProduct = new StringBuilder(upc);

        //Walmart 3489 is in East Baltimore
        String get_url = "https://grocery.walmart.com/v4/api/products/search?storeId=3489&count=20&page=1&offset=0&query=" + newProduct.toString();
        //Fetch price using the API
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(get_url))
                .GET()
                .setHeader("Postman-Token", "1723fea5-657d-4c54-b245-027d41b135aa")
                .setHeader("Cache-Control", "no-cache")
                .build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        int index = response.body().indexOf("displayPrice") + 14; //index of the price
        String check, productPrice;
        if (index > 13) {
            check = response.body().substring(index); // substring starting with displayPrice :
            index = check.indexOf(",");
            productPrice = check.substring(0, index);
        }
        else {
            return -1;
        }

        //Just in case: if somehow price is returned but is NaN, don't crash
        float price = -1;
        try {
            price = parseFloat(productPrice);
        }
        catch (Exception e) {
            System.out.println("Walmart API returned NaN");
            return (float) -1.0;
        }
        return price;
    }

    public List<ProductPrice> getItems(String name) throws IOException, InterruptedException {
        List<ProductPrice> products = new ArrayList<ProductPrice>();
        Gson g = new Gson();
        JSONParser parser = new JSONParser();
        StringBuilder newProduct = new StringBuilder(name);

        for (int i = 0; i < newProduct.length(); i++) {
            if (newProduct.charAt(i) == ' ') {
                newProduct.deleteCharAt(i);
                newProduct.insert(i, "%20");
            }
        }
        //Walmart 3489 is in East Baltimore
        String get_url = "https://grocery.walmart.com/v4/api/products/search?storeId=3489&count=20&page=1&offset=0&query=" + newProduct.toString();
        //Fetch price using the API
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(get_url))
                .GET()
                .setHeader("Postman-Token", "1723fea5-657d-4c54-b245-027d41b135aa")
                .setHeader("cache-control", "no-cache")
                .build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        String JsonProducts = g.toJson(response.body());
        int index = 0;
        String jsonified = response.body();

        for (int i = 0 ;index < response.body().length(); i++) {
            index = jsonified.indexOf("basic", index);
            index = jsonified.indexOf("name", index) + 7; //the first char in the product name

            String productName = jsonified.substring(index); //starts with the name, goes up to the closing "
            productName = productName.substring(0, productName.indexOf("\""));

            index = jsonified.indexOf("displayPrice", index); //index of the price
            String check = jsonified.substring(index); // substring starting with displayPrice :
            index = jsonified.indexOf(":", index);
            int index_end = jsonified.indexOf(",", index); //Now the end of the price
            float price = -1;

            if (i > 5) {
                break;
            }
            try {
                price = parseFloat(jsonified.substring(index + 1, index_end)); //should be the price
                index = index_end + 1;
            }
            catch (Exception e) {
                break;
            }
            String url = "No image found";
            //Comment for git merge sanity
            try {
                index = jsonified.indexOf("thumbnail", 0);
                index += 12;
                int end_index = jsonified.indexOf("jpeg", 0);
                url = jsonified.substring(index, end_index + 4);

            } catch (Exception ex) {
                throw ex;
            }
            Random gen = new Random();
            products.add(new ProductPrice(new Product(Integer.toString(gen.nextInt()), productName), price, url));
            String tempJsonified = jsonified;
            try {
                jsonified = jsonified.substring(jsonified.indexOf("USItemId") + 1);
                jsonified = jsonified.substring(jsonified.indexOf("USItemId"));
            }
            catch (StringIndexOutOfBoundsException ex) {
                jsonified = tempJsonified;
                System.out.println("WalmartFetch String Index is Problematic");
            }
        }
        return products;
    }

        //TODO we need to optimize this.
    public float getPrice(Product product) throws IOException, InterruptedException, ParseException {
        Gson g = new Gson();
        JSONParser parser = new JSONParser();
        StringBuilder newProduct = new StringBuilder(product.getUpc());
        for (int i = 0; i < newProduct.length(); i++) {
            if (newProduct.charAt(i) == ' ') {
                newProduct.deleteCharAt(i);
                newProduct.insert(i, "%20");
            }
        }
        String get_url = "https://grocery.walmart.com/v4/api/products/search?storeId=1855&count=1&page=1&offset=0&query=" + newProduct.toString();
        //Fetch price using the API
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(get_url))
                .GET()
                .setHeader("Postman-Token", "1723fea5-657d-4c54-b245-027d41b135aa")
                .setHeader("cache-control", "no-cache")
                .build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        String JsonProducts = g.toJson(response.body());
        int index = response.body().indexOf("displayPrice", 0);
        if (index == -1) {
            return parseFloat("-1.00");
        }
        String check = response.body().substring(index);
        int index_start = check.indexOf(":", 0);
        index_start += 1;
        int index_end = check.indexOf(",", 0);
        return parseFloat(check.substring(index_start, index_end));
    }

    public String getImg(Product product) throws IOException, InterruptedException, ParseException {
        Gson g = new Gson();
        JSONParser parser = new JSONParser();
        StringBuilder newProduct = new StringBuilder(product.getName());
        for (int i = 0; i < newProduct.length(); i++) {
            if (newProduct.charAt(i) == ' ') {
                newProduct.deleteCharAt(i);
                newProduct.insert(i, "%20");
            }
        }
        String get_url = "https://grocery.walmart.com/v4/api/products/search?storeId=1855&count=1&page=1&offset=0&query=" + newProduct.toString();
        //Fetch price using the API
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(get_url))
                .GET()
                .setHeader("Postman-Token", "1723fea5-657d-4c54-b245-027d41b135aa")
                .setHeader("cache-control", "no-cache")
                .build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        try {
            String JsonProducts = g.toJson(response.body());
            int index = response.body().indexOf("thumbnail", 0);
            index += 12;
            int end_index = response.body().indexOf("jpeg", 0);
            String url = response.body().substring(index, end_index + 4);
            return url;
        } catch (Exception ex) {
            return "No image found";
        }



    }
}
