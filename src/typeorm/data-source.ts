import { DataSourceOptions } from 'typeorm';
import { Users } from './entities/users.entity';

export const typeOrmConfig: DataSourceOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '17071707',
	database: 'followers',
	synchronize: false,
	logging: true,
	entities: [Users],
	subscribers: [],
	migrations: ['src/migrations/*.js'],
};
