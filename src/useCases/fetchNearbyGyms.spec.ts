import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime";
import { describe } from "vitest";
import { beforeEach, expect, test } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetchNearbyGyms";

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

let nearGymLatitude = 51.5517641;
let nearGymLongitude = -0.1270904;

let farGymLatitude = 50.9142877;
let farGymLongitude = -1.3621827;

let userLatitude = 51.5581375;
let userLongitude = -0.1071289;

describe("Fetch nearby gyms use case", () => {
    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository);
    })

    test("should be able to fetch nearby gyms", async () => {

        await inMemoryGymsRepository.create({
            title: "Gym 01",
            description: "Near gym",
            phone: "998765432",
            latitude: new Decimal(nearGymLatitude),
            longitude: new Decimal (nearGymLongitude),
        })

        await inMemoryGymsRepository.create({
            title: "Gym 02",
            description: "Far gym",
            phone: "998765432",
            latitude: new Decimal(farGymLatitude),
            longitude: new Decimal (farGymLongitude),
        })

        const { gyms } = await sut.execute({
            userLatitude,
            userLongitude,
        })

        expect(gyms.length).toEqual(1);
        expect(gyms).toEqual([expect.objectContaining({ description: "Near gym" })]);
    })
})