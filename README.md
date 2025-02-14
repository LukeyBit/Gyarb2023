# Gymnasiearbete 2023

This is project MealMaster, a web application for managing your meals and recipes. The application is built with React and Redux on the client side and Node.js and Express on the server side. The database is built with SQLite.

## Setup and running the server

### Setup

To install the necessary node packages, run the following command in both the client and server folder:

```bash
npm install
```

To build the database run the following command within the server folder:

```bash
npm run dbSetup
```

To use the API, sign up for a free API key at [Edamam Recipe and Nutrition API](https://api.edamam.com/) and insert your credentials in the `client/src/apis/recipeAPI/params.json` file on the rows labeled `appID` and `appKey` in the [params.json file](client/src/apis/recipeAPI/params.json).

The following are the default credentials:

| Username | Password |
|----------|----------|
| lukas    | pearade  |
| theo     | lemonade |

### Running the server

To run the server run the following command in both the client and server folder:

```bash
npm start
```

## Building the client for production

To build the client for production run the following command in the client folder:

```bash
npm run build
```
