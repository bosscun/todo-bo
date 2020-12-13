/* tslint:disable */
import {
  Todo
} from '../index';

declare var Object: any;
export interface NoteInterface {
  "text"?: string;
  "id"?: number;
  "todoId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  todo?: Todo;
}

export class Note implements NoteInterface {
  "text": string;
  "id": number;
  "todoId": number;
  "createdAt": Date;
  "updatedAt": Date;
  todo: Todo;
  constructor(data?: NoteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Note`.
   */
  public static getModelName() {
    return "Note";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Note for dynamic purposes.
  **/
  public static factory(data: NoteInterface): Note{
    return new Note(data);
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
      name: 'Note',
      plural: 'Notes',
      path: 'Notes',
      idName: 'id',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "todoId": {
          name: 'todoId',
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
      },
      relations: {
        todo: {
          name: 'todo',
          type: 'Todo',
          model: 'Todo',
          relationType: 'belongsTo',
                  keyFrom: 'todoId',
          keyTo: 'id'
        },
      }
    }
  }
}
