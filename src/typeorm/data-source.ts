import { DataSourceOptions } from 'typeorm';
import { Relationships } from './entities/relationships.enity';
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
  entities: [Users, Relationships],
  subscribers: [],
  migrations: [],
};
