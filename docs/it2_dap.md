# Design and Planning (Iteration Two)
## OO Design
### UML Class Diagram
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_one_assets/uml.png)
### Database Relation Model
![](https://github.com/jhu-oose/2020-spring-group-CompareCarts/blob/master/docs/resources/iteration_two_assets/CompareCarts.png)
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
* A grocery shopper wants to compare prices from at least 2 grocery providers
* A grocery shopper wants to see the optimal combination of grocery orders in order to save the most money (see example in bullet point 5 above).
Requires us to create an algorithm that finds this optimal combination while keeping in mind that there's different delivery fees on each of the providers and that there's different delivery price minimums.

## Tasks From Iteration One That Need To Still Be Completed:
* Implement price fetching from Amazon.
* Complete the Restful API
* Able to grab grocery lists from backend

## New Tasks for Iteration Two
* Implement price fetching from Walmart
* Persist items/prices from grocery providers
* Write Requirements.txt (Java JDK 11, JSONSimple JAR in classpath)
* Develop and implement algorithm for finding lowest prices
* Getting frontend to grab lowest possible combination of items  from backend

# Retrospective for Iteration Two:
**Delivered:**
* Complete the Restful API
* Able to grab grocery lists from backend
* Implement price fetching from Walmart
* Persist items/prices from grocery providers
* Write Requirements.txt (Java JDK 11, JSONSimple JAR in classpath)
* Frontend: Create page to add a new grocery list
* Frontend: Create page to view items in grocery list
* Frontend: Create page to search for new items 
* Frontend: Connect frontend to backend via RESTful API
* Implement price fetching from Amazon. ~~(Was working, but it broke because Amazon is blocking webscrapers)~~

**Not Delivered:**
* Develop and implement algorithm for finding lowest prices
* Getting frontend to grab lowest possible combination of items  from backend

**Challenges:**
* Amazon price fetching was working but then it broke because Amazon seems to be blocking webscrapers. Fixed it.
* Walmart Grocery API is no longer accepting users to use their API, so we had to figure out alternative way to get items and prices.
* Couldn't find a way to get UPCs from Amazon or Walmart so we couldn't match items and therefore couldn't develop the algorithm.

**Reflection:**
* Webscraping is not ideal because it can break easily when the website updates. However, there's no single API provider that allows us to tap into a bunch of online grocery providers. Need to make webscraper more robust.
* Item matching and the algorithm development has been very slow. MUST complete this by iteration 3 or it'll be bad.
