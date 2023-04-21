import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { CreateGymUseCase } from "../createGym";

export function makeCreateGymUseCase() {
    const gymsRepoistory = new PrismaGymsRepository();
    const createGymUseCase = new CreateGymUseCase(gymsRepoistory);

    return createGymUseCase;
}