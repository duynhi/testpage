import { Injectable, Directive } from '@angular/core';

@Injectable()
export class GlobalValueService {
    public userName: '';
    public password: '';
  
    constructor() { }

    setUserName(val) {
        this.userName = val;
    }

    getUserName() {
        return this.userName;
    }

    setPassword(val) {
        this.password = val;
    }

    getPassword() {
        return this.password;
    }
  }