# Reversi game server - Documentation 📖

## Abstraction layers

When accessing data from the server it is done through 2 layers of abstraction.  
The first layer is the **service layer**. This is the only layer that you as a developer should be calling directly from code.  
Beneath this layer is the **repository layer** whose responsibility is to query the database solution of choice.

Since we are only ever calling the service layer it means we are making the database agnostic and don't actually care what DBMS we're using.  
As for the _end user_, they contact the services through the **REST API** which is setup through endpoint controllers (such as `userEndpoints.ts`).

## Endpoints `/api/`

Dynamic endpoints are represented with a colon followed by the reference name `:username`.  
All endpoints that return an array of objects will get native pagination support if time can be spared.

### `users` 👥

Returns all users in the database as an array.

### `users/:username` 👤

Returns a frontend-safe version of the user object from the database.

_Optional queries_

-   `nodata=true`  
    Only returns a status code depending on if the user was found or not.  
    This is useful when we do not need to use the full user object, ie when checking username availability.  
    The returned API response is always `50 Bytes` which over time can save a lot of bandwidth.  
    _The goal is to make this globally applicable later._

## Endpoints `/auth/`

Bring up stuff like DTOs. Talk about the `in` keyword in this context being `Frontend -> Backend` and `out` being `Backend -> Frontend`

## Notes

Transactional vs regular `db` calls:  
Normal calls just run as is on the db instance.  
Transactional calls rollback their changes if not all pass. Meaning if a user is created and the invite token fails, the user is rolled back.  
Repository methods have an optional tx parameter where you can pass the db instance to use.
