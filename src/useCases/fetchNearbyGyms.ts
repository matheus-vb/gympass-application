import { IGymsRepository } from "@/repositories/gymsRepository";
import { Gym } from "@prisma/client";

interface IFetchNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface IFetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: IGymsRepository){}

    async execute({
        userLatitude,
        userLongitude,
    }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
        const nearbyGyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude }) 

        return {
            gyms: nearbyGyms
        }
    }


}