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
	lider: number;

	@Column({ type: 'float4', nullable: false })
	follower: number;

	@ManyToOne(() => Users, (userLider) => userLider.id_user)
	userLider: Users;

	@ManyToOne(() => Users, (userFollower) => userFollower.id_user)
	userFollower: Users;
}
