import { Node } from '../models/node.model';
import { 
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    Min,
    Length
} from 'class-validator';

export interface GetOneNodeDTO extends Pick<Node, 'id' | 'name' | 'location' | 'status' | 'recording'> {}

export interface ICreateNodeDTO extends Pick<Node, 'name' | 'location' | 'userId'> {}

export class CreateNodeDTO implements ICreateNodeDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    location: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
}

export interface IUpdateNodeDTO extends Pick<Node, 'id' | 'name' | 'location'> {}

export class UpdateNodeDTO implements IUpdateNodeDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    location: string;
}

export interface DeleteNodeDTO extends Pick<Node, 'id' | 'name'> {}

export interface IStartRecordingDTO extends Pick<Node, 'id' | 'status' | 'recording'> {}

export class StartRecordingDTO implements IStartRecordingDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsNotEmpty()
    @IsBoolean()
    recording: boolean;
}