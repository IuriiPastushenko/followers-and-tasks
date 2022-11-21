import { Chance } from 'chance';
//import { IUser } from '../users/users.interfaces';
import { maxUsers } from './seeding.users';

const chance = new Chance();


for (let i = 1; i <= maxUsers; i++) {
    chance.natural({min: 1, max: 5, exclude: [1, 3]});
    => 2



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
