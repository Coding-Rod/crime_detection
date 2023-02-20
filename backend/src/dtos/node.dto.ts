import { Node } from '../models/node.model';
import { 
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsUUID,
    Length
} from 'class-validator';

export interface GetOneNodeDTO extends Pick<Node, 'id' | 'name' | 'location' | 'status' | 'recording'> {}

export interface DeleteNodeDTO extends Pick<Node, 'id' | 'name'> {}

export interface IStartRecordingDTO extends Pick<Node, 'id' | 'status' | 'recording'> {}

export class StartRecordingDTO implements IStartRecordingDTO {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsNotEmpty()
    @IsBoolean()
    recording: boolean;
}