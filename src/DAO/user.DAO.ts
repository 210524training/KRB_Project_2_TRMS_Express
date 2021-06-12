import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../utils/log';
import dynamo from '../dynamo/dynamo';
import User from '../models/user';

class UserDAO {
  constructor(
    private docClient = dynamo,
  ) {}

  async getByUsername(username: string): Promise<User> {
    console.log(typeof username, username);
    const params: DocumentClient.GetItemInput = {

      TableName: 'trms_users',
      Key: {
        username,
      },
      ProjectionExpression: '#u, #p, #e, #r',
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
    throw new Error('User not found.');
  }
}

export default new UserDAO();
