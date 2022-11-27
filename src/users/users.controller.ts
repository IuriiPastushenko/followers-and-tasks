import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/httpexception';
import { typeOrmConnects } from '../../index';
import { GetFriendsDto, nameSort } from './dto/getFriends.dto';
import { validationMiddleware } from '../midlleware/validate.middleware';

export class UsersRouter {
	public router = Router();

	constructor() {
		this.usersrouts();
	}

	usersrouts(): void {
		// List of users
		this.router.get(
			'/users',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const resultUsersList = await typeOrmConnects.usersList();
					res.status(201).json(resultUsersList);
				} catch (err) {
					next(
						new HttpException(424, 'Users list not available', err as string),
					);
				}
			},
		);

		// List of users
		this.router.get(
			'/users/123/friends',
			validationMiddleware(GetFriendsDto),
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const resultFromQuery = req.query;
					const idUser = +(resultFromQuery.order_by as string);
					const sortBy = resultFromQuery.order_type as string;
					const friends = await typeOrmConnects.getFriends(idUser, sortBy);
					res.status(201).json(friends);
				} catch (err) {
					next(
						new HttpException(424, 'Friends list not available', err as string),
					);
				}
			},
		);
		// Top 5 by subscriptions
		this.router.get(
			'/max-following',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const topFive = await typeOrmConnects.topFive();
					res.status(201).json(topFive);
				} catch (err) {
					next(
						new HttpException(
							424,
							'List of subscriptions not available',
							err as string,
						),
					);
				}
			},
		);
	}
}
