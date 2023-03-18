import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { CheckIn } from "@prisma/client";

interface IFetchUserCheckInHistoryRequest {
    userId: string;
}

interface IFetchUserCheckInHistoryResponse {
    checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryUseCase {
    constructor(private checkInsRepository: ICheckInsRepository) {}

    async execute({
        userId,
    }: IFetchUserCheckInHistoryRequest): Promise<IFetchUserCheckInHistoryResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId);

        return {
            checkIns,
        }
    }
}