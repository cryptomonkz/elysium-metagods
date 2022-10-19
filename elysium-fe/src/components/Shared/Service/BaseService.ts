import {ApisauceInstance, create} from 'apisauce'
import {ACCEPT_HEADER, BASE_URL} from '../Constants/ApiConstants';
import {getTokenFromStorageWithPartialValidation} from "./AuthenticationService";

export const baseService: ApisauceInstance = create({
  baseURL: BASE_URL,
  headers: { Accept: ACCEPT_HEADER },
})

baseService.axiosInstance.interceptors.request.use(config => {
  const authorizationToken = getTokenFromStorageWithPartialValidation()
  !!authorizationToken && (config.headers.Authorization =  authorizationToken)
  return config;
});