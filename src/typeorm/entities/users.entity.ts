/* eslint-disable indent */
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { Relationships } from './relationships.enity';

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id_user: number;

	@Column({ type: 'varchar', length: 20, nullable: false })
	first_name: string;

	@Column({ type: 'varchar', length: 20, nullable: false })
	gender: string;

	@OneToMany(() => Relationships, (relationship) => relationship.lider)
	// @JoinColumn({
	// 	name: 'lider',
	// 	referencedColumnName: 'lider',
	// })
	relationshipLider: Relationships[];

	@OneToMany(() => Relationships, (relationship) => relationship.follower)
	// @JoinColumn({
	// 	name: 'follower',
	// 	referencedColumnName: 'follower',
	// })
	relationshipFollower: Relationships[];
}
