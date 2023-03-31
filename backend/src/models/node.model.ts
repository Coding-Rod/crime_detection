export interface Node {
    id: number;
    name: string;
    location: string;
    status: boolean;
    recording: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}