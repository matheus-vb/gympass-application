import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./checkIn";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("CheckIn use case", () => {
    beforeEach(() => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(inMemoryCheckInRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    test("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym1",
            userId: "user1",
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

    test("should not be able to check in twice on the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12, 0, 0))

        await sut.execute({
            gymId: "gym1",
            userId: "user1",
        })

        await expect(() => sut.execute({
            gymId: "gym1",
            userId: "user1",
        })).rejects.toBeInstanceOf(Error)
    })

    test("should not be able to check in twice on different dates", async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12, 0, 0))

        await sut.execute({
            gymId: "gym1",
            userId: "user1",
        })

        vi.setSystemTime(new Date(2022, 0, 2, 12, 0, 0))

        const secondCheckIn = await sut.execute({
            gymId: "gym1",
            userId: "user1",
        })

        expect(secondCheckIn.checkIn.id).toEqual(expect.any(String));
    })
})