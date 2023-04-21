import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { CheckInUseCase } from "../checkIn";
import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";

export function makeCheckInUseCase() {
    const checkInRepoistory = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository()
    const checkInUseCase = new CheckInUseCase(checkInRepoistory, gymsRepository)

    return checkInUseCase;
}