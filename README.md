<h1 align="center">Apollo Server Express Boilerplate</h1>

Boilerplate for graphql and graphql-ws using Apollo Server Express and powered by TypeORM and TypeGraphQL to make your work is quicker and easier.

<div align="center">

Made with :two_hearts: by [Arya W Pratama](https://github.com/aryawpratama)
</div>
<div align="center">

***I hope you like it! :wink:***
</div>

<div align="center">

**Powered by**
</div>
<div align="center">
<a href="https://www.apollographql.com/" title="Apollo"><img src="icons/apollo.png" /></a>
<a href="https://typegraphql.com/" title="TypeGraphQL"><img src="icons/typegraphql.png" /></a>
<a href="https://typeorm.io/" title="TypeORM"><img src="icons/typeorm.png" /></a>
<a href="https://nodejs.org/" title="NodeJS"><img src="icons/nodejs.png" /></a>
<a href="https://expressjs.com/" title="Express"><img src="icons/express.png" /></a>
<a href="https://www.typescriptlang.org/" title="TypeScript"><img src="icons/typescript.png" /></a>
<a href="https://www.mysql.com/" title="MySQL"><img src="icons/mysql.png" /></a>
</div>

## Features 
- Basic JWT Login and Register System.
- Role Based Access Control Guard.
- GraphQL WebSocket with [graphql-ws](https://github.com/enisdenjo/graphql-ws).
- Database Faker with Faker and [TypeORM Seeding](https://github.com/w3tecch/typeorm-seeding).
- graphql-ws, client example in [graphqlwsclient](https://github.com/aryawpratama/apollographql-boilerplate/tree/graphqlwsclient) branch.
- Path Alias.
- TypeGraphQL.
- Typescript. :heart:
- Build helper, to make your build folder clean.
- ESLint Airbnb.

## How to Use 
1. Rename ```.env.example``` to ```.env```
2. Fill the ```.env``` with your own configuration
3. Run ```yarn``` or ```npm install``` to install the dependencies
4. Run ```yarn seed``` or ```npm run seed``` to seed your database
5. Finally run ```yarn dev``` or ```npm run dev``` to start the server in Development Mode

## Command Explanation
- **```yarn build``` or ```npm run build```**
    - Build your project, the output will be in ```/dist``` directory
- **```yarn dev``` or ```npm run dev```**
    - Start your server in Develompent Mode
- **```yarn staging``` or ```npm run staging```**
    - Start your server in Develompent in Staging Mode ***Make sure you build your project first***
- **```yarn production``` or ```npm run production```**
    - Start your server in Develompent in Production Mode ***Make sure you build your project first***
- **```yarn seed``` or ```npm run seed```**
    - Seed your database
- **```yarn schema:sync``` or ```npm run schema:sync```**
    - Sync your entities with your database
- **```yarn schema:drop``` or ```npm run schema:drop```**
    - Drop all of your table in your database
- **```yarn migration:run``` or ```npm run migration:run```**
    - Migrating Database
- **```yarn migration:revert``` or ```npm run migration:revert```**
    - Revert database Migration
- **```yarn database:refresh``` or ```npm run database:refresh```**
    - Refresh your database with new table and data

## Important Account 
1. Admin
    - username : admin@example.com
    - password : admin
2. Organizer
    - username : organizer@example.com
    - password : organizer
3. User
    - username : user@example.com
    - password : user

## Note
- You may use another database like oracledb, mariadb, postgresql, etc. Just remove the ```mysql``` dependency and install your own database dependency as long as typeorm support it.
- I have installed graphql-ws to make your work easier, just disable it if you don't want graphql subscription run in your project.
- I use id_ID for default user faker data, just change the locale in ```@factories/dummyUser.factory.ts``` directory.
- I've setup path alias in this project, you may found and edit it by your own decision in ```tsconfig.json``` 
- I'm not an expert so I might make a lot of mistake, I just want to make your work is easier. Your feedback would make me be a better developer! :heart:
