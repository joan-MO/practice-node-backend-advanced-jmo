# Practice WEB-API/Node.js/MongoDB JoanMO

## NODEPOP APP

This practice will consist of developing the API that will be executed on the server of a service for the sale of articles of second-hand called Nodepop and that will allow a search with filters.

## Requisites
- Mongo installed
- Node installed
- Postman to test the api

## Guide before run the project

Go to terminal and put this commands in this order after cloning the project:

```
cd "path of your project"
```

```
npm install
```

```
npm run installDB
```

When done, you can run the project by entering these commands in this order:

```
mongod (to run your database mongo)
```

Copy .env.example to .env and review the config with your real data in this case for jwt auth.


This command is used to run microservices and applications (the microservice is necessary to upload images and change their size):

```
npx pm2 start
```

The default port to connect to is : 3000 /` localhost:3000`


## Methods API

This service have a differents methods and these is next:

- **GET /apiv1/anuncios:** List all ads and you can filter by tags, name , sale and price and you can do a pagination with this filters: limit, start. Also you can to sort with this filter: sort. Example: /apiv1/anuncios?name=iphone&limit=2.....
- **GET /apiv1/anuncios/tags:** List all tags that there are in ads
- **POST /apiv1/anuncios/ {body params}:** Ads creation.

## Metodologies
In this case I only use one methodology and is this: Refactoring.

## Technologies
I use these technologies:
- Javascript
- Node
- Express
- MongoDB
- Microservices
- Git
- API Rest
- Html
- Css

## Bibliography
 - Keepcoding
 - stackoverflown
 - developer mozilla
 - moongosejs
 - oficial documentation mongodb