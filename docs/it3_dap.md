# Design and Planning (Iteration Three)
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
* A grocery shopper wants to see the optimal combination of grocery orders in order to save the most money (see example in bullet point 5 above).
Requires us to create an algorithm that finds this optimal combination while keeping in mind that there's different delivery fees on each of the providers and that there's different delivery price minimums.
* A grocery shopper needs the ability to log into the app on any mobile device and be able to see their grocery lists.
* A grocery shopper wants to see images of the products.
* A grocery shopper wants to see near real-time price comparisons.

## Tasks From Iteration Two That Need To Still Be Completed:
* UPC fetching or some other way to match items
* Develop and implement algorithm for finding lowest prices
* Getting frontend to grab lowest possible combination of items  from backend
* Fix Amazon webscraper

## New Tasks for Iteration Three
* Item and price grabbing from additional grocery providers
* Login system for backend and frontend
* Deletion of products from a user's list
* Show images for items (backend needs to send image URL, frontend needs to display)

# Retrospective for Iteration Three:
**Delivered:**
* Wegmans Product fetching
* User login and signup
* First iteration of list optimization
* Refactored some of the backend to enable the optimization algorithm.
* Adjusted some of the API functions accordingly. Most notably AddProductToList and GetProductsFromList.
* Fixed an issue with Amazon Fetch 503 error. We are worried this will come back   if we fetch too many times.

**Semi-Delivered:**
* Images are properly fetched but do not persist in our database. Right now they only appear when the user initially searches for an item.

**Not Delivered:**
* UPC Fetch
**Challenges:**
* Could not figure out how to set the signature field for the Amazon commerce services API, which is currently blocking us from getting UPC fetch.
* Peapod’s unofficial API seems to need a developer account, but there is no way to obtain a developer account as it’s unofficial.
* Adjusting to exclusively online meetings.
* Some group members had midterms and unusually busy schedules during this iteration.

**Reflection:**
* We unfortunately waited too long to start UPC fetch, so when things went wrong it was difficult to adjust in time.
* Our tests are severely lacking, and lead to some issues integrating the optimization endpoint with the front end.Ideally, our tests could’ve informed us of these issues without having to run the front end.
* One of our databases (ListContents) was slightly off and lead to some confusion about how to implement price persistence. Planning out databases correcty, and far in advance, is very important.
* Our code in general is messy right now, some things that should be global variables (i.e. “Walmart Groceries”) is hardcoded instead of using a single variable. It makes changing them to match the front end annoying.
