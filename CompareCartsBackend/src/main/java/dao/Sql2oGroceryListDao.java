package dao;

import exception.DaoException;
import model.GroceryList;
import model.Source;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class Sql2oGroceryListDao implements GroceryListDao {

    private Sql2o sql2o;

    public Sql2oGroceryListDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public void add(GroceryList groceryList) throws DaoException {
        try(Connection conn = sql2o.open()) {
            String sql = "INSERT INTO GroceryLists(name, accountID, totalPrice, listPrice) VALUES(:name, :accountID, :totalPrice, :listPrice);";
            int listID = (int)conn.createQuery(sql, true)
                    .addParameter("name", groceryList.getName())
                    .addParameter("accountID", groceryList.getAccountID())
                    .addParameter("totalPrice", 0)
                    .addParameter("listPrice", 0)
                    .executeUpdate().getKey();
            groceryList.setListId(listID);
        } catch (Sql2oException ex) {
            throw new DaoException(ex.getMessage(), ex);
        }
    }

    @Override
    public void share(GroceryList groceryList) throws DaoException {
        try(Connection conn = sql2o.open()) {
            String sql = "INSERT INTO GroceryLists(listID, name, accountID) VALUES (:listID, :name, :accountID);";
            conn.createQuery(sql)
                    .addParameter("listID", groceryList.getListId())
                    .addParameter("name", groceryList.getName())
                    .addParameter("accountID", groceryList.getAccountID())
                    .executeUpdate();
        } catch (Sql2oException ex) {
            throw new DaoException("Unable to share grocery list", ex);
        }
    }
    @Override
    public List<GroceryList> findAll() {
        String sql = "SELECT * FROM GroceryLists;";
        try (Connection conn = sql2o.open()) {
            return conn.createQuery(sql).executeAndFetch(GroceryList.class);
        }
    }

    @Override
    public List<GroceryList> findListByAccountID(int accountID) {
        String sql = "SELECT * FROM GroceryLists WHERE accountID = :accountID";
        try (Connection conn = sql2o.open()) {
            return conn.createQuery(sql).addParameter("accountID", accountID)
                    .executeAndFetch(GroceryList.class);
        }

    }

    @Override
    public void addToTotalPrice(float price, int accountID, int listID) {
        String sql = "SELECT * FROM GroceryLists WHERE accountID = :accountID AND listID = :listID";
        try (Connection conn = sql2o.open()) {
            List<GroceryList> myList =  conn.createQuery(sql).addParameter("accountID", accountID)
                    .addParameter("listID", listID)
                    .executeAndFetch(GroceryList.class);

            System.out.println("TOTAL PRICE IS");
            System.out.println(myList.get(0).getTotalPrice());
            float newPrice = myList.get(0).getTotalPrice() + price;
            sql = "UPDATE GroceryLists SET totalPrice = :newPrice WHERE accountID = :accountID AND listID = :listID";
            conn.createQuery(sql).addParameter("newPrice", newPrice)
                    .addParameter("accountID", accountID)
                    .addParameter("listID", listID)
                    .executeUpdate();

            newPrice = myList.get(0).getListPrice() + price;
            sql = "UPDATE GroceryLists SET listPrice = :newPrice WHERE accountID = :accountID AND listID = :listID";
            conn.createQuery(sql).addParameter("newPrice", newPrice)
                    .addParameter("accountID", accountID)
                    .addParameter("listID", listID)
                    .executeUpdate();
        }

    }

    @Override
    public void setListPrice(float price, int accountID, int listID) {
        String sql = "SELECT * FROM GroceryLists WHERE accountID = :accountID AND listID = :listID";
        try (Connection conn = sql2o.open()) {
            List<GroceryList> myList =  conn.createQuery(sql).addParameter("accountID", accountID)
                    .addParameter("listID", listID)
                    .executeAndFetch(GroceryList.class);

            sql = "UPDATE GroceryLists SET listPrice = :newPrice WHERE accountID = :accountID AND listID = :listID";
            conn.createQuery(sql).addParameter("newPrice", price)
                    .addParameter("accountID", accountID)
                    .addParameter("listID", listID)
                    .executeUpdate();
        }

    }

    @Override
    public GroceryList getGroceryList(int accountID, int listID) {
        String sql = "SELECT * FROM GroceryLists WHERE accountID = :accountID AND listID = :listID";
        try (Connection conn = sql2o.open()) {
            return conn.createQuery(sql).addParameter("accountID", accountID)
                    .addParameter("listID", listID)
                    .executeAndFetch(GroceryList.class).get(0);
        }
    }


    @Override
    public void addProduct(String upc, int listID, Source source) throws DaoException {
        try (Connection conn = sql2o.open()) {

            String provider = source.getGroceryProvider();
            String sql = "INSERT INTO ListContents(upc, listID, groceryProvider) VALUES (:upc, :listID, :groceryProvider);";
            conn.createQuery(sql)
                    .addParameter("upc", upc)
                    .addParameter("listID", listID)
                    .addParameter("groceryProvider", provider)
                    .executeUpdate();
        }
        catch (Exception ex) {
            throw new DaoException(ex.getMessage(), ex);
        }

    }

    public void modifyProduct(String upc, int listID, String provider) throws DaoException {
        try (Connection conn = sql2o.open()) {
            String sql = "UPDATE ListContents SET groceryProvider = :groceryProvider WHERE upc = :upc AND listID = :listID;";
            conn.createQuery(sql)
                    .addParameter("upc", upc)
                    .addParameter("listID", listID)
                    .addParameter("groceryProvider", provider)
                    .executeUpdate();
        }
        catch (Exception ex) {
            throw new DaoException("Unable to add product to list", ex);
        }

    }

    @Override
    public void deleteItem(int upc, int listID) throws DaoException {
        try (Connection conn = sql2o.open()) {
            String sql = "DELETE FROM ListContents WHERE upc = " + upc + " AND listID = " + listID + ";";
            conn.createQuery(sql)
                    .executeUpdate();
        } catch (Exception ex) {
            throw new DaoException("Unable to delete product from list", ex);
        }
    }

    @Override
    public void deleteList(int accountID, int listID) throws DaoException {
        try (Connection conn = sql2o.open()) {
            String sql = "DELETE FROM ListContents WHERE listID = " + listID + ";";
            conn.createQuery(sql).executeUpdate();
            sql = "DELETE FROM GroceryLists WHERE listID = " + listID + " AND accountID = " + accountID +  ";";
            conn.createQuery(sql).executeUpdate();
        } catch (Exception ex) {
            throw new DaoException("Unable to delete list", ex);
        }
    }

    //The format that we store list objects in.
    private class RelationObject {
        String upc;
        int listID;
        int quantity;
        String groceryProvider;
    }
    public List<String> findByListId(int listID) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM ListContents WHERE listID = :listID";
            List<RelationObject> objList = conn.createQuery(sql).addParameter("listID", listID).executeAndFetch(RelationObject.class);
            List<String> returnList = new ArrayList<String>();
            for (int i = 0; i < objList.size(); i++) {
                returnList.add(objList.get(i).upc);
            }
            return returnList;
        } catch (Exception ex) {
            throw new DaoException("Unable to get products in list.", ex);
        }
    }
    public Map<String, String> findUpcProviderByListId(int listID) {
        try (Connection conn = sql2o.open()) {
            String sql = "SELECT * FROM ListContents WHERE listID = :listID";
            List<RelationObject> objList = conn.createQuery(sql).addParameter("listID", listID).executeAndFetch(RelationObject.class);
            Map<String, String> returnList = new HashMap<String, String>(); //upc to provider
            for (int i = 0; i < objList.size(); i++) {
                returnList.put(objList.get(i).upc, objList.get(i).groceryProvider);
            }
            return returnList;
        } catch (Exception ex) {
            throw new DaoException("Unable to get products in list.", ex);
        }
    }
}