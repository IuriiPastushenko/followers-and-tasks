import { DataSource } from 'typeorm';
import { nameSort } from '../users/dto/getFriends.dto';
import { IUser } from '../users/interfaces/users.interfaces';
import { typeOrmConfig } from './data-source';
import { Relationships } from './entities/relationships.enity';
import { Users } from './entities/users.entity';

export class TypeOrmConnects {
	private dataSource: DataSource;
	constructor() {
		this.dataSource = new DataSource(typeOrmConfig);
	}

	// Connection to DB
	async initialize(): Promise<void> {
		try {
			await this.dataSource.initialize();
			console.log('Connection to BD(TypeORM) successful');
		} catch (err) {
			console.log('Error connection to DB');
			throw err;
		}
	}

	// Get users with relationships
	async usersList(): Promise<IUser[]> {
		const resultFromDB = await this.dataSource
			.getRepository(Users)
			.createQueryBuilder('users')
			.distinctOn(['users.user_id'])
			//.innerJoinAndSelect('users.relationshipLider', 'rl')
			//.orderBy('users.user_id')
			.getMany();
		return resultFromDB;
	}

	// Get users with relationships
	async getFriends(idUser: number, sortByInput: string) {
		let sortBy: 'ASC' | 'DESC';
		if (sortByInput === 'desc') {
			sortBy = 'DESC';
		} else {
			sortBy = 'ASC';
		}
		const resultFromDB = await this.dataSource
			.getRepository(Relationships)
			.createQueryBuilder('relationships')
			.orderBy('lider', sortBy)
			.getMany();
		return resultFromDB;
	}
}
