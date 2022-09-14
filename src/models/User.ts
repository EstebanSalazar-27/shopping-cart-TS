
export type User = {
    name: string;
    lastName: string;
    id: number | undefined,
    currency: number | undefined;
    isVerified: boolean;
    userCart: any[]
}