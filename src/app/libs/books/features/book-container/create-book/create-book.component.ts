import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookLanguage, IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DialogFrameComponent} from "@app/libs/shared/dialog/dialog-frame/dialog-frame.component";
import {MatInputModule} from "@angular/material/input";
import {ErrorMessagePipe} from "@app/libs/shared/pipes/error-message.pipe";
import {MatSelectModule} from "@angular/material/select";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, DialogFrameComponent,
    ReactiveFormsModule, MatInputModule, ErrorMessagePipe, MatSelectModule
  ],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBookComponent implements OnInit {
  @Input() books: IBookModel[] = [];
  @Input() authors: IAuthorModel[] = [];

  @Output() createBook = new EventEmitter<IBookModel>();

  form: FormGroup;

  dialogRef: MatDialogRef<TemplateRef<CreateBookComponent>>;

  bookLanguages: BookLanguage[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      pages: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });

    this.bookLanguages = Object.values(BookLanguage)
  }

  onShowCreateModal(template: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(template, {
      maxWidth: '90vw',
      disableClose: true
    });
  }

  onCreate() {
    const payload = this.form.value;
    this.createBook.emit(payload);

    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
