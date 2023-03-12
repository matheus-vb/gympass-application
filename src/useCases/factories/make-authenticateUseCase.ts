import { PrismaUsersRepository } from "@/repositories/prisma/PrimsaUsersRepository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
    const userRepoistory = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepoistory);

    return authenticateUseCase;
}