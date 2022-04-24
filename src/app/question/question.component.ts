import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
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
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  //Question service is injected onto the constructor of this component
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    //'!' is used to bypass undefined/null error
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions() //this method have to be called inside the ngOnInit
    this.startCounter();
  }

  getAllQuestions(){
    //since the questionService returns an observable it has to be subscribed
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
    })
  }

  nextQuestion() {
    this.currentQuestion++; //increments the currentQuestion
  }

  previousQuestion() {
    this.currentQuestion--; //decrements the currentQuestion
  }

  answer(currentQno: number, option: any) {
    if(option.correct) {
      this.points += 10;
      this.correctAnswer++; //increments the correct answer counter
      this.currentQuestion++   
      this.resetCounter();   
      this.getProgressPercent();
    }else {
      this.currentQuestion++;
      this.inCorrectAnswer++;
      this.resetCounter();
      this.getProgressPercent();
      this.points -= 10;
    }
  }

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter === 0) {
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 6000000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter() {
    this.stopCounter();
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.stopCounter()
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }
  
  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questionList.length) * 100).toString();
    return this.progress;
  }
}
