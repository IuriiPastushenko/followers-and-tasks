import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id_user: number;

	@Column({ type: 'varchar', length: 20, nullable: false })
	first_name: string;

	@Column({ type: 'varchar', length: 20, nullable: false })
	gender: string;
}
