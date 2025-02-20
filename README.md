# CRUD_With_DynamoDB

## Steps to run locally

- Clone the repository and install the dependency.

```sh
    git clone https://github.com/boharabirendra/CRUD_With_DynamoDB.git
```

- Create a .env file and add necessary credentials using .env.example file.
- Locally run DynamoDB and redis with default port

## Create table

```sh
    node ./src/model/createArticle.js
    node ./src/model/createUser.js
```

## Run

```sh
    npm run start
```

## Postman collection

- Both article and user postman collection are inside of postman_collection folder inside of src folder.
