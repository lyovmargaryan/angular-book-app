import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DialogFrameComponent} from "@app/libs/shared/dialog/dialog-frame/dialog-frame.component";
import {ErrorMessagePipe} from "@app/libs/shared/pipes/error-message.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, DialogFrameComponent, ErrorMessagePipe, MatFormFieldModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAuthorComponent implements OnInit {
  @Input() authors: IAuthorModel[] = [];

  @Output() createAuthor = new EventEmitter<string>();

  form: FormGroup;

  dialogRef: MatDialogRef<TemplateRef<CreateAuthorComponent>>

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  onShowCreateModal(template: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(template, {
      maxWidth: '90vw',
      disableClose: true
    });
  }

  onCreate() {
    const payload = this.form.value;
    this.createAuthor.emit(payload);

    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
