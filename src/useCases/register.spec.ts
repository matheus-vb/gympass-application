import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";
import { compare } from "bcryptjs";
import { expect, describe, test } from "vitest";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";
import { RegisterUseCase } from "./register";

describe("Register use case", () => {
    test("should be able to register new user", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const { user } = await registerUseCase.execute({
            name: "Luis",
            email: "luis@email.com",
            password: "senha987",
        })

        expect(user.id).toEqual(expect.any(String));
    })
    
    test("should hash user password", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const { user } = await registerUseCase.execute({
            name: "Luis",
            email: "luis@email.com",
            password: "senha987",
        })

        const isPasswordHashed = await compare("senha987", user.password_hash);

        expect(isPasswordHashed).toBe(true);
    })

    test("should not be able to register the same email twice", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const email = "luis@email.com";

        await registerUseCase.execute({
            name: "Luis",
            email,
            password: "senha987",
        })

        await expect(() => registerUseCase.execute({
            name: "Luis Suil",
            email,
            password: "senha987"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})