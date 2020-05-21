# Requirement Specification Document

## Problem Statement 

Finding the cheapest, most affordable prices for grocery delivery from different delivery providers is tedious and requires visits to multiple websites or apps. 

With the recent coronavirus pandemic, this issue has been exacerbated with many people turning to buying groceries online such that companies like Walmart Grocery are experiencing ~200% monthly growth. However, at the same time, many people are becoming unemployed or are at risk of becoming unemployed, which means that they are going to be looking for the cheapest groceries they can find.

EXAMPLE: According to the US Department of Agriculture, the average American family of four spends $150-$300/week on groceries . For this example, let's assume a family spends $200/week and that they buy 50 grocery items a week. If they want to compare prices between three grocery providers, they would have to enter in every single item into three different websites - that's 150 different searches every single week or 600 searches a month! So, most Americans don't do that because it's too tedious. However, they can be missing out on significant savings. Most of us wouldn't notice or care that at one store a gallon of milk is $2.00 and at another store it's $2.30, but that's a 15% increase and it adds up really quickly. If we could save a shopper 10% on their order, the average American family would save $80/month - that's like the monthly cost of a premium phone. 


## Potential Clients

Anyone who buys groceries online and wants to save money.


## Proposed Solution
A mobile app that allows users to record groceries that they are planning on purchasing and also shows the user the cost of the entire grocery list from different online grocery providers so that they can choose the cheapest groceries.

How it would work from a user's perspective:
1. User logs into the mobile app so their lists of groceries would be associated with their account and they can have the same lists on multiple devices (ie. a phone and a tablet)
   * Can be iOS or Android (we're using React Native which is cross-platform)
2. User has the ability to create a new list, update a current list, or delete a list.
3. User can add groceries to the grocery list.
    * On the server, the user's query is sent to grocery provider's APIs or is webscraped from their site. We need to get the first several groceries and create some sort of algorithm that matches groceries from one provider to another. 
        * As of 4/9/20, we have had issues with webscraping and using the grocery provider's API (especially Amazon), that we have decided to try AlgoPix.
    * As they add groceries to the list, there may be autosuggest specialized for groceries (nice to have)
4. User sees the price of the entire grocery cart update in the app.
5. User can see from which grocery provider to buy groceries meaning that the list of groceries would be split into different catergories where we suggest the user to buy X groceries from Amazon, Y groceries from Walmart, and Z groceries from Peapod. We will need to build an algorithm that finds the optimal combination of items mapped to grocery providers to save the user the most money.

## Functional Requirements
### Must have
* A grocery shopper needs the ability to create a list of groceries and see previous grocery lists that they created.
    * This requires the groceries and associated lists to be saved on a server
* A grocery shopper needs the ability to log into the app on any mobile device (iOS or Android) and be able to see their grocery lists.
* A grocery shopper needs the ability to add and remove items from the list in order to keep track of their order and allow them to change their mind.
* A grocery shopper wants to see the optimal combination of grocery orders in order to save the most money (see example in bullet point 5 above).
    * Requires us to create an algorithm that finds this optimal combination while keeping in mind that there's different delivery fees on each of the providers and that there's different delivery price minimums.
* A grocery shopper wants to compare prices from at least 2 grocery providers.
* A grocery shopper wants to see near real-time price comparisons.

### Nice to have
* A grocery shopper wants the ability to see prices from three or more grocery providers.
* A grocery shopper wants to see images of the products.
* A grocery shopper may want the ability to share a cart with their family, friends, or roommates.

## Software Architecture
* This will be a mobile application that is cross-platform iOS and Android.
* This project conforms to the client-server architecture because the client is the mobile application and the server will retain information like the grocery lists for each user. Further, the server will be doing API requests and web scraping in order to return to the client the current prices of the groceries. The server would also be doing item-matching between grocery providers. The server will be running the algorithm to find the optimal grocery item to grocery provider mapping.
