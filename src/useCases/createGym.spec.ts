import { InMemoryGymsRepository } from "@/repositories/inMemory/inMemoryGymsRepository";
import { describe } from "vitest";
import { beforeEach, expect, test } from "vitest";
import { CreateGymUseCase } from "./createGym";


let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

let gymLatitude = 51.5517641;
let gymLongitude = -0.1270904;

describe("Create gym use case", () => {
    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(inMemoryGymsRepository);
    })

    test("should be able to create gym", async () => {
        const { gym } = await sut.execute({
            title: "Gym 01",
            description: "First gym",
            phone: "998765432",
            latitude: gymLatitude,
            longitude: gymLongitude,
        })

        expect(gym.id).toEqual(expect.any(String));
    })
})