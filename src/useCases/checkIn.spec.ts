import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./checkIn";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("CheckIn use case", () => {
    beforeEach(() => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymsRepository);

        vi.useFakeTimers();

        inMemoryGymsRepository.gyms.push({
          id: "gym1",
          title: "Gym",
          phone: "",
          description: "",
          latitude: new Decimal(0),
          longitude: new Decimal(0),  
        })
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    test("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

    test("should not be able to check in twice on the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12, 0, 0))

        await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() => sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(Error)
    })

    test("should not be able to check in twice on different dates", async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12, 0, 0))

        await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2022, 0, 2, 12, 0, 0))

        const secondCheckIn = await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(secondCheckIn.checkIn.id).toEqual(expect.any(String));
    })
})