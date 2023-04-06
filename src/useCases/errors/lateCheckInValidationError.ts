export class LateCheckInValidationError extends Error {
    constructor() {
        super("Validation for check-in cannot be done over 20 minutes after its creation.");
    }
}