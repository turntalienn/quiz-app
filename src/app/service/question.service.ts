import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }


  getQuestionJson() {
    return this.http.get<any>("assets/questions.json"); //now the question.json cvan be accessed from any component as a servive/injectable
  }

}
