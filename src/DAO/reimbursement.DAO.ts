import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import Reimbursement from '../models/reimbursement';
import log from '../utils/log';

class ReimbursementDAO {
  constructor(
    private docClient = dynamo,
  ) {}

  async createNewReimbursementRequest(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'trms_reimbursements',
      Item: reimbursement,
    };

    const result = await this.docClient.put(params).promise();
    if(result) {
      log.debug(result);
      return true;
    }
    return false;
  }
}

export default new ReimbursementDAO();
