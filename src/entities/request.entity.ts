import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum RequestStatus {
    NEW = 'Новое',
    IN_PROGRESS = 'В работе',
    COMPLETED = 'Завершено',
    CANCELED = 'Отменено',
}

@Entity({ name: 'requests' })
export class Request {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    subject!: string;

    @Column('text')
    text!: string;

    @Column({
        type: 'enum',
        enum: RequestStatus,
        default: RequestStatus.NEW,
    })
    status!: RequestStatus;

    @Column('text', { nullable: true })
    resolution?: string;

    @Column('text', { nullable: true })
    cancellationReason?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
