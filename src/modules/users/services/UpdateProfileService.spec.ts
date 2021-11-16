import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider()
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to update a user`s profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Diego',
            email: 'test@example.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Outro Diego',
            email: 'outro_test@example.com',
        });

        expect(updatedUser.name).toBe('Outro Diego');
        expect(updatedUser.email).toBe('outro_test@example.com');
    });

    it('should not be able to update the user`s profile from non-existing user', async () => {
        expect(updateProfile.execute({
            user_id: 'non-existing-user-id',
            name: 'Test',
            email: 'test@example.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change user`s email to another email already in use', async () => {
        await fakeUsersRepository.create({
            name: 'Diego',
            email: 'diego@example.com',
            password: '123456'
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password: '123456'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Outro Test',
                email: 'diego@example.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update a user`s password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Diego',
            email: 'test@example.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Outro Diego',
            email: 'outro_test@example.com',
            old_password: '123456',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update a user`s password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Diego',
            email: 'test@example.com',
            password: '123456'
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Outro Diego',
            email: 'outro_test@example.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a user`s password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Diego',
            email: 'test@example.com',
            password: '123456'
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Outro Diego',
            email: 'outro_test@example.com',
            old_password: 'wrong-password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);
    });
})