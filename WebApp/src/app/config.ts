import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable()
export class config {

  static obterUrl(): string {
    return `${environment.baseUrl}`;
  }

}