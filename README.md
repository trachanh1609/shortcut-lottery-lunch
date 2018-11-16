# shortcut-lottery-lunch

## Running Backend
```
$cd server

$npm install

$npm run backend
```

If failure, check the error message in console. You might need other secret info like password, secret etc. Those secret info is stored in *.env* file. Create a file name ".env" in folder server, "server/.env" . The content of the ".env" file looks like this :

```
DB_USERNAME="username"

DB_PASSWORD="password"
```

I wonder if I should give you these secrets.

If you have those secrets, try `$npm run backend` again. Otherwise, consider connecting to your own DB with your own DB_Username, DB_Password and DB_Connection_String

