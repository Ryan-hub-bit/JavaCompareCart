# Design and Planning (Iteration One)
## OO Design
### UML Class Diagram
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/uml.png)

### Database Relation Model
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/dbrm.png)

## Wireframe (Just for Iteration One)
### No Grocery Lists
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/Empty%20Shopping%20List.png)
### Adding a Grocery List
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/Adding%20a%20Grocery%20List.png)
### Multiple Lists
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/Multiple%20Lists.png)

## List the User Stories that you will implement in this iteration.
* (From the must-have) A grocery shopper needs the ability to create a new grocery list

## Tasks by 2/27/2020
* ~~Create the database schema with six tables: product, account, product_details, source, grocery_list, and order (Will)~~ COMPLETED
* Implement the database in SQLite and setup a database access object (DAO) in Java (Will)
* ~~Create a UML class Diagram with four classes: Order, Account, Item, and GroceryList (Kun, Will, Travis)~~ COMPLETED
* ~~Create the REST API schema that describes what request method and endpoints (Jack and Travis)~~ COMPLETED
    * Implement this schema into a basic working API using Javalin (Will and Jack) (started)
* Create a class for accessing prices and other item data from Amazon and Walmart (Jack and Eric) (semi-completed - only Walmart works)
* ~~Wireframe a screen of the mobile app that is responsible for creating grocery lists. (Travis and Kun)~~ COMPLETED
    * ~~Rough draft in PowerPoint~~ COMPLETED 
    * ~~Cleaner draft in Adobe XD ~~ COMPLETED
* Create the mobile front-end needed to create a grocery list (just text for now - no images) to it (Travis and Kun) (it can create grocery lists, but it wasn't able to connect to backend because backend API wasn't ready)

# Retrospective for Iteration One:
**Delivered:**
* Created a database schema and implemented a database access object (just CRUD)
* Able to get prices from Walmart Grocery
* Created a wireframe in Adobe XD of our app
* Frontend was able to create a list for the user
* Created a UML class diagram

**Not Delivered:**
* Didn’t finish code to get prices from Amazon Fresh
* Didn’t connect frontend to backend

**Challenges:**
* For the frontend, none of us have made an app before so we had to learn React Native (which is a pain to get to work on Windows)
* Debugging HTTP libraries for webscraping took longer than anticipated.
* Getting a consistent platform for development/getting code to compile across multiple devices was less straightforward than it should be

**Reflection:**
* We should have more closely followed agile methodology where we would have worked on the core functionality of the app which would have been to make an algorithm to gather prices for items and then return the optimal order 
* We should have made more progress earlier on the backend so that we would have had time to connect the frontend to the backend. 

