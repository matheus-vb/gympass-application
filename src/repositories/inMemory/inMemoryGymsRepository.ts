import { Gym, Prisma } from "@prisma/client";
import { IGymsRepository } from "../gymsRepository";

export class InMemoryGymsRepository implements IGymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym> {
        throw new Error("Method not implemented.");
    }
    public gyms: Gym[] = [];

    async findById(id: string) {
        const gym = this.gyms.find(gym => gym.id === id);

        if(!gym) {
            return null;
        }
        
        return gym;
    }
}