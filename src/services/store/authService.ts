import { customerAuthService } from '../shared/customerAuthService.ts';

export const authService = {
    requestLoginCode: (email: string) =>
        customerAuthService.requestCode(email).then(() => ({ success: true as const })),

    verifyLoginCode: (email: string, code: string) =>
        customerAuthService.verifyCode(email, code).then(r => ({
            success: true as const,
            user: r.user,
            error: undefined,
        })),
};