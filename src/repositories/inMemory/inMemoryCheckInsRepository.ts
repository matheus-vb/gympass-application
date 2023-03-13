import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "../checkInsRepository";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
    public checkIns: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            created_at: new Date(),
            gymId: data.gymId,
            user_id: data.user_id,
            id: randomUUID(),
            validate_at: data.validate_at ? new Date(data.validate_at) : null,
        }

        this.checkIns.push(checkIn);

        return checkIn;
    }
}