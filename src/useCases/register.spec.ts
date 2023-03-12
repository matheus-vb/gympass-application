import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";
import { compare } from "bcryptjs";
import { expect, describe, test, beforeEach } from "vitest";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";
import { RegisterUseCase } from "./register";

let inMemoryUserRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe("Register use case", () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository();
        sut = new RegisterUseCase(inMemoryUserRepository);
    })

    test("should be able to register new user", async () => {
        const { user } = await sut.execute({
            name: "Luis",
            email: "luis@email.com",
            password: "senha987",
        })

        expect(user.id).toEqual(expect.any(String));
    })
    
    test("should hash user password", async () => {
        const { user } = await sut.execute({
            name: "Luis",
            email: "luis@email.com",
            password: "senha987",
        })

        const isPasswordHashed = await compare("senha987", user.password_hash);

        expect(isPasswordHashed).toBe(true);
    })

    test("should not be able to register the same email twice", async () => {
        const email = "luis@email.com";

        await sut.execute({
            name: "Luis",
            email,
            password: "senha987",
        })

        await expect(() => sut.execute({
            name: "Luis Suil",
            email,
            password: "senha987"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})