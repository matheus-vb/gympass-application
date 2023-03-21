import { IGymsRepository } from "@/repositories/gymsRepository"
import { Gym } from "@prisma/client"


interface ISearchGymsUseCaseRequest {
    query: string
    page: number
}

interface ISearchGymsUseCaseRespoone {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    constructor (private gymsRepository: IGymsRepository) {}

    async execute({
        query,
        page,
    }: ISearchGymsUseCaseRequest) {
        const gyms = await this.gymsRepository.searchMany(query, page);

        return {
            gyms
        }
    }
}