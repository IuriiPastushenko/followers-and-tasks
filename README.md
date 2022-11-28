REST app based on Node.JS (Express, TypeScript, TypeORM, PostgreSQL) and which will contain: random born users and connections between them. Upon request, it will be necessary to provide the necessary information.

Capabilities:
1. Script for generating random data followers/src/seeds/seeding.users.ts
Settings:
  const maxUsers = 200 - maximum number of users;
  const maxRelationship = maxUsers * 10 - maximum number of subscriptions;
  const maxRelationshipPerOneUse = 150 - maximum number of subscriptions per user;
Run on command for script: npm run create_tables

2. Run on command app: npm run start
   Port: 3000;

3. In the application are used the following middleware:
- error handler
followers/src/errors/ error.middleware.ts;
 - inputdata validator
 - followers/src/midlleware/validate.middleware.ts

4. Endpoint: localhost:3000/users
  - getting a list of users who have subscriptions to other users.

5. Endpoint: /users/123/friends?order_by=id_user&order_type=desc
 - getting information about the user with friends and available sorting by the specified field. (for friends we will consider mutual subscription)

6. Endpoint: localhost:3000/max-following
 - getting the top 5 users who made the most subscriptions.

7. Endpoint: localhost:3000/not-following
 - receiving users who have made 0 subscriptions.

