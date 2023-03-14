import { IGymsRepository } from "@/repositories/gymsRepository";
import { Gym } from "@prisma/client";


interface ICreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: string
    longitude: string
}

interface ICreateGymUseCaseResponse {
    gym: Gym
}

class CreateGymUseCase {
    constructor(private usersRepository: IGymsRepository){}

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
        
        const gym = await this.usersRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }
    }
}