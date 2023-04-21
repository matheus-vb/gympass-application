import { PrismaUsersRepository } from "@/repositories/prisma/PrimsaUsersRepository";
import { GetUserProfileUseCase } from "../getUserProfile";

export function makeGetUserProfileUseCase() {
    const userRepoistory = new PrismaUsersRepository();
    const getUserProfile = new GetUserProfileUseCase(userRepoistory);

    return getUserProfile;
}