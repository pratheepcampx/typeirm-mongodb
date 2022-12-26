import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './blog.entity';
import { PersonalDetails } from './personalDetails.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => PersonalDetails)
  @JoinColumn()
  personalDetails: PersonalDetails;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Blog, (blog) => blog.user, { cascade: true })
  blogs: Blog[];
}
