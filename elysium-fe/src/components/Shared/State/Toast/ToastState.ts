import {ReactNode} from "react";

export enum SEVERITY {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warn',
}

export class ToastMessage {
    public content: ReactNode
    public severity: SEVERITY

    constructor(content: ReactNode, severity: SEVERITY) {
        this.content = content;
        this.severity = severity;
    }
}

export default class ToastState {
    public toastMessage?: ToastMessage

    constructor(toastMessage: ToastMessage) {
        this.toastMessage = toastMessage;
    }
}