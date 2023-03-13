import { User, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IUsersRepository } from "../usersRepository";

export class InMemoryUserRepository implements IUsersRepository {
    public users: User[] = [];

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        if(user) {
            return user;
        } else {
            return null;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);

        if(user) {
            return user;
        } else {
            return null;
        }
    }
    
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.users.push(user);

        return user;
    }
}