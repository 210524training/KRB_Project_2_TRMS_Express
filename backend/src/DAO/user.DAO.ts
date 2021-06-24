import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../utils/log';
import dynamo from '../dynamo/dynamo';
import User from '../models/user';

class UserDAO {
  constructor(
    private docClient = dynamo,
  ) { }

  async getAll(): Promise<User[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'trms_users',
      ExpressionAttributeNames: {
        '#r': 'role',
      },
      ProjectionExpression: 'id, username, password, address, phoneNumber, #r',
    };
    try {
      const data = await this.docClient.scan(params).promise();
      return data.Items as User[];
    } catch(err) {
      console.log('Fail to get all', err);
    }
    return [];
  }

  async getByUsername(username: string): Promise<User | null> {
    const params: DocumentClient.GetItemInput = {

      TableName: 'trms_users',
      Key: {
        username,
      },
      ProjectionExpression: '#u, #p, #e, #r, availableAmount',
      ExpressionAttributeNames: {
        '#u': 'username',
        '#p': 'password',
        '#e': 'email',
        '#r': 'role',
      },
    };

    const data = await this.docClient.get(params).promise();

    if(data) {
      log.debug(data);
      return (data.Item) as User;
    }
    return null;
  }

  async addUser(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'trms_users',
      Item: {
        ...user,
      },
      ConditionExpression: '#u <> :u',
      ExpressionAttributeNames: {
        '#u': user.username,
      },
      ExpressionAttributeValues: {
        ':u': user.username,
      },
    };
    try {
      await this.docClient.put(params).promise();
      return true;
    } catch(err) {
      log.error(err);
      return false;
    }
  }

  async updateReimbursementAmounts(username: string, amount: number): Promise<void> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'trms_users',
      Key: {
        username,
      },
      UpdateExpression: 'SET availableAmount = :a',
      ExpressionAttributeValues: {
        ':a': amount,
      },
    };
    try {
      await this.docClient.update(params).promise();
    } catch(err) {
      console.log(err, username);
      throw new Error(`Could not reset reimbursable item for: ${username}`);
    }
  }
}

export default new UserDAO();
