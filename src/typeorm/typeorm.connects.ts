import { DataSource } from 'typeorm';
import { IRelationship } from '../users/interfaces/relationship.interface';
import { IUser } from '../users/interfaces/user.interface';
import { ISubscription } from '../users/interfaces/user.subscription';
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
			.distinctOn(['users.id_user'])
			.innerJoin(Relationships, 'rlt', 'users.id_user = rlt.author')
			.orderBy('id_user')
			.getMany();
		return resultFromDB;
	}

	// Get friends(friends - have a mutual subscription)
	async getFriends(
		idUser: number,
		sortByInput: string,
	): Promise<IRelationship[]> {
		let sortBy: 'ASC' | 'DESC';
		if (sortByInput === 'desc') {
			sortBy = 'DESC';
		} else {
			sortBy = 'ASC';
		}
		const resultFromDB = await this.dataSource
			.getRepository(Relationships)
			.createQueryBuilder('rlt')
			.where((qb) => {
				const subQuery = qb
					.subQuery()
					.select('rltn.follower')
					.from(Relationships, 'rltn')
					.where('rltn.author = :author', { author: `${idUser}` })
					.getQuery();
				return 'rlt.author IN ' + subQuery;
			})
			.andWhere('rlt.follower = :follower', { follower: `${idUser}` })
			.orderBy('rlt.follower', sortBy)
			.getMany();
		return resultFromDB;
	}

	// Getting the top 5 users who made the most subscriptions.
	async topFive(): Promise<ISubscription[]> {
		const resultFromDB = await this.dataSource
			.getRepository(Relationships)
			.createQueryBuilder('rtl')
			.select('rtl.follower', 'follower')
			.addSelect('Count(rtl.follower) as count')
			.groupBy('rtl.follower')
			.orderBy('count', 'DESC')
			.limit(5)
			.getRawMany();
		return resultFromDB;
	}

	// Getting users with subscriptions = 0
	async getZero(): Promise<ISubscription[]> {
		const resultFromDB = await this.dataSource
			.getRepository(Users)
			.createQueryBuilder('us')
			.select('us.id_user')
			.where((qb) => {
				const subQuery = qb
					.subQuery()
					.select('rlt.follower')
					.from(Relationships, 'rlt')
					.getQuery();
				return 'NOT us.id_user IN ' + subQuery;
			})
			.getMany();
		return resultFromDB;
	}
}
