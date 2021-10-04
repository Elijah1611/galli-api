import { Request, Response, NextFunction } from "express"
import { nextTick } from "process"
import UserController from "../controller/UserController";

// a function that passes the response props to the original response function
// add a catch on it to catch async errors
export const catchAsync = (fn) => {
    return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)
}

// target: constructor function for static or the prototype of a class (instance object) | [class UserController] <- constructor for static method
// propertyKey: the class method name | "create" <- method name
// propertyDescriptor: the class method
//   {
//     value: [Function: create],
//     writable: true,
//     enumerable: false,
//     configurable: true
//   } <- value is the callable class method 


export function TryCatch(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {

    const originalMethod = propertyDescriptor.value;

    // redefine the method as a new function getting all the arguments
    // return the originalMethod just with a catch on it to catch async errors
    // no need for try 
    // pass the error onto catch for the global error handler
    propertyDescriptor.value = function (...args: any[]) {
        const next = args[2]
        return originalMethod.apply(this, args).catch(next)
    }
}