import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  standalone: false
})
export class EmailFormComponent implements OnChanges {
  @Input() recipients: string[] = [];
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      recipientsField: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipients'] && this.recipients?.length > 0) {
      const emailString = this.recipients.join(', ');
      this.contactForm.patchValue({ recipientsField: emailString });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      const recipientsArray = formValue.recipientsField.split(',').map((email: string) => email.trim());
      this.formSubmitted.emit({
        name: formValue.name,
        subject: formValue.subject,
        recipients: recipientsArray,
        message: formValue.message
      });
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.formCancelled.emit();
    this.contactForm.reset();
  }
}

