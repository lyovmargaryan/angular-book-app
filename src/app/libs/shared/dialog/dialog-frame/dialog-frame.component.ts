import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-frame',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.scss']
})
export class DialogFrameComponent {
  @Output() close$ = new EventEmitter();
  @Output() primaryBtn$ = new EventEmitter();
  @Output() secondaryBtn$ = new EventEmitter();
  @Output() wornBtn$ = new EventEmitter();

  @Input() customHeader = false;
  @Input() flexCenter = true;
  @Input() customFooter = false;
  @Input() disabled = false;
  @Input() footerWithWorn = false;
  @Input() footerWithPrimary = true;
  @Input() primaryBtnText = 'save';
  @Input() secondaryBtnText = 'cancel';
  @Input() wornBtnText = 'delete';
  @Input() headerTitle = '';
  @Input() maxWidth: string;
  @Input() btnIcon = '';
}
