import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";
// import { v4 as uuidv4 } from 'uuid';



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

  kgbuttonDisabed= false;
  userInputsOutputsCollection: AngularFirestoreCollection<any>;
  userKgCollection: AngularFirestoreCollection<any>; // Firestore collection reference
  userInputsOutputs: Observable<any[]>; // Observable for user inputs and outputs data

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.textInput = this.route.snapshot.paramMap.get('data') || " ";

    this.sumButton = "Summarize!";
    // Reference to "userInputsOutputs" collection in Firestore
    this.userInputsOutputsCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-sum');
    this.userKgCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-kg');
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

  goToQA() {
    // this.router.navigate(['/qa', this.textInput]);
    this.router.navigate(['/qa', { data: this.textInput }]);
  }
  goToQAHistory(str: string) {
    // this.router.navigate(['/qa', this.textInput]);
    this.router.navigate(['/qa', { data: str }]);
  }

  saveKgData(jsonData: any, inputText: string) {
    // const user = this.authService;
    const uid = this.authService.userData.uid;
    // const uuid = uuidv4();
    const dateTime = new Date();
    // const filePath = `users/${uid}/${uuid}.json`;
    // const fileRef = this.storage.ref(filePath);
    // const task = fileRef.putString(JSON.stringify(jsonData));
    const relations = JSON.stringify(jsonData);
    // task.then(() => {
    this.userKgCollection.add({
      relations: relations,
      input: inputText,
      dateTime: dateTime,
      type: 'kg'
    })
      .then(() => {
        console.log('User input and Kg saved to Firestore successfully.');
        this.router.navigate(['/knowledge-graph']);
      })
      .catch((error) => {
        console.error('Error saving user input and Kg to Firestore: ', error);
      });
    // });
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


    if (this.textInput != "") {
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

      this.sumButton = "Summarize w/ different model!";
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
    else {
      alert('Input text can\'t be empty');
    }
  }

  submitKG() {
    this.kgbuttonDisabed = true;
    let url = '';
    // this.callFirebaseCloudFunction(this.textInput);

    url = `/third/graph/${encodeURIComponent(this.textInput)}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Update with appropriate allowed origins
      'Access-Control-Allow-Methods': 'GET', // Update with appropriate allowed methods
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    console.log('Submitted to :', url);
    this.textOutput = 'Graphing...'
    this.http.get(url, {headers: headers}).subscribe((response: any) => {
        console.log(response);
        // this.textOutput = response.summary;
        // this.saveUserInputOutput(this.textInput, this.textOutput);
        this.saveKgData(response, this.textInput);
        this.kgbuttonDisabed = false;

      },
      (error: any) => {
        console.error(error); // Log the error to console or handle it as needed
        // You can also update the UI to display an error message, or take other actions based on the error
        alert('Error occurred while summarizing, please try again!');
        this.textOutput = "";
        this.kgbuttonDisabed = false;
      });
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
