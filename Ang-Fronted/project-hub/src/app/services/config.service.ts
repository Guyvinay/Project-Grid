import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
}
export const AppConfig = {
  baseUrl:'http://localhost:8888'
}
