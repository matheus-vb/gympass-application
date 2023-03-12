import { IUsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";

interface IAuthenticateUseCaseRequest {
    email: string
    password: string
}

interface IAuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: IUsersRepository){}

    async execute({ email, password }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user
        }
    }
}