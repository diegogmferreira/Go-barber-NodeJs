import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInProviderMonthDTO from '../dtos/IFindAllInProviderMonthDTO';
import IFindAllInProviderDayDTO from '../dtos/IFindAllInProviderDayDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
    findAllInProviderMonth(data: IFindAllInProviderMonthDTO): Promise<Appointment[]>;
    findAllInProviderDay(data: IFindAllInProviderDayDTO): Promise<Appointment[]>;
}