import { Request, Response, NextFunction } from 'express';

function catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err) => next(err));
    };
}

export default catchAsync;