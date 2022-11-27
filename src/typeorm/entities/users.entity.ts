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

  @OneToMany(
    () => Relationships,
    (relationshipLider) => relationshipLider.author,
  )
  authors: Relationships[];

  @OneToMany(
    () => Relationships,
    (relationshipFollower) => relationshipFollower.follower,
  )
  followers: Relationships[];
}
