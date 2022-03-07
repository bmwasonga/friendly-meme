## Taskify

to run this application on your local device, create and fill the information that is necessary for sequelize to initiate the database.

install all the packages with `yarn install`.

the file looks like this:
`

`development": { "username": "YOUR USERNAME", "password": "YOUR PASSWORD", "database": "YOUR_DB", "host": "127.0.0.1", "dialect": "postgres"} `

run `yarn migrate` while on the root directory to begin. If you wish to seed data for demontration, run the command:
`sequelize-cli db:seed:all` and this will give you data from `faker`.

Switch to the frontend in the folder `client`, install all the packages with `yarn install` and start the application with `yarn start`.

register a user with credentials of your choice. You cannot use the data provided by Faker because it will fail authentication.
