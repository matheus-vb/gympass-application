import { GetUserMetricsUseCase } from "../getUserMetrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository);

    return getUserMetricsUseCase;
}