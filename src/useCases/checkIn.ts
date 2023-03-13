import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { CheckIn } from "@prisma/client";

interface ICheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface ICheckInUseCaseResponse {
    checkIn: CheckIn    
}

export class CheckInUseCase {
    constructor(private checkInsRepository: ICheckInsRepository) {}

    async execute({
        userId,
        gymId,
    }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.create({
            gymId,
            user_id: userId,
        })

        return {
            checkIn
        }
    }
}