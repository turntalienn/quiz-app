import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string="";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  //Question service is injected onto the constructor of this component
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    //'!' is used to byhpass undefined/null error
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions() //this method have to be called inside the ngOnInit
  }

  getAllQuestions(){
    //since the questionService returns an observable it has to be subscribed
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
    })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

}
