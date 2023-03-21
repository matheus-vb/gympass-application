import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { IGymsRepository } from "../gymsRepository";

export class InMemoryGymsRepository implements IGymsRepository {
    public gyms: Gym[] = [];

    async findById(id: string) {
        const gym = this.gyms.find(gym => gym.id === id);

        if(!gym) {
            return null;
        }
        
        return gym;
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        }

        this.gyms.push(gym);

        return gym;
    }

    async searchMany(query: string, page: number) {
        const gyms = this.gyms
            .filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)

        return gyms;
    }
}