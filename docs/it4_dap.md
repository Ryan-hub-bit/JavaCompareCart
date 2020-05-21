# Design and Planning (Iteration Four)
## OO Design
### UML Class Diagram
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/uml.png)
### Database Relation Model
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_three_assets/CompareCarts.png)
## Wireframe 
### No Grocery Lists
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/Empty%20Shopping%20List.png)
### Adding a Grocery List
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/Adding%20a%20Grocery%20List.png)
### Multiple Lists
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/Multiple%20Lists.png)
### Item Searching
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_two_assets/Adding%20a%20Grocery%20List%20%E2%80%93%201.png)
### Within a List
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_two_assets/Grocery%20List%20Before.png)

## List the User Stories that you will implement in this iteration.
* A grocery shopper needs the ability to add and remove items from the list in order to keep track of their order and allow them to change their mind.
  * We are specifically working on the remove item part of this user story since adding already works.
* A grocery shopper wants to see images of the products.
* A grocery shopper wants to see the optimal combination of grocery orders in order to save the most money (see example in bullet point 5 above).
  * We have already developed an algorithm in iteration 3, but we need to improve it
* A grocery shopper wants the ability to see prices from three or more grocery providers.

## Tasks From Iteration Three That Need To Still Be Completed:
* UPC fetching or some other way to match items - we will be using AlgoPix
* Get Wegmans fully running and integrated

## New Tasks for Iteration Four
* Persisting item images in the database/cache
* Expanding algorithm for multiple providers (not just Amazon/Walmart)
* Optimize algorithm should show how much money was saved
* Deleting items and lists should persist in backend
* Unit tests for the API
* Host backend on Heroku, Frontend on Expo Snacks

# Retrospective for Iteration Four:
**Delivered:**
* UPC Fetch for non-generic and non-produce items, which is sufficient, as those cannot be UPC matched in general
* Added image persistence
* 503 Error Amazon fixed
* Shared Carts
* Delete List
* Host Frontend on Expo Snacks
* Pull to Refresh to fix 
* Fixed WalmartFetch substring error

**Semi-Delivered:**
* Wrote many more ApiServer tests to make sure it's robust
* Deployed backend to Heroku, discovered application error
* Delete item backend completed, must integrate with frontend (very doable now that UPC Fetch works)
* Partially rewrote getProductFromList to send price difference to frontend and optimize return values
* Expanding algorithm to include WegmansFetch is mostly done, but relied on UPC Fetch to integrate (very doable now that UPC Fetch works)

**Not Delivered:**
* WegmansFetch needs to return something slightly different

**Reflection:**  
We were able to accomplish many of our goals this iteration, and although we still need to complete and polish many things up. Our product is functional and has delivered many positive functional changes, but we have some work to finish implementing and reorganize some things. However, we were having some technical difficulties with the development and runtime environments on some of our laptops. We also finished some tasks later than expected due to API troubles, and that pushed back delivery of other features which depended on those tasks. However, by next iteration, we expect to resolve these issues.
