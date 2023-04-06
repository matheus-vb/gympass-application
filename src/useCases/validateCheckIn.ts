import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { IGymsRepository } from "@/repositories/gymsRepository";
import { getDistanceBetweenCoordinates } from "@/utilities/getDistanceBetweenCoordinates";
import { CheckIn } from "@prisma/client";
import { MaxCheckInsError } from "./errors/maxCheckInsError";
import { MaxDistanceError } from "./errors/maxDistanceError";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError";
import dayjs from "dayjs";

interface IValidateCheckInUseCaseRequest {
    checkInId: string
}

interface IValidateCheckInUseCaseResponse {
    checkIn: CheckIn    
}

export class ValidateCheckInUseCase {
    constructor(
        private checkInsRepository: ICheckInsRepository,
        ) {}

    async execute({
        checkInId
    }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if(!checkIn) {
            throw new ResourceNotFoundError();
        }

        const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes"
        )

        if (differenceInMinutesFromCheckInCreation > 20) {
            throw new Error()
        }

       checkIn.validate_at = new Date();

       await this.checkInsRepository.save(checkIn);

        return {
            checkIn
        }
    }
}