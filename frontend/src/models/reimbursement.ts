export default interface Reimbursement {
    docid: string;
    employeeName: string;
    employeeEmail: string;
    submissionDate: Date;
    eventStartDate: Date;
    eventStartTime: string;
    eventLocation: string;
    eventDescription: string;
    eventCost: number;
    gradingFormat: 'Grade' | 'Presentation';
    passingGrade: string;
    finalgrade: string | undefined;
    finalGradeSatisfactory: boolean | undefined;
    eventType: ReimburseableEvent;
    attachments: File | null;
    status: ReimbursementStatus;
    urgent: boolean;
    comments: string;
}

export type ReimburseableEvent = 'University Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Technical' | 'Other'
export type ReimbursementStatus = 'Direct Supervisor Approval' | 'Department Head Approval' | 'Benefits Coordinator Approval' | 'Awaiting Direct Supervisor' | 'Awaiting Department Head' | 'Awaiting Benefits Coordinator' | 'Returned to Employee' | 'Returned to Department Head' | 'Returned to Direct Supervisor' | 'Pending Reimbursement' | 'Reimbursement Approved' | 'Awaiting Employee' | 'Reimbursement Rejected'
