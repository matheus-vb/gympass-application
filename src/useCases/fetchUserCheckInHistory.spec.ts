import { InMemoryCheckInsRepository } from "@/repositories/inMemory/inMemoryCheckInsRepository";
import { expect, describe, test, beforeEach } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetchUserCheckInHistory";

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe("Fetch user check in history use case", () => {
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
            userId: "user1",
            page: 1
        });

        expect(checkIns).toHaveLength(2);
    })

    test("should be able to fetch paginated check in history", async () => {

        for(var i = 0; i < 22; i++) {
            inMemoryCheckInRepository.create({
                gymId: `gym${i}`,
                user_id: "user1"
            })
        }

        const { checkIns } = await sut.execute({
            userId: "user1",
            page: 2
        });

        expect(checkIns).toHaveLength(2);
    })
})