import ReimbursementDAO from '../../DAO/reimbursement.DAO';
import Reimbursement, { ReimburseableEvent, ReimbursementStatus } from '../../models/reimbursement';
import User from '../../models/user';

class ReimbursementService {
  constructor(
    private data = ReimbursementDAO,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  isUrgent(todaysDate: Date, eventStart: Date): boolean {
    const convertToDate = new Date(eventStart);
    // 12096e5 is 2 weeks in milliseconds
    // transforms the dates into miliseconds and compare to determine
    // if submission is less than 2 weeks from event start
    const isLessThanTwoWeeks = convertToDate.getTime() - 12096e5;
    if(todaysDate.getTime() < isLessThanTwoWeeks) {
      return false;
    }
    return true;
  }

  /**
   * Following method is responsible for converting user data into a Reimbursement
   * TODO: Dates need to be formatted into so they are more uniformed.
   */
  async constructNewReimbursementRequest(
    currentUserRole: string,
    employeeName: string,
    employeeEmail: string,
    eventStartDate: Date,
    eventStartTime: string,
    eventLocation: string,
    eventDescription: string,
    eventCost: number,
    gradingFormat: 'Grade' | 'Presentation',
    passingGrade: string,
    eventType: ReimburseableEvent,
    attachments: File| null,
    comments: string,
  ): Promise<boolean> {
    // server generated data for the request
    const submissionDate = new Date();
    const docid = Math.random().toString(36).substring(7);
    const isUrgent = this.isUrgent(submissionDate, eventStartDate);

    let currentStatus: ReimbursementStatus;

    switch (currentUserRole) {
    case 'Direct Supervisor':
      currentStatus = 'Awaiting Department Head';
      break;
    case 'Department Head':
      currentStatus = 'Awaiting Benefits Coordinator';
      break;
    default:
      currentStatus = 'Awaiting Direct Supervisor';
    }

    // create new request object
    const request = new Reimbursement(
      docid,
      employeeName,
      employeeEmail,
      submissionDate.toDateString(),
      eventStartDate,
      eventStartTime,
      eventLocation,
      eventDescription,
      eventCost,
      gradingFormat,
      passingGrade,
      undefined,
      undefined,
      eventType,
      attachments,
      currentStatus,
      isUrgent,
      comments,
    );
    const isSentToDynamo = await this.data.createNewReimbursementRequest(request);
    return isSentToDynamo;
  }

  /**
   * Allows user to update request's final grade attribute
   */
  async updateFinalGrade(docid: string, finalgrade: string | undefined): Promise<boolean> {
    // Check to verify docid exists and matches provided docid
    const verifyDocId = await this.data.getReimbursementRequestByDocId(docid);
    if(verifyDocId.docid === docid) {
      const isUpdated = await this.data.updateRequestFinalGrade(docid, finalgrade);
      if(isUpdated) {
        return true;
      }
      throw new Error('Grade could not be updated');
    }
    throw new Error('Reimburesment request does not exist');
  }

  /**
   * Requests data to populate the user's bin according to the role assigned and status of request
   */

  async populateUserBin(user: User): Promise<Reimbursement[]> {
    return this.data.getAllReimbursementRequestsByStatus(`Awaiting ${user.role}`);
  }

  /**
   * This function will update the status of the request
   */
  async updateStatus(
    docid: string,
    status: ReimbursementStatus,
    comments: string,
  ): Promise<boolean> {
    let newStatus: ReimbursementStatus;

    switch (status) {
    case 'Direct Supervisor Approval':
      newStatus = 'Awaiting Department Head';
      break;
    case 'Department Head Approval':
      newStatus = 'Awaiting Benefits Coordinator';
      break;
    case 'Benefits Coordinator Approval':
      newStatus = 'Pending Reimbursement';
      break;
    case 'Returned to Employee':
      newStatus = 'Awaiting Employee';
      break;
    case 'Returned to Department Head':
      newStatus = 'Awaiting Department Head';
      break;
    case 'Returned to Direct Supervisor':
      newStatus = 'Awaiting Direct Supervisor';
      break;
    case 'Reimbursement Approved':
      newStatus = status;
      break;
    case 'Reimbursement Rejected':
      newStatus = status;
      break;
    case 'Pending Reimbursement':
      newStatus = status;
      break;
    default:
      throw new Error('Invalid Status Assigned');
    }
    const isUpdated = await this.data.updateReimbursementRequestStatus(docid, newStatus, comments);
    if(!isUpdated) {
      throw new Error('Could not be updated');
    }
    return true;
  }

  async getPendingReimbursements(): Promise<Reimbursement[]> {
    const data = await this.data.getALLReimbursementRequestPendingReimbursement();
    if(data.length === 0) {
      return [];
    }
    return data;
  }
}

export default new ReimbursementService();
