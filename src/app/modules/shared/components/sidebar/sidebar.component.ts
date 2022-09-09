import {Component, ElementRef, OnInit} from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}
}
