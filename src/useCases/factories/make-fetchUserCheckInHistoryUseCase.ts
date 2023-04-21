import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { FetchUserCheckInHistoryUseCase } from "../fetchUserCheckInHistory";

export function makeFetchUserCheckInHistoryUseCase() {
    const checkInRepoistory = new PrismaCheckInsRepository();
    const fetchUserCheckInHistoryUseCase = new FetchUserCheckInHistoryUseCase(checkInRepoistory);

    return fetchUserCheckInHistoryUseCase;
}