/* tslint:disable */
import {
  Account
} from '../index';

declare var Object: any;
export interface AccountAccessTokenInterface {
  "id"?: string;
  "ttl"?: number;
  "scopes"?: Array<any>;
  "created"?: Date;
  "userId"?: number;
  user?: Account;
}

export class AccountAccessToken implements AccountAccessTokenInterface {
  "id": string;
  "ttl": number;
  "scopes": Array<any>;
  "created": Date;
  "userId": number;
  user: Account;
  constructor(data?: AccountAccessTokenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccountAccessToken`.
   */
  public static getModelName() {
    return "AccountAccessToken";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AccountAccessToken for dynamic purposes.
  **/
  public static factory(data: AccountAccessTokenInterface): AccountAccessToken{
    return new AccountAccessToken(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'AccountAccessToken',
      plural: 'AccountAccessTokens',
      path: 'AccountAccessTokens',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "ttl": {
          name: 'ttl',
          type: 'number',
          default: 1209600
        },
        "scopes": {
          name: 'scopes',
          type: 'Array&lt;any&gt;'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'number'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
