import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../utils/log';
import dynamo from '../dynamo/dynamo';
import User from '../models/user';

class UserDAO {
  constructor(
    private docClient = dynamo,
  ) { }

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
}

export default new UserDAO();
