/* eslint-disable indent */
import { userInfo } from 'os';
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

	@Column({ name: 'lider', type: 'float4', nullable: false })
	lider: number;

	@Column({ type: 'float4', nullable: false })
	follower: number;

	@ManyToOne(() => Users, (userLider) => userLider.liders)
	@JoinColumn({
		name: 'lider',
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
