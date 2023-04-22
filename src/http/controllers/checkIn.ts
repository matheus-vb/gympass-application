import { makeCheckInUseCase } from "@/useCases/factories/make-checkInUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
    const checkInBodySchema = z.object({
        userId: z.string(),
        gymId: z.string(),
        userLatitude: z.number(),
        userLongitude: z.number(),
    })

    const {
        userId,
        gymId,
        userLatitude,
        userLongitude,
    } = checkInBodySchema.parse(request.body);

    try {
        const checkInUseCase = makeCheckInUseCase();

        const checkIn = await checkInUseCase.execute({
            userId,
            gymId,
            userLatitude,
            userLongitude,
        })

        return reply.status(201).send(checkIn);
    } catch (err) {
        throw new Error();
    }
}