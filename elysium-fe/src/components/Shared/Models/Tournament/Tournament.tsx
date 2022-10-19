import { Moment } from "moment"

export class Tournament {
    public tournamentNumber: number
    public enrollmentFee: number
    public enrollmentStartTime: Moment
    public enrollmentEndTime: Moment
    public tournamentStartTime: Moment
    public tournamentEndTime: Moment

    constructor(tournamentNumber: number, enrollmentFee: number, enrollmentStartTime: Moment, enrollmentEndTime: Moment, tournamentStartTime: Moment, tournamentEndTime: Moment) {
        this.tournamentNumber = tournamentNumber;
        this.enrollmentFee = enrollmentFee;
        this.enrollmentStartTime = enrollmentStartTime;
        this.enrollmentEndTime = enrollmentEndTime;
        this.tournamentStartTime = tournamentStartTime;
        this.tournamentEndTime = tournamentEndTime;
    }

    public getTournamentDisplayedName = () => <span>Tournament No. {this.tournamentNumber}&deg;</span>
}