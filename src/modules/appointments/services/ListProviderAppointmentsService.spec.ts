import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
    })

    it('should be able to list provider`s appointments', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 11, 6, 8, 0, 0) //2020, novembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        const appointment2 = await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 11, 6, 9, 0, 0) //2020, dezembro, 6, as 8 horas, 0 minutos e 0 segundos;
        });

        const appointment3 = await fakeAppointmentsRepository.create({
           provider_id: 'provider',
           user_id: 'user',
           date: new Date(2020, 11, 6, 10, 0, 0) 
        });

        const appointment4 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 12, 0, 0) 
        });

        const appointment5 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 14, 0, 0)
        });

        const appointment6 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 15, 0, 0) 
        });

        const appointment7 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 11, 6, 17, 0, 0) 
        });

        const appointments = await listProviderAppointments.execute({
           provider_id: 'provider',
           year: 2020,
           month: 12,
           day: 6
        });

        expect(appointments).toEqual(expect.arrayContaining([
            appointment1,
            appointment2,
            appointment3,
            appointment4,
            appointment5,
            appointment6,
            appointment7,
        ]));
    });
})