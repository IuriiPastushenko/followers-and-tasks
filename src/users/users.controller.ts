import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/httpexception';
import { typeOrmConnects } from '../../index';
import { IUser } from './users.interfaces';

export class UsersRouter {
	public router = Router();

	constructor() {
		this.usersrouts();
	}

	usersrouts(): void {
		// 	// List of users
		// 	this.router.get(
		// 		'/list',
		// 		validationMiddleware(UsersListDto),
		// 		async (req: Request, res: Response, next: NextFunction) => {
		// 			try {
		// 				const dataForDB = req.query;
		// 				const resultUsersList = await typeOrmConnects.sendUsersList(
		// 					dataForDB,
		// 				);
		// 				res.status(201).json(resultUsersList);
		// 			} catch (err) {
		// 				next(
		// 					new HttpException(406, 'Users list not available', err as string),
		// 				);
		// 			}
		// 		},
		// 	);
	}
}
