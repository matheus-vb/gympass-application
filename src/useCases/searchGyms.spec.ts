import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime";
import { describe } from "vitest";
import { beforeEach, expect, test } from "vitest";
import { SearchGymsUseCase } from "./searchGyms";


let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

let gymLatitude = 51.5517641;
let gymLongitude = -0.1270904;

describe("Search gym use case", () => {
    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(inMemoryGymsRepository);
    })

    test("should be able to search for gyms using title", async () => {

        await inMemoryGymsRepository.create({
            title: "Gym 01",
            description: "First gym",
            phone: "998765432",
            latitude: new Decimal(gymLatitude),
            longitude: new Decimal (gymLongitude),
        })

        await inMemoryGymsRepository.create({
            title: "Gym 02",
            description: "First gym",
            phone: "998765432",
            latitude: new Decimal(gymLatitude),
            longitude: new Decimal (gymLongitude),
        })

       await inMemoryGymsRepository.create({
            title: "Box",
            description: "First gym",
            phone: "998765432",
            latitude: new Decimal(gymLatitude),
            longitude: new Decimal (gymLongitude),
        })

        const { gyms } = await sut.execute({
            query: "Gym",
            page: 1
        })

        expect(gyms.length).toEqual(2);
    })

    test("should be able to search for paginated gyms using title", async () => {

        for(var i = 0; i < 22; i++) {
            await inMemoryGymsRepository.create({
                title: `Gym ${i}`,
                description: "First gym",
                phone: "998765432",
                latitude: new Decimal(gymLatitude),
                longitude: new Decimal (gymLongitude),
            })
        }
        

        const { gyms } = await sut.execute({
            query: "Gym",
            page: 2
        })

        expect(gyms.length).toEqual(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Gym 20" }),
            expect.objectContaining({ title: "Gym 21" })
        ])
    })
})