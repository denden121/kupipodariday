export declare class HashService {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    verify(password: string, hash: string): Promise<boolean>;
}
