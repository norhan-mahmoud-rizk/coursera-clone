import { Component } from '@angular/core';
import { EditFormDialogComponent } from '../edit-form-dialog/edit-form-dialog.component';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { CredentialDialogComponent } from '../credential-dialog/credential-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [EditFormDialogComponent,ProjectDialogComponent,CredentialDialogComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
