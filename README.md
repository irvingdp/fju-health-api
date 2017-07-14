# fju-health-api

SETUP Dependencies
-
- Install docker engine
- Install docker-compose
- Install nodejs,npm,gulp
- Install the following global package npm:
```
npm i -g gulp-cli
npm i -g knex
```

Build Project
-

```
    cd <project dir>
    npm install
    gulp setup --env={dev}
    gulp build-api-server

```

{dev} = [dev | stg | prod]

API Server Endpoint
-
- API: http://localhost:3001
- Swagger: http://localhost:8080

