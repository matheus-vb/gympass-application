import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { FetchNearbyGymsUseCase } from "../fetchNearbyGyms";

export function makeFetchNearbyGymsUseCase() {
    const gymsRepoistory = new PrismaGymsRepository();
    const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepoistory);

    return fetchNearbyGymsUseCase;
}