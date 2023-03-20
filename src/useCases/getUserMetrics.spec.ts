import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { expect, describe, test, beforeEach } from "vitest";
import { GetUserMetricsUseCase } from "./getUserMetrics";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe("CheckIn use case", () => {
    beforeEach(async () => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(inMemoryCheckInRepository);

   
    })

    test("should be able to get a user check in metrics", async () => {
        inMemoryCheckInRepository.create({
            gymId: "gym1",
            user_id: "user1"
        });

        inMemoryCheckInRepository.create({
            gymId: "gym2",
            user_id: "user1"
        });

        inMemoryCheckInRepository.create({
            gymId: "gym3",
            user_id: "user1"
        });

        const { checkInsCount } = await sut.execute({
            userId: "user1",
        });

        console.log(checkInsCount);

        expect(checkInsCount).toEqual(3);
    })
})