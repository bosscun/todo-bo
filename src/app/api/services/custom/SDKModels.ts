/* tslint:disable */
import { Injectable } from '@angular/core';
import { Todo } from '../../models/Todo';
import { Note } from '../../models/Note';
import { Account } from '../../models/Account';
import { AccountAccessToken } from '../../models/AccountAccessToken';
import { Email } from '../../models/Email';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Todo: Todo,
    Note: Note,
    Account: Account,
    AccountAccessToken: AccountAccessToken,
    Email: Email,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
