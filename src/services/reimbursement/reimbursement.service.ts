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
    eventType: ReimburseableEvent,
    justification: string,
    attachments: {} | undefined,
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
      undefined,
      undefined,
      eventType,
      justification,
      attachments,
      currentStatus,
      isUrgent,
    );
    const isSentToDynamo = await this.data.createNewReimbursementRequest(request);
    return isSentToDynamo;
  }

  /**
   * Allows user to update request's final grade attribute
   */
  async updateFinalGrade(docid: string, finalgrade: string): Promise<boolean> {
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

  async populateUserBin(user: User): Promise<boolean> {
    const binHasItems = await this.data.getAllReimbursementRequestsByStatus(`Awaiting ${user.role}`);

    if(binHasItems.length === 0) {
      throw new Error('There are no items in the bin');
    }

    binHasItems.forEach((item: Reimbursement) => {
      user.bin.push(item);
    });
    console.log(user.bin);
    return true;
  }
}

export default new ReimbursementService();
