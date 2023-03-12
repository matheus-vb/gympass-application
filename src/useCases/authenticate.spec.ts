import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";
import { hash } from "bcryptjs";
import { expect, describe, test, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";

let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe("Authenticate use case", () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository();
        sut = new AuthenticateUseCase(inMemoryUserRepository);
    })

    test("should be able to authenticate", async () => {
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
        await expect(() => 
            sut.execute({
                email: "luis@email.com",
                password: "senha987",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test("should not be able to authenticate with wrong password", async () => {
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