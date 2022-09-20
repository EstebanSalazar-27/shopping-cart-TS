
export type User = {
    username: string;
    password: string;
    id: number | undefined,
    currency: number;
    isVerified: boolean;
    userCart: any[]
}