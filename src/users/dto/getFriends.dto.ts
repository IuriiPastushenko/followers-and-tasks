import { IsString, IsEnum } from 'class-validator';

export enum nameSort {
	desc,
	asc,
}

export class GetFriendsDto {
	@IsString()
	public order_by: string;

	@IsEnum(nameSort)
	public order_type: string;
}
