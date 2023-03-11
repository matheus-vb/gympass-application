import { UsersRepository } from "@/repositories/usersRepository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";

interface IRegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute ({ name, email, password }: IRegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);
        
        const userWithEmail = await this.usersRepository.findByEmail(email);
        if(userWithEmail){
            throw new UserAlreadyExistsError();
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}