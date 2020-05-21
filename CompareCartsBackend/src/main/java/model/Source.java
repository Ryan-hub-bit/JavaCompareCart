package model;

import java.util.Objects;

public class Source {
    private String upc;
    private String groceryProvider;
    private float price;

    public Source(String upc, String groceryProvider, float price) {
        this.upc = upc;
        this.groceryProvider = groceryProvider;
        this.price = price;
    }

    public Source(String upc) {
        this.upc = upc;
    }

    public String getUpc() {
        return upc;
    }

    public void setUpc(String upc) {
        this.upc = upc;
    }

    public String getGroceryProvider() {
        return groceryProvider;
    }

    public void setGroceryProvider(String groceryProvider) {
        this.groceryProvider = groceryProvider;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Source source = (Source) o;
        return Float.compare(source.price, price) == 0 &&
                Objects.equals(upc, source.upc) &&
                Objects.equals(groceryProvider, source.groceryProvider);
    }

    @Override
    public int hashCode() {
        return Objects.hash(upc, groceryProvider, price);
    }

    @Override
    public String toString() {
        return "Source{" +
                "upc='" + upc + '\'' +
                ", groceryProvider='" + groceryProvider + '\'' +
                ", price=" + price +
                '}';
    }
}
