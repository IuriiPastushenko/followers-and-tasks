import { Chance } from 'chance';
import { Client } from 'pg';

(async (): Promise<void> => {
  const chance = new Chance();
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'followers',
    password: '17071707',
    port: 5432,
  });

  // number of users from the test task
  const maxUsers = 200;
  const maxRelationship = maxUsers * 10;
  const maxRelationshipPerOneUse = 150;

  let nameGender: string;
  let username: string;
  let queryToDB: string;
  const countRelationshipPerOneUse: {
    [key: string]: number;
  } = {};

  await client.connect();
  console.log('Connection to DB is successful');

  queryToDB =
    'CREATE TABLE users\
		 (id_user SERIAL PRIMARY KEY, \
			first_name CHARACTER VARYING (20) NOT NULL, \
			gender CHARACTER VARYING (20) NOT NULL);';
  await client.query(queryToDB);

  for (let i = 1; i <= maxUsers; i++) {
    const randomBool = chance.bool();
    if (randomBool) {
      nameGender = 'male';
      username = chance.name({ gender: 'male' });
    } else {
      nameGender = 'female';
      username = chance.name({ gender: 'female' });
    }
    queryToDB = `INSERT INTO users(first_name, gender) 
		VALUES ('${username}', '${nameGender}')`;
    await client.query(queryToDB);
  }

  queryToDB =
    'CREATE TABLE relationships\
	  (id_relationship SERIAL, \
		author INTEGER NOT NULL, \
		follower INTEGER NOT NULL, \
		FOREIGN KEY(author) REFERENCES users (id_user), \
		FOREIGN KEY(follower) REFERENCES users (id_user));';
  await client.query(queryToDB);

  for (let i = 1; i <= maxRelationship; i++) {
    const randomAuthor = chance.natural({
      min: 1,
      max: maxUsers,
    });
    const checkRandomAuthor = randomAuthor.toString();
    if (checkRandomAuthor in countRelationshipPerOneUse) {
      if (
        countRelationshipPerOneUse[checkRandomAuthor] < maxRelationshipPerOneUse
      ) {
        countRelationshipPerOneUse[checkRandomAuthor] =
          countRelationshipPerOneUse[checkRandomAuthor] + 1;
      } else {
        continue;
      }
    } else {
      countRelationshipPerOneUse[checkRandomAuthor] = 0;
    }

    const randomFollower = chance.natural({
      min: 1,
      max: maxUsers,
      exclude: [randomAuthor],
    });

    queryToDB = `INSERT INTO relationships(author, follower) 
		    	VALUES ('${randomAuthor}', '${randomFollower}')`;
    await client.query(queryToDB);
  }

  await client.end();
  console.log('Detachment from DB is successful');
})();
