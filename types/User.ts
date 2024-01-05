import { TYPE_CLUB } from "./Club";

export type TYPE_USER = {
    id: number;
    email: string;
    username?: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    pendingJoinClub: boolean;
    role2: 'default' | 'coach';
    club?: TYPE_CLUB
}
