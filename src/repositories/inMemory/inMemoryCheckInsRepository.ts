import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "../checkInsRepository";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
    public checkIns: CheckIn[] = [];

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf("date");
        const endOfDay = dayjs(date).endOf("date");

        const checkInOnSameDate = this.checkIns.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at);
            const isOnSameDate = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate;
    }

    async findManyByUserId(userId: string, page: number) {
        return this.checkIns
            .filter((item) => item.user_id === userId)
            .slice((page - 1) * 20, page * 20);
    }

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