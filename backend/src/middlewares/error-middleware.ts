import { Request,Response,NextFunction } from "express";
import logger from '../utils/logger';
interface CustomErrorTemplate extends Error {
    statusCode: number;
    status: string;
    isOperational?: boolean;
}

const prodErrors = (res:Response,error:CustomErrorTemplate)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status:  error.statusCode,
            message: error.message
        })
    }else{
        logger.error(`Error: ${error.message} | Stack: ${error.stack}`);
        res.status(error.statusCode).json({
            status:  'error',
            message: 'Something went wrong. Please try again later'
        })
    }
}

const devErrors = (res:Response,error:CustomErrorTemplate)=>{
    logger.error(`${error.statusCode} ${error.message}`);
    res.status(error.statusCode).json({
        status:  error.statusCode,
        message: error.message,
        stackTrack: error.stack,
        error: error
    })
}


export default (error:CustomErrorTemplate,req:Request,res:Response,next:NextFunction) =>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if(process.env.NODE_ENV === 'production'){
        prodErrors(res,error);
    }else if(process.env.NODE_ENV === 'development'){
        devErrors(res,error);
    }
    else {
        res.status(error.statusCode).json({
            status: error.status,
            message: 'An unexpected error occurred.'
        });
    }
    // devErrors(res,error);
    
}