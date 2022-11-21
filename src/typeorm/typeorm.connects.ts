import { DataSource } from 'typeorm';
import { typeOrmConfig } from './data-source';

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
}
