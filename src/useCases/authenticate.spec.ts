import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";
import { hash } from "bcryptjs";
import { expect, describe, test } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";

describe("Authenticate use case", () => {
    test("should be able to authenticate", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(inMemoryUserRepository);

        await inMemoryUserRepository.create({
            name: "Luis",
            email: "luis@email.com",
            password_hash: await hash("senha987", 6),
        })

        const { user } = await sut.execute({
            email: "luis@email.com",
            password: "senha987",
        })

        expect(user.id).toEqual(expect.any(String));
    })

    test("should not be able to authenticate with wrong email", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(inMemoryUserRepository);

        await expect(() => 
            sut.execute({
                email: "luis@email.com",
                password: "senha987",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test("should not be able to authenticate with wrong password", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(inMemoryUserRepository);

        await inMemoryUserRepository.create({
            name: "Luis",
            email: "luis@email.com",
            password_hash: await hash("senha987", 6),
        })

        await expect(() => 
            sut.execute({
                email: "luis@email.com",
                password: "senha123",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})