# Tests documentation
## Preparation :
Before all test, the test database is cleaned and initializes with mock data. After all test, the test database is cleaned.
<br><br>

## Authorization (/auth):
  <details>
  <summary>All tests</summary>

  * POST /register :
    * Description: Test if the user can create a new user successfully.
    * Expect: An HTTP response with an status of 201 and a JSON body of:
      ```javascript
      {
        message: 'User was registered successfully!'
      }
      ```
  * POST /register :
    * Description: Test if the user can create a new user with an e-mail already in use by another user.
    * Expect: An HTTP response with an status of 400 and a JSON body of:
      ```javascript
      {
        message: 'Email is already in use!'
      }
      ```
  * POST /register :
    * Description: Validate the body schema when a user is trying to create a new user. The JSON body of the request doesn't contain a password key and value.
    * Expect: An HTTP response with an status of 400 and a JSON body of:
      ```javascript
      {
        type: 'ValidationError',
        message: 'Password is required'
      }
      ```
  * POST /login :
    * Description: Test if the user can login in the system with right e-mail and password of and already register user.
    * Expect: An HTTP response with an status of 200 and a JSON body of:
      ```javascript
      {
        id: '$anyNumber',
        username: '$anyString',
        email: '$anyEmail',
        token: '$anyString'
      }
      ```
  * POST /login :
    * Description: Test if the user can login in the system with an e-mail of a non existing user.
    * Expect: An HTTP response with an status of 404 and a JSON body of:
      ```javascript
      {
        message: 'User not found!',
      }
      ```
  * POST /login :
    * Description: Test if the user can login in the system with an e-mail of a existing user, but a wrong password.
    * Expect: An HTTP response with an status of 401 and a JSON body of:
      ```javascript
      {
        message: 'Invalid password!',
      }
      ```
  </details>
<br><br>

## User (/user):
  ### Preparation: Before the test, log in with the mock user to get an authorization token
  <details>
  <summary>All tests</summary>

  * GET /me :
    * Description: Get user informations based on the authorization header.
    * Expect: An HTTP response with an status of 200 and a JSON body of:
      ```javascript
      {
        id: '$anyNumber',
        username: '$anyString',
        email: '$anyString',
      }
      ```
  * GET /me :
    * Description: Get user informations without an authorization header.
    * Expect: An HTTP response with an status of 403 and a JSON body of:
      ```javascript
      {
        message: 'No token provided!'
      }
      ```
  * GET /me :
    * Description: Get user informations with an invalid authorization header.
    * Expect: An HTTP response with an status of 401 and a JSON body of:
      ```javascript
      {
        message: 'Unauthorized!'
      }
      ```
  * GET /me :
    * Description: Get user informations of a non existing user.
    * Expect: An HTTP response with an status of 404 and a JSON body of:
      ```javascript
      {
        message: 'User not found!'
      }
      ```
  </details>
<br><br>

## Expense (/expense):
  ### Preparation: Before the test, log in with the mock user to get an authorization token
  <details>
  <summary>All tests</summary>

  * POST / :
    * Description: Try to create a new expense register.
    * Expect: An HTTP response with an status of 201 and a JSON body of:
      ```javascript
      {
        id: '$anyNumber',
        userId: '$anyNumber',
        name: '$anyString',
        description: '$anyString',
        value: '$anyDouble',
        createdAt: '$anyTimestamp',
        updatedAt: '$anyTimestamp'
      }
      ```
  * POST / :
    * Description: Validate the body schema when a user is trying to create a new expense. The JSON body of the request doesn't contain a name key and value.
    * Expect: An HTTP response with an status of 400 and a JSON body of:
      ```javascript
      {
        type: 'ValidationError',
        message: 'Name is required'
      }
      ```
  * PUT /:id :
    * Description: Update an specific expense register.
    * Expect: An HTTP response with an status of 204 and no JSON body.
  * PUT /:id :
    * Description: Try to update a non existing expense register.
    * Expect: An HTTP response with an status of 400 and a JSON body of:
      ```javascript
      {
        message: 'Could not update expense!'
      }
      ```
  * PUT /:id :
    * Description: Try to update an expensive by a non numeric Id.
    * Expect: An HTTP response with an status of 400 and a JSON body of:
      ```javascript
      {
        type: 'ValidationError',
        message: '$anyString'
      }
      ```
  * GET /all :
    * Description: List all user's expenses by the authorization header.
    * Expect: An HTTP response with an status of 200 and a JSON body of:
      ```javascript
      [
        {
          id: '$anyNumber',
          userId: '$anyNumber',
          name: '$anyString',
          description: '$anyString',
          value: '$anyDouble',
          createdAt: '$anyTimestamp',
          updatedAt: '$anyTimestamp'
        }
      ]
      ```
  * GET /:id :
    * Description: Get a specific user's expense.
    * Expect: An HTTP response with an status of 200 and a JSON body of:
      ```javascript
      {
        id: '$anyNumber',
        userId: '$anyNumber',
        name: '$anyString',
        description: '$anyString',
        value: '$anyDouble',
        createdAt: '$anyTimestamp',
        updatedAt: '$anyTimestamp'
      }
      ```
  * GET /:id :
    * Description: Try to get a non existing user's expense.
    * Expect: An HTTP response with an status of 404 and a JSON body of:
      ```javascript
      {
        message: 'Expense not found'
      }
      ```
  </details>
