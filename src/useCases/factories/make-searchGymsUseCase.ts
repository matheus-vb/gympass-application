import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { SearchGymsUseCase } from "../searchGyms";

export function makeCreateGymUseCase() {
    const gymsRepoistory = new PrismaGymsRepository();
    const searchGymsUseCase = new SearchGymsUseCase(gymsRepoistory);

    return searchGymsUseCase;
}