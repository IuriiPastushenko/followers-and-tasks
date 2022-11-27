/* eslint-disable indent */
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Relationships {
	@PrimaryGeneratedColumn()
	id_relationship: number;

	@Column({ type: 'float4', nullable: false })
	author: number;

	@Column({ type: 'float4', nullable: false })
	follower: number;

	@ManyToOne(() => Users, (userAuthor) => userAuthor.authors)
	@JoinColumn({
		name: 'author',
		referencedColumnName: 'id_user',
	})
	userLider: Users;

	@ManyToOne(() => Users, (userFollower) => userFollower.followers)
	@JoinColumn({
		name: 'follower',
		referencedColumnName: 'id_user',
	})
	userFollower: Users;
}
