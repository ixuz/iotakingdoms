# Start

```
yarn cleanstart
```

# Example CRUD operations using Curl

## Create User

```
$ curl 'localhost:3000/graphql' -X POST -H 'content-type: application/json' --data '{ "query": "mutation { createUser(options: { firstName: \"Alice\", lastName: \"Barker\", age: 1 } ) }" }'
```

## Request Users

```
$ curl 'localhost:3000/graphql' -X POST -H 'content-type: application/json' --data '{ "query": "{ users { id, firstName, lastName, age } }" }'
```

## Update User

```
$ curl 'localhost:3000/graphql' -X POST -H 'content-type: application/json' --data '{ "query": "mutation { updateUser( id: 1, options: { firstName: \"Charlie\", lastName: \"Caras\", age: 4 } ) }" }'
```

## Delete User

```
$ curl 'localhost:3000/graphql' -X POST -H 'content-type: application/json' --data '{ "query": "mutation { deleteUser( id: 1 ) }" }'
```
