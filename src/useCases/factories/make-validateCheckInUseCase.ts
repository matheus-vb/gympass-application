import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { ValidateCheckInUseCase } from "../validateCheckIn";

export function makeValidateCheckInUseCase() {
    const checkInRepoistory = new PrismaCheckInsRepository();
    const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepoistory);

    return validateCheckInUseCase;
}