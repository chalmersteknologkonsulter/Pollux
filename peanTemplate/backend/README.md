## Setup 
This project is using **Node 6.x**. All dependencies can be found in `package.json` in the root folder. It is configured by running a **Makefile in the db folder**. It configures two **docker** containers, one for the redis instance and one for the local **PostgreSQL 9.5** database. For further configuration, check the Makefile.

## Development server

To run the project, follow these steps: 
1. Enter the db/ folder
2. ``make append`` appends all sql in ``db/sql`` to one ``init.sql`` file located in the same folder.
3. ``make container`` runs a docker container containing a PostgreSQL (``port 5432``) instance with ``init.sql`` inserted.
4. ``make redis`` runs a docker container containing a redis instance (``port 6379``) for caching user logins.
5. ``npm start`` starts the API on port ``3000``.

To stop the Postgres container, run the following command in the db/ folder:
* ``make clear``

 All resources are served on ``http://localhost:3000/api/``.

## Code scaffolding

There is a tool called resources that generates boilerplate files.
This command creates controller, model, route and test files to start with.
````
$ npm run generate image
````
This folder is generated in app directory
````
image/
|
| image.controller.js
| image.model.js
| image.model.test.js
| image.route.js
| image.route.test.js
|________
````

All Amazon AWS S3 communications can be found in ``utils/aws.js``.
## Build 
``NODE_ENV`` sets the state of the application and can be: ``test, development or production``.  
The project is storing and fetching resources from an **AWS S3** bucket with a **NodeJS AWS SDK**. Google OAuth is also being used.

The following environment variables has to exist in ``.env`` in the root folder (note that credentials are not included):
```
DEV_DATABASE=postgres://username:password@localhost:5432/db
AWS_ACCESS_KEY_ID=X
AWS_SECRET_ACCESS_KEY=X
GOOGLE_CLIENT_ID=X
GOOGLE_CLIENT_SECRET=-X
GOOGLE_CALLBACK_HOST=http://localhost:4200
GOOGLE_CALLBACK_PATH=/api/auth/google/callback
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Running unit tests
Unit tests are configured in [Mocha]('https://mochajs.org/'). These are run with ``npm test``, which sets ``NODE_ENV = test`` and has ``timeout = 8000 ``.
 
## License

MIT