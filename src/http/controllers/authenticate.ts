import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/PrimsaUsersRepository";
import { AuthenticateUseCase } from "@/useCases/authenticate";
import { InvalidCredentialsError } from "@/useCases/errors/invalidCredentialsError";

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

        await authenticateUseCase.execute({
            email,
            password
        })
    } catch(err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }

    return reply.status(200).send();
}