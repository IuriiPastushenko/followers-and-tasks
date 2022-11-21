import { Chance } from 'chance';
import { Client } from 'pg';
import { dbkeys } from './db.constants';

const chance = new Chance();
const client = new Client(dbkeys);

export const maxUsers = 3;
let nameGender;
let username;

async function connection() {
	await client.connect();
	console.log('Connection to DB is successful');
}

connection();

for (let i = 1; i <= maxUsers; i++) {
	const randomBool = chance.bool();
	if (randomBool) {
		nameGender = 'male';
		username = chance.name({ gender: 'male' });
	} else {
		nameGender = 'female';
		username = chance.name({ gender: 'female' });
	}

	const user = {
		first_name: username,
		gender: nameGender,
	};
	console.log(user);
}

async function connectionEnd() {
	await client.end();
	console.log('Detachment fromDB is successful');
}
connectionEnd();
