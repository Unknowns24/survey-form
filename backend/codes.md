# HTTP SERVER RESPONSES

### **Syntax:**

-   for an error: "ERRN" + [ERROR_CODE]
    `ERRN100`
-   for a success: "SUCN" + [SUCCESS_CODE]
    `SUCN100`

### Success Codes

|  Code   |     Meaning     |
| :-----: | :-------------: |
| SUCN100 | User registered |
| SUCN101 |   User Logged   |
| SUCN102 | User Logged out |
| SUCN103 | Survey Created  |

### Error Codes

|  Code   |                       Meaning                        |          Functions           |
| :-----: | :--------------------------------------------------: | :--------------------------: |
|    -    |          **Codes returned by controllers**           |              -               |
| ERRN100 |          Body request content is not a json          |      userController.go       |
| ERRN101 |               Missing parameter "data"               |      userController.go       |
| ERRN102 | The parameter "data" has't got a valid base64 string |      userController.go       |
| ERRN103 |   Missing parameters in "data" base64 encoded json   |      userController.go       |
| ERRN104 |                 Email alredy in use                  | Register (userController.go) |
| ERRN105 |         There is not a user with that email          |  Login (userController.go)   |
| ERRN106 |               User Email not confirmed               |  Login (userController.go)   |
| ERRN107 |                 Wrong user password                  |  Login (userController.go)   |
| ERRN108 |        parameter "keeplogin" is not a boolean        |  Login (userController.go)   |
| ERRN109 |             Error while generating a JWT             |  Login (userController.go)   |
| ERRN110 |                     Bad Request                      |      userController.go       |
| ERRN111 |      Error while unmarshal json (invalid json)       |      userController.go       |
|    -    |          **Codes returned by middlewares**           |              -               |
| ERRN500 |                     Invalid JWT                      |  IsAuthenticated (auth.go)   |
| ERRN501 |            The user in the JWT is Invalid            |  IsAuthenticated (auth.go)   |
