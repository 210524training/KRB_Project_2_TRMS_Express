export default class Reimbursement {
  constructor(
    public docId: string,
    public employeeName: string,
    public employeeEmail: string,
    public submissionDate: Date,
    public eventStartDate: Date,
    public eventStartTime: Date,
    public eventLocation: string,
    public eventDescription: string,
    public eventCost: number,
    public gradingFormat: 'Grade' | 'Presentation',
    public finalgrade: string | undefined,
    public finalGradeSatisfactory: boolean | undefined,
    public eventType: ReimburseableEvent,
    public justification: string,
    public attachments: {} | undefined,
    public status: ReimbursementStatus,
    public urgent: boolean,
  ) { }
}

export type ReimburseableEvent = 'University Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Technical' | 'Other'
export type ReimbursementStatus = 'Direct Supervisor Approval' | 'Department Head Approval' | 'Benefits Coordinator Approval' | 'Awaiting Direct Supervisor' | 'Awaiting Department Head' | 'Awaiting Benefits Coordinator' | 'Returned to Employee' | 'Returned to Department Head' | 'Returned to Direct Supervisor' | 'Pending Reimbursement' | 'Reimbursement Approved'
