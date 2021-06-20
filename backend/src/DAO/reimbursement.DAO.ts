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

  async getReimbursementRequestByDocId(docid: string): Promise<Reimbursement> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'trms_reimbursements',
      Key: {
        docid,
      },
    };

    const result = await this.docClient.get(params).promise();
    if(result.Item) {
      log.debug(result);
      return result.Item as Reimbursement;
    }
    throw new Error('Reimbursement request not found');
  }

  async updateRequestFinalGrade(docid: string, finalgrade: string | undefined): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'trms_reimbursements',
      Key: {
        docid,
      },
      UpdateExpression: 'SET #fg = :v',
      ExpressionAttributeNames: {
        '#fg': 'finalgrade',
      },
      ExpressionAttributeValues: {
        ':v': finalgrade,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const isUpdated = await this.docClient.update(params).promise();
    if(isUpdated) {
      return true;
    }
    throw new Error('Cannot update request');
  }

  async getAllReimbursementRequestsByStatus(status: string): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'trms_reimbursements',
      FilterExpression: '#s = :status',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
      },
    };

    const results = await this.docClient.scan(params).promise();
    if(results.Items) {
      if(results.Items?.length > 0) {
        return results.Items as Reimbursement[];
      }
    }
    return [];
  }

  async getAllReimbursementRequestsByUsername(username: string): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'trms_reimbursements',
      FilterExpression: '#e = :user',
      ExpressionAttributeNames: {
        '#e': 'employeeName',
      },
      ExpressionAttributeValues: {
        ':user': username,
      },
    };

    const results = await this.docClient.scan(params).promise();
    if(results.Items) {
      if(results.Items?.length > 0) {
        return results.Items as Reimbursement[];
      }
    }
    return [];
  }
}

export default new ReimbursementDAO();
