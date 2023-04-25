import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";

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

  sumButton = "Summarize!"
  fileSelected = false;
  isButtonDisabled = false;

  userInputsOutputsCollection: AngularFirestoreCollection<any>; // Firestore collection reference
  userInputsOutputs: Observable<any[]>; // Observable for user inputs and outputs data

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {
    this.sumButton = "Summarize!";
    // Reference to "userInputsOutputs" collection in Firestore
    this.userInputsOutputsCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-sum');
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

  // callFirebaseCloudFunction(inputString: string): void {
  //   const url = 'https://us-central1-gydapp-b8dd4.cloudfunctions.net/summarizeString'; // Update with your Firebase Cloud Function URL
  //   const params = { string: inputString }; // Pass in the input string as a query parameter
  //
  //   console.log('firebase:');
  //   this.http.get(url, { params }).subscribe(
  //     (response: any) => {
  //       console.log('firebase ret:');
  //       console.log(response.summary); // Access the summary from the response
  //       // You can update your UI or take other actions with the summary here
  //     },
  //     (error: any) => {
  //       console.error(error); // Log the error to console or handle it as needed
  //       // You can update your UI or take other actions based on the error
  //     }
  //   );
  // }
  onSubmit() {
    this.isButtonDisabled = true;
    let url = '';
    // this.callFirebaseCloudFunction(this.textInput);
    if (this.sumButton == "Summarize!") {
      url = `/api/summarize/${encodeURIComponent(this.textInput)}`;
    } else {
      url = `/second/summarize_pegasus/${encodeURIComponent(this.textInput)}`;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Update with appropriate allowed origins
      'Access-Control-Allow-Methods': 'GET', // Update with appropriate allowed methods
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    this.sumButton = "Summarize Again!";
    console.log('Submitted to :', url);
    this.textOutput = 'Summarizing...'
    this.http.get(url, {headers: headers}).subscribe((response: any) => {
      console.log(response);
      this.textOutput = response.summary;
      this.saveUserInputOutput(this.textInput, this.textOutput);
      this.isButtonDisabled = false;
    },
      (error: any) => {
        console.error(error); // Log the error to console or handle it as needed
        // You can also update the UI to display an error message, or take other actions based on the error
        alert('Error occurred while summarizing, please try again!');
        this.textOutput = "";
        this.isButtonDisabled = false;
      });
  }

  submitKG() {

  }

  saveUserInputOutput(input: string, output: string) {
    const dateTime = new Date();
    // Create a new document with a unique ID in the "userInputsOutputs" collection
    this.userInputsOutputsCollection.add({
      input: input,
      output: output,
      dateTime: dateTime,
      type: 'sum'
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

  summarizeAgain(itemInput: string): void {
    this.textInput = itemInput
    this.sumButton = "Summarize Again!"
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
