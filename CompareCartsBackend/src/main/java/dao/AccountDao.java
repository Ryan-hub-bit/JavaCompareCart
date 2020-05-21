package dao;

import exception.DaoException;
import javafx.util.Pair;
import model.Account;

import java.util.Map;

public interface AccountDao {
    boolean add(Account account) throws DaoException;
    Map<Boolean, Integer> checkLogin(Account account) throws DaoException;
    int checkNumber(String mobileNumber) throws DaoException;
}
