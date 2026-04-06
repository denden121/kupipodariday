import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Exclude()
@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  @Column({ unique: true, length: 30 })
  username: string;

  @Expose()
  @Column({
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @Expose()
  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Expose({ groups: ['me'] })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Expose()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Expose()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Expose()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
