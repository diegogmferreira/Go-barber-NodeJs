import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
    })

    it('should be able to list provider`s day availability', async () => {
        await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 10, 6, 8, 0, 0) //2020, novembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 10, 6, 10, 0, 0) //2020, novembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 10, 6, 14, 0, 0) //2020, dezembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 10, 6, 16, 0, 0) 
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
           return new Date(2020, 10, 6, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
           provider_id: 'provider',
           year: 2020,
           month: 11,
           day: 6
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 12, available: true },
            { hour: 14, available: false },
            { hour: 15, available: true },
        ]))
    });

    
})