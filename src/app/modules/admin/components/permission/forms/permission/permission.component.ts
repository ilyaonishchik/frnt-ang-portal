import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  formPermission!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.formPermission = this.fb.group({
      code: '123',
      name: '2342',
      comment: '34564564564',
      status: true,
    })
  }
}
