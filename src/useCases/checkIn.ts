import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { IGymsRepository } from "@/repositories/gymsRepository";
import { getDistanceBetweenCoordinates } from "@/utilities/getDistanceBetweenCoordinates";
import { CheckIn } from "@prisma/client";
import { MaxCheckInsError } from "./errors/maxCheckInsError";
import { MaxDistanceError } from "./errors/maxDistanceError";
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
        userLatitude,
        userLongitude,
    }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if(!gym) {
            throw new ResourceNotFoundError();
        }

        const distanceBetWeenUserGym = getDistanceBetweenCoordinates({
            latitude: userLatitude,
            longitude: userLongitude,
        }, {
            latitude:  gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber(),
        });

        let MAX_DISTANCE_KM = 0.1;

        if(distanceBetWeenUserGym > MAX_DISTANCE_KM) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

        if (checkInOnSameDate) {
            throw new MaxCheckInsError();
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