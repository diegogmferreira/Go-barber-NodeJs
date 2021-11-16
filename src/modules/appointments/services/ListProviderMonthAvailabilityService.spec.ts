import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
    })

    it('should be able to list provider`s month availability', async () => {
        await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 10, 6, 8, 0, 0) //2020, novembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 11, 6, 8, 0, 0) //2020, dezembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 11, 6, 9, 0, 0) 
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 10, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 11, 0, 0) 
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 12, 0, 0) 
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 13, 0, 0) 
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 14, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 15, 0, 0) 
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 16, 0, 0) 
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 17, 0, 0) 
        });

        const availability = await listProviderMonthAvailability.execute({
           provider_id: 'provider',
           year: 2020,
           month: 12
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 6, available: false },
            { day: 7, available: true },
            { day: 8, available: true },
            { day: 9, available: true },
        ]))
    });
})