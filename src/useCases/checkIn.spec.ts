import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { expect, describe, test, beforeEach } from "vitest";
import { CheckInUseCase } from "./checkIn";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("CheckIn use case", () => {
    beforeEach(() => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(inMemoryCheckInRepository);
    })

    test("should be able to create a new check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym1",
            userId: "user1",
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })
})