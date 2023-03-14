import { IGymsRepository } from "@/repositories/gymsRepository";
import { Gym } from "@prisma/client";


interface ICreateGymRequest {
    title: string
    description: string
    phone: string
    latitude: string
    longitude: string
}

interface ICreateGymResponse {
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
    }: ICreateGymRequest): Promise<ICreateGymResponse> {
        
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