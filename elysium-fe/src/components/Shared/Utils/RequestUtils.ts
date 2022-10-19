import { ApiResponse } from "apisauce";

export const extractResponseDataIfOk = <T>(response?: ApiResponse<T>): T | undefined => {
    return !!response?.ok ? response?.data : undefined
}

export const extractResponseDataStrict = <T>(response?: ApiResponse<T>): T => {
    const foundData = extractResponseDataIfOk(response)
    if (!foundData) {
        throw new Error("Missing data on response")
    }
    return foundData
}

export const checkIfRequestIsOkStrict = <T>(response?: ApiResponse<T>): void => {
    if (!response?.ok) {
        throw response
    }
}

type RequestOptions = { [key: string]: any };

export const createRequestOptions = (request: any = {}): RequestOptions => {
    const options: RequestOptions = {};
    Object.keys(request).forEach((key: string) => options[key] = request[key]);
    return options;
};