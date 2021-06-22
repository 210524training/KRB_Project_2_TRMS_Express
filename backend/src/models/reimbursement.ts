import { v4 as uuidv4 } from 'uuid';

export default class Reimbursement {
  constructor(
    public docid: string = uuidv4(),
    public employeeName: string,
    public employeeEmail: string,
    public submissionDate: Date | string,
    public eventStartDate: Date,
    public eventStartTime: string,
    public eventLocation: string,
    public eventDescription: string,
    public eventCost: number,
    public gradingFormat: 'Grade' | 'Presentation',
    public passingGrade: string,
    public finalgrade: string | undefined,
    public finalGradeSatisfactory: boolean | undefined,
    public eventType: ReimburseableEvent,
    public attachments: File | null,
    public status: ReimbursementStatus,
    public urgent: boolean,
    public comments: string,
  ) { }
}

export type ReimburseableEvent = 'University Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Technical' | 'Other'
export type ReimbursementStatus = 'Direct Supervisor Approval' | 'Department Head Approval' | 'Benefits Coordinator Approval' | 'Awaiting Employee' | 'Awaiting Direct Supervisor' | 'Awaiting Department Head' | 'Awaiting Benefits Coordinator' | 'Returned to Employee' | 'Returned to Department Head' | 'Returned to Direct Supervisor' | 'Pending Reimbursement' | 'Reimbursement Approved' | 'Reimbursement Rejected'
