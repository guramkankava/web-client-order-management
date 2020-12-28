import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-personal-number',
  templateUrl: './personal-number.component.html',
  styleUrls: ['./personal-number.component.css']
})
export class PersonalNumberComponent implements OnInit {

  @Output() personalNumberChangedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(personalNumber: string): void {
    this.personalNumberChangedEvent.emit(personalNumber);
  }

}
