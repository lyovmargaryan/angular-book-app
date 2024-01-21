import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {Store} from "@ngrx/store";
import {IAuthorState} from "@app/libs/books/features/state/models/author-future.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { authorActions } from "@app/libs/books/features/state";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {DialogFrameComponent} from "@app/libs/shared/dialog/dialog-frame/dialog-frame.component";
import {MatIconModule} from "@angular/material/icon";
import {ErrorMessagePipe} from "@app/libs/shared/pipes/error-message.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-update-author',
  standalone: true,
  imports: [CommonModule, DialogFrameComponent, MatIconModule, ReactiveFormsModule, ErrorMessagePipe, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateAuthorComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateAuthorComponent>,
    private store: Store<IAuthorState>,
    private dialog: MatDialog,
    @Inject(DIALOG_DATA)
    public data: IAuthorModel
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name),
    });
  }

  onUpdate(): void {
    const author = {
      ...this.form.value,
      id: this.data.id
    }
    this.store.dispatch(authorActions.updateAuthor({ author }));

    this.onClose()
  }

  onClose() {
    this.dialogRef.close();
  }

}
