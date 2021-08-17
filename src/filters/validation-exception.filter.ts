import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import {ValidationException} from "../exceptions/validation.exception";

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                messages: exception.getResponse(),
                total: 0,
                data: [],
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
