package dao;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DaoFactory {
    public static boolean DROP_TABLES_IF_EXISTS = false; //Everything breaks if this is false.
    public static String PATH_TO_DATABASE_FILE = "./Store.db";
    private static Sql2o sql2o;

    private DaoFactory() {

    }

    private static void instantiateSql2o() throws URISyntaxException {
        if (sql2o == null) {
            String databaseUrl = "postgres://bljhacdjjvgwjq:682e1cfb2ef4f7e9ffd3858c4596fd82d984d2c0286ad5ec890a1efe9a4b36a1@ec2-54-159-112-44.compute-1.amazonaws.com:5432/d7fn3hb4gum9c0";
            URI dbUri = new URI(databaseUrl);
                String username = dbUri.getUserInfo().split(":")[0];
                String password = dbUri.getUserInfo().split(":")[1];
                String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':'
                        + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";
                sql2o = new Sql2o(dbUrl, username, password);
        }
    }

    /** Functions to clear parts or whole database*/
    public static void clearDatabase() {
        clearListContents();
        clearProduct_Detail();
        clearSource();
        clearProducts();
        clearGroceryLists();
        clearAccounts();
    }

    private static void clearAccounts() {
        String sql = "DELETE FROM Accounts;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void clearGroceryLists() {
        String sql = "DELETE FROM GroceryLists;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void clearListContents() {
        String sql = "DELETE FROM ListContents;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void clearProduct_Detail() {
        String sql = "DELETE FROM Product_Detail;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void clearProducts() {
        String sql = "DELETE FROM Products;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void clearSource() {
        String sql = "DELETE FROM Source;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void createProductsTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXISTS) dropProductTableIfExists(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS Products(" +
                "upc VARCHAR(100) PRIMARY KEY," +
                "name VARCHAR(100) NOT NULL," +
                "category VARCHAR(30)," +
                "description VARCHAR(255)" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void dropProductTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Products;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void createGroceryListTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXISTS) dropGroceryListTableIfExists(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS GroceryLists(" +
                "listID serial," +
                "name VARCHAR(30)," +
                "accountID INTEGER," +
                "totalPrice FLOAT," +
                "listPrice FLOAT," +
                "PRIMARY KEY (listID, accountID)," +
                "FOREIGN KEY(accountID) REFERENCES Accounts(accountID)" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void dropGroceryListTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS GroceryLists;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    // So the provider api should add to Products
    // On handling requests, the grocery list and list product
    // get list product, post to list product, delete, update
    // add to grocery_list to create new list
    // somehow mask the accid from the user interface
    // Table to model relationship between grocery lists and products
    private static void createListContentsTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXISTS) dropListContentsTableIfExists(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS ListContents(" +
                "upc VARCHAR(100)," +
                "listID INTEGER," +
                "quantity INTEGER," +
                "groceryProvider VARCHAR(20)," +
                "FOREIGN KEY(upc) REFERENCES Products(upc)" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            //sql = "PRAGMA foreign_keys = 1";
            //conn.createQuery(sql).executeUpdate();
        }
    }

    private static void dropListContentsTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS ListContents;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void createAccountsTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXISTS) dropAccountsTable(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS Accounts(" +
                "accountID serial PRIMARY KEY," +
                "username VARCHAR(30) UNIQUE," +
                "password VARCHAR(30)," +
                "fullname VARCHAR(30)," +
                "mobileNumber VARCHAR(20) UNIQUE," +
                "address VARCHAR(100)" +
                ");";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    private static void dropAccountsTable(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Accounts;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    //create and drop Product_DetailsTAble
    private static void createProduct_DetailTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXISTS) dropProduct_DetailTableIfExists(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS Product_Detail(" +
                "upc VARCHAR(100) PRIMARY KEY," +
                "brand VARCHAR(100)," +
                "date DATE," +
                "url VARCHAR(200)," +
                "FOREIGN KEY(upc) REFERENCES Products(upc)" +
                ");";
        //String sql ="";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            //sql = "PRAGMA foreign_keys = 1";
            //conn.createQuery(sql).executeUpdate();
        }
    }

    private static void dropProduct_DetailTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Product_Detail;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
        }
    }

    // create and drop SourceTAble
    private static void createSourceTable(Sql2o sql2o) {
        if (DROP_TABLES_IF_EXISTS) dropSourceTableIfExists(sql2o);
        String sql = "CREATE TABLE IF NOT EXISTS Source(" +
                "upc  VARCHAR(100)," +
                "groceryProvider VARCHAR(100)," +
                "price FLOAT," +
                "PRIMARY KEY(upc, groceryProvider)," +
                "FOREIGN KEY(upc) REFERENCES Products(upc)" +
                ");";
//        String sql ="CREATE TABLE IF NOT EXISTS Source(" +
//                "upc VARCHAR(100)," +
//                "name VARCHAR(100)," +
//                "FOREIGN KEY(upc) REFERENCES Products(upc)," +
//                "FOREIGN KEY(listID) REFERENCES GroceryLists(listID)" +
//                ");";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();
            //sql = "PRAGMA foreign_keys = 1";
            //conn.createQuery(sql).executeUpdate();

        }
    }

    private static void dropSourceTableIfExists(Sql2o sql2o) {
        String sql = "DROP TABLE IF EXISTS Source;";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql).executeUpdate();

        }
    }

    public static ProductDao getProductDao() throws URISyntaxException {
        instantiateSql2o();
        createProductsTable(sql2o);
        return new Sql2oProductDao(sql2o);
    }

    public static GroceryListDao getGroceryListDao() throws URISyntaxException {
        instantiateSql2o();
        createGroceryListTable(sql2o);
        createListContentsTable(sql2o);
        return new Sql2oGroceryListDao(sql2o);
    }

    public static AccountDao getAccountDao() throws URISyntaxException {
        instantiateSql2o();
        createAccountsTable(sql2o);
        return new Sql2oAccountDao(sql2o);
    }

    public static Product_DetailsDao getProduct_DetailsDao() throws URISyntaxException {
        instantiateSql2o();
        createProduct_DetailTable(sql2o);
        return new Sql2oProduct_Details(sql2o);
    }

    public static SourceDao getSourceDao() throws URISyntaxException {
        instantiateSql2o();
        createSourceTable(sql2o);
        return new Sql2oSourceDao(sql2o);
    }

}