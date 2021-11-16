import AppError from '@shared/errors/AppError';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    Generated
} from 'typeorm';

@Entity('user_tokens') //Table
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default UserToken;
