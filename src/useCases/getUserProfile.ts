import { IUsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";

interface IGetUserProfileRequest {
    userId: string;
}

interface IGetUserProfileResponse {
    user: User;
}

export class GetUserProfileUseCase {
    constructor(private usersReposiotry: IUsersRepository) {}

    async execute({ userId }: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {
        const user = await this.usersReposiotry.findById(userId);

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }
    }
}