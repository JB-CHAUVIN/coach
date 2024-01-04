export type TYPE_USER = {
    id: number;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role2: 'default' | 'coach';
}
