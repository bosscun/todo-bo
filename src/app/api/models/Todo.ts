/* tslint:disable */
import {
  Note,
  Account
} from '../index';

declare var Object: any;
export interface TodoInterface {
  "title"?: string;
  "complete"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "accountId"?: number;
  notes?: Note[];
  account?: Account;
}

export class Todo implements TodoInterface {
  "title": string;
  "complete": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "accountId": number;
  notes: Note[];
  account: Account;
  constructor(data?: TodoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Todo`.
   */
  public static getModelName() {
    return "Todo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Todo for dynamic purposes.
  **/
  public static factory(data: TodoInterface): Todo{
    return new Todo(data);
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
      name: 'Todo',
      plural: 'Todos',
      path: 'Todos',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "complete": {
          name: 'complete',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "accountId": {
          name: 'accountId',
          type: 'number'
        },
      },
      relations: {
        notes: {
          name: 'notes',
          type: 'Note[]',
          model: 'Note',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'todoId'
        },
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'accountId',
          keyTo: 'id'
        },
      }
    }
  }
}
