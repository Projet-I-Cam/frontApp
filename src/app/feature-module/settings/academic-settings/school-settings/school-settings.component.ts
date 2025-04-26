import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { InstitutionService } from '../../../../services/institution.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-school-settings',
    templateUrl: './school-settings.component.html',
    styleUrl: './school-settings.component.scss',
    standalone: false
})
export class SchoolSettingsComponent implements OnInit {
    institutionForm: FormGroup;
    currentInstitutionId: string | null = null;
    isLoading = false;
    isSubmitting = false;
    errorMessage = '';
    successMessage = '';
    logoFile: File | null = null;
    logoPreview: string | null = null;

    constructor(
        private fb: FormBuilder,
        private institutionService: InstitutionService
    ) {
        this.institutionForm = this.createForm();
    }

    ngOnInit(): void {
        this.loadInstitutionData();
    }

    createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required]],
            registrationNumber: ['', [Validators.required]],
            motto: [''],
            description: [''],
            poBox: [''],
            emails: this.fb.array([]),
            phones: this.fb.array([]),
            isActive: [true]
        });
    }

    get emailsArray(): FormArray {
        return this.institutionForm.get('emails') as FormArray;
    }

    get phonesArray(): FormArray {
        return this.institutionForm.get('phones') as FormArray;
    }

    addEmail(): void {
        this.emailsArray.push(this.fb.control('', [Validators.email]) as FormControl);
    }

    removeEmail(index: number): void {
        this.emailsArray.removeAt(index);
    }

    addPhone(): void {
        this.phonesArray.push(this.fb.control('') as FormControl);
    }

    removePhone(index: number): void {
        this.phonesArray.removeAt(index);
    }

    onLogoSelected(event: any): void {
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            this.logoFile = file;
            
            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                this.logoPreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    loadInstitutionData(): void {
        this.isLoading = true;
        this.errorMessage = '';
        
        // Try to load active institutions first
        this.institutionService.getActiveInstitutions()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(
                (institutions) => {
                    // Take the first active institution if available
                    if (institutions && institutions.length > 0) {
                        const institution = institutions[0];
                        this.populateForm(institution);
                    } else {
                        // If no active institutions, try to get all institutions
                        this.institutionService.getAllInstitutions()
                            .subscribe(
                                (allInstitutions) => {
                                    if (allInstitutions && allInstitutions.length > 0) {
                                        const institution = allInstitutions[0];
                                        this.populateForm(institution);
                                    }
                                },
                                (error) => {
                                    console.error('Error loading all institutions:', error);
                                }
                            );
                    }
                },
                (error) => {
                    console.error('Error loading active institutions:', error);
                    this.errorMessage = 'Failed to load institution data. Please try again.';
                }
            );
    }

    populateForm(institution: any): void {
        this.currentInstitutionId = institution.id;
        
        // Clear existing form arrays
        while (this.emailsArray.length) {
            this.emailsArray.removeAt(0);
        }
        
        while (this.phonesArray.length) {
            this.phonesArray.removeAt(0);
        }
        
        // Set basic form values
        this.institutionForm.patchValue({
            name: institution.name,
            registrationNumber: institution.registrationNumber,
            motto: institution.motto,
            description: institution.description,
            poBox: institution.poBox,
            isActive: institution.isActive
        });
        
        // Add emails
        if (institution.emails && Array.isArray(institution.emails)) {
            institution.emails.forEach((email: string) => {
                this.emailsArray.push(this.fb.control(email, [Validators.email]) as FormControl);
            });
        }
        
        // Add phones
        if (institution.phones && Array.isArray(institution.phones)) {
            institution.phones.forEach((phone: string) => {
                this.phonesArray.push(this.fb.control(phone) as FormControl);
            });
        }
        
        // Set logo preview if available
        if (institution.logo) {
            this.logoPreview = institution.logo;
        }
    }

    saveInstitution(): void {
        if (this.institutionForm.valid) {
            this.isSubmitting = true;
            this.errorMessage = '';
            this.successMessage = '';
            
            const formValue = this.institutionForm.value;
            const institutionData: any = {
                name: formValue.name,
                registrationNumber: formValue.registrationNumber,
                motto: formValue.motto,
                description: formValue.description,
                poBox: formValue.poBox,
                emails: formValue.emails,
                phones: formValue.phones,
                isActive: formValue.isActive
            };
            
            // Add logo if selected
            if (this.logoFile) {
                institutionData.logo = this.logoFile;
            }
            
            // Determine if this is a create or update operation
            const saveOperation = this.currentInstitutionId 
                ? this.institutionService.updateInstitution(this.currentInstitutionId, institutionData)
                : this.institutionService.createInstitution(institutionData);
            
            saveOperation
                .pipe(
                    finalize(() => {
                        this.isSubmitting = false;
                    })
                )
                .subscribe(
                    (result) => {
                        this.successMessage = this.currentInstitutionId 
                            ? 'Institution information updated successfully.'
                            : 'Institution created successfully.';
                        
                        // Update the current institution ID if this was a create operation
                        if (!this.currentInstitutionId && result.id) {
                            this.currentInstitutionId = result.id;
                        }
                        
                        // Reload data to ensure we have the latest
                        this.loadInstitutionData();
                    },
                    (error) => {
                        console.error('Error saving institution:', error);
                        this.errorMessage = 'Failed to save institution data. Please try again.';
                    }
                );
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.institutionForm.controls).forEach(key => {
                const control = this.institutionForm.get(key);
                control?.markAsTouched();
            });
        }
    }

    resetForm(): void {
        // If we have an institution loaded, reset to its values
        if (this.currentInstitutionId) {
            this.loadInstitutionData();
        } else {
            // Otherwise reset to empty form
            this.institutionForm.reset({
                isActive: true
            });
            
            // Clear arrays
            while (this.emailsArray.length) {
                this.emailsArray.removeAt(0);
            }
            
            while (this.phonesArray.length) {
                this.phonesArray.removeAt(0);
            }
            
            // Clear logo
            this.logoFile = null;
            this.logoPreview = null;
        }
        
        this.errorMessage = '';
        this.successMessage = '';
    }
}
