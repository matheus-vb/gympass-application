import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { expect, describe, test, beforeEach } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetchUserCheckInHistory";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe("CheckIn use case", () => {
    beforeEach(async () => {
        inMemoryCheckInRepository = new InMemoryCheckInsRepository();
        sut = new FetchUserCheckInHistoryUseCase(inMemoryCheckInRepository);

   
    })

    test("should be able to fetch a user check in history", async () => {
        inMemoryCheckInRepository.create({
            gymId: "gym1",
            user_id: "user1"
        });

        inMemoryCheckInRepository.create({
            gymId: "gym2",
            user_id: "user1"
        });

        const { checkIns } = await sut.execute({
            userId: "user1"
        });

        expect(checkIns).toHaveLength(2);
    })

    
})