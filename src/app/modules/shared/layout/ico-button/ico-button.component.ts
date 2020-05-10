import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ico-button',
  templateUrl: './ico-button.component.html',
  styleUrls: ['./ico-button.component.scss'],
})
export class IcoButtonComponent implements OnInit {
  @Input() icon: string;
  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}

  buttonClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
