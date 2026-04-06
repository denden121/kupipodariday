export interface JwtPayload {
    userId: number;
    username: string;
}
export declare const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
