import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import { ValidateCheckInUseCase } from "./validateCheckIn";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe("Validate checkIn use case", () => {
    beforeEach(async () => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(inMemoryCheckInRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        //vi.useRealTimers();
    })

    test("should be able to validate check-in", async () => {
        const checkIn = await inMemoryCheckInRepository.create({
            gymId: "Gym 01",
            user_id: "User 01"
        })
        
        await sut.execute({ checkInId: checkIn.id })

        expect(checkIn.validate_at).toEqual(expect.any(Date));
    })

    test("should not be able to validate inexistent check-in", async () => {
        await expect(() => 
            sut.execute( {
                checkInId: "inexistent check-in"
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    test("should not be able to validate check-in 20 minutes over its creation", async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 18, 0));

        const createdCheckIn = await inMemoryCheckInRepository.create({
            gymId: "gym1",
            user_id: "user1",
        })

        const timeInMs = 1000 * 60 * 21;

        vi.advanceTimersByTime(timeInMs)

        await expect(() => 
            sut.execute( {
                checkInId: createdCheckIn.id
            }),
        ).rejects.toBeInstanceOf(Error)
    })
})