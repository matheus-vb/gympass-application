import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";
import { hash } from "bcryptjs";
import { expect, describe, test, beforeEach } from "vitest";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import { GetUserProfileUseCase } from "./getUserProfile";

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe("Get user profile use case", () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository();
        sut = new GetUserProfileUseCase(inMemoryUserRepository);
    })

    test("should be able to get user profile", async () => {
        const createdUser = await inMemoryUserRepository.create({
            name: "Luis",
            email: "luis@email.com",
            password_hash: await hash("senha987", 6),
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toBe("Luis");
    })

    test("should not be able to get user profile using wrong ID", async () => {
        await expect(() => sut.execute({
            userId: "non-existent-id",
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    })
    
})