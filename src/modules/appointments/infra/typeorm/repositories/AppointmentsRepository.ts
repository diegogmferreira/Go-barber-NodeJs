import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInProviderMonthDTO from '@modules/appointments/dtos/IFindAllInProviderMonthDTO';
import IFindAllInProviderDayDTO from '@modules/appointments/dtos/IFindAllInProviderDayDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;
    
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
            order: { date: 'ASC' }
        });

        return findAppointment;
    };

    public async findAllInProviderMonth({ provider_id, month, year }: IFindAllInProviderMonthDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                )
            },
            order: {
                date: 'ASC',
            }
            
        });

        return appointments;
    };

    public async findAllInProviderDay({ provider_id, day, month, year }: IFindAllInProviderDayDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');
        
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                )
            },
            order: { date: 'ASC' },
            relations: ['user'],
        });

        return appointments;
    };

    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, user_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
};

export default AppointmentsRepository;