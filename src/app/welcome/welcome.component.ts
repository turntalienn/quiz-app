import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  //the template reference variable #name has to match the parameter inside the viewchild decorator
  //elementRef helps get direct access to dom and access native element properties
  @ViewChild('name') nameKey!: ElementRef; //property name of type elementRef
  constructor() { }

  ngOnInit(): void {
  }

  startQuiz() {
    //the name the user enter is stored in local storage once the start quiz button is pressed
    localStorage.setItem('name', this.nameKey.nativeElement.value)
  }

}
