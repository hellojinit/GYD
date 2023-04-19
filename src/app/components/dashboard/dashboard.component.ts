import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from "@angular/common/http";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})

export class DashboardComponent implements OnInit{

  // @ts-ignore
  textInput: string;
  // @ts-ignore
  textOutput: string;
  loading: boolean = false;
  fileSelected = false;

  userInputsOutputsCollection: AngularFirestoreCollection<any>; // Firestore collection reference
  userInputsOutputs: Observable<any[]>; // Observable for user inputs and outputs data

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {
    this.userInputsOutputsCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History'); // Reference to "userInputsOutputs" collection in Firestore
    this.userInputsOutputs = this.userInputsOutputsCollection.snapshotChanges().pipe(
      map(actions => {
        // Map the snapshot changes to an array of user inputs and outputs data
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).sort((a, b) => {
          // Sort the data array by date and time in descending order
          return b.dateTime.toDate().getTime() - a.dateTime.toDate().getTime();
        });
      })
    );

  }
  //
  ngOnInit(): void {

  }
  onChange(event: any) {
    console.log(event.target.files[0])
    this.fileSelected = true;
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    // Register an onload event handler for when the file is loaded
    reader.onload = (e: any) => {
      const fileContents = e.target.result; // Get the file contents as a string
      console.log(fileContents); // Do whatever you want with the file contents
      this.textInput = fileContents;
    };
    // Read the file as text
    reader.readAsText(file);
  }
  onUpload() {
    console.log(this.fileSelected);
    if (this.fileSelected) {
      alert("Uploaded")
      this.fileSelected = false
    }
    this.loading = !this.loading
  }

  onSubmit() {
    const url = `api/summarize/${this.textInput}`;
    console.log('Submitted')
    this.textOutput = 'Summarizing..'
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.textOutput = response.summary;
      this.saveUserInputOutput(this.textInput, this.textOutput);
    });
  }

  saveUserInputOutput(input: string, output: string) {
    const dateTime = new Date();
    // Create a new document with a unique ID in the "userInputsOutputs" collection
    this.userInputsOutputsCollection.add({
      input: input,
      output: output,
      dateTime: dateTime
    })
      .then(() => {
        console.log('User input and output saved to Firestore successfully.');
      })
      .catch((error) => {
        console.error('Error saving user input and output to Firestore: ', error);
      });
  }

  fetchUserHistory() {
    this.userInputsOutputs.subscribe((historyData: any[]) => {
      console.log('User history data:', historyData);
      // Do whatever you want with the user history data, e.g., update a local array to display in the UI
    });
  }
  deleteUserInputOutput(itemId: string) {
    // Delete the document from Firestore using the document ID
    this.userInputsOutputsCollection.doc(itemId).delete()
      .then(() => {
        console.log('User input and output deleted from Firestore successfully.');
      })
      .catch((error) => {
        console.error('Error deleting user input and output from Firestore: ', error);
      });
  }

  summarizeAgain(itemInput: string) {
    this.textInput = itemInput
    this.onSubmit()
  }

  copyOutput(output: string): void {
    // Create a new text area element to hold the output text
    const textarea = document.createElement('textarea');
    textarea.value = output;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); // Copy the text to clipboard
    document.body.removeChild(textarea); // Remove the temporary text area element

    // Show a notification or feedback to indicate that the text has been copied
    alert('Output text has been copied to clipboard!');
  }
}
