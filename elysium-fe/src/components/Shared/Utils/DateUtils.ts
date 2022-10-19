import moment from "moment";
import { Moment } from "moment";
import {Format} from "../Constants/DateConstants";

export const mapFromServerDate = (date: string): Moment => moment(date)

export const mapToServerDate = (date: Moment): string => date.toISOString()

export const formatDate = (format: Format, date?: Moment): string | undefined => date?.format(format)

export const isFutureDate = (date: Moment): boolean => date.isAfter(moment.now(), 'millisecond')

export const isPastDate = (date: Moment): boolean => date.isBefore(moment.now(), 'millisecond')