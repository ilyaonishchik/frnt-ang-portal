import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core'

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input() position!: string
  @HostBinding('class') classes: string = `dropdown-menu`
  @HostBinding('class.show') hasShow: boolean = true

  constructor(
    private dropdownMenuElement: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(
      this.dropdownMenuElement.nativeElement,
      `dropdown-menu-${this.position}`
    )
  }
}
