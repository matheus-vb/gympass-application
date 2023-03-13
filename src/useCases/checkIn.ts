import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { IGymsRepository } from "@/repositories/gymsRepository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";

interface ICheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface ICheckInUseCaseResponse {
    checkIn: CheckIn    
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: ICheckInsRepository,
        private gymsRepository: IGymsRepository,
        ) {}

    async execute({
        userId,
        gymId,
    }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if(!gym) {
            throw new ResourceNotFoundError();
        }

        

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

        if (checkInOnSameDate) {
            throw new Error();
        }

        const checkIn = await this.checkInsRepository.create({
            gymId,
            user_id: userId,
        });




        return {
            checkIn
        }
    }
}