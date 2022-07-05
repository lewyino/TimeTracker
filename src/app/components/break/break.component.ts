import {Component, Input, OnInit} from '@angular/core';
import {BreakModel} from "../../models/break-model";

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.scss']
})
export class BreakComponent implements OnInit {

  @Input() breakModel: BreakModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
