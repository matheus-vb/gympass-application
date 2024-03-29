import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { expect, describe, test, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./checkIn";
import { MaxCheckInsError } from "./errors/maxCheckInsError";
import { MaxDistanceError } from "./errors/maxDistanceError";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

//51.5581375,-0.1071289
let userLatitude = 51.5581375;
let userLongitude = -0.1071289;

//51.5517641,-0.1270904
let farGymLatitude = 51.5517641;
let farGymLongitude = -0.1270904;

describe("CheckIn use case", () => {
    beforeEach(async () => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymsRepository);

        vi.useFakeTimers();

        await inMemoryGymsRepository.create({
            id: "gym1",
            title: "Gym",
            phone: "",
            description: "",
            latitude: userLatitude,
            longitude: userLongitude,
        })
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    test("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: userLatitude,
            userLongitude: userLongitude,
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

    test("should not be able to check in twice on the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12, 0, 0))

        await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: userLatitude,
            userLongitude: userLongitude,
        })

        await expect(() => sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: userLatitude,
            userLongitude: userLongitude,
        })).rejects.toBeInstanceOf(MaxCheckInsError)
    })

    test("should not be able to check in twice on different dates", async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12, 0, 0))

        await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: userLatitude,
            userLongitude: userLongitude,
        })

        vi.setSystemTime(new Date(2022, 0, 2, 12, 0, 0))

        const secondCheckIn = await sut.execute({
            gymId: "gym1",
            userId: "user1",
            userLatitude: userLatitude,
            userLongitude: userLongitude,
        })

        expect(secondCheckIn.checkIn.id).toEqual(expect.any(String));
    })

    test("should not be able to check in when far from gym", async () => {
        inMemoryGymsRepository.gyms.push({
            id: "gym2",
            title: "Far Gym",
            phone: "",
            description: "",
            latitude: new Decimal(farGymLatitude),
            longitude: new Decimal(farGymLongitude),
        })

        await expect(() => sut.execute({
            gymId: "gym2",
            userId: "user1",
            userLatitude: userLatitude,
            userLongitude: userLongitude,
        })).rejects.toBeInstanceOf(MaxDistanceError);
    })
})