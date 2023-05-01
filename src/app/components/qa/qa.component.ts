import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css']
})
export class QaComponent {

  // @ts-ignore
  textInput: string;
  // @ts-ignore
  textOutput: string;
  // @ts-ignore
  questionInput: string;
  isButtonDisabled = false;
  userQaCollection: AngularFirestoreCollection<any>;

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.userQaCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-qa');

  }

  ngOnInit() {
    this.textInput = this.route.snapshot.paramMap.get('data') || " ";
  }

  onSubmit() {

    if (this.textInput != "" && this.questionInput != "") {
      this.isButtonDisabled = true;
      let url = '';
      if (!this.questionInput.endsWith("?")) {
        this.questionInput = this.questionInput + "?";
      }
      // this.callFirebaseCloudFunction(this.textInput);

      url = `/forth/qa/${encodeURIComponent(this.textInput)}/${encodeURIComponent(this.questionInput)}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Update with appropriate allowed origins
        'Access-Control-Allow-Methods': 'GET', // Update with appropriate allowed methods
        'Access-Control-Allow-Headers': 'Content-Type',
      });

      // this.sumButton = "Summarize Again!";
      console.log('Submitted to :', url);
      this.textOutput = 'Answering...'
      this.http.get(url, {headers: headers}).subscribe((response: any) => {
          console.log(response);
          this.textOutput = response.answer;
          this.saveQaOutput(this.textInput, this.questionInput, this.textOutput);
          this.isButtonDisabled = false;
        },
        (error: any) => {
          console.error(error); // Log the error to console or handle it as needed
          // You can also update the UI to display an error message, or take other actions based on the error
          alert('Error occurred while summarizing, please try again!');
          this.textOutput = "";
          this.isButtonDisabled = false;
        });
    } else {
      alert('Both Paragraph and Question needs text');
    }




  }


  saveQaOutput(input: string, question: string, output: string) {
    const dateTime = new Date();
    // Create a new document with a unique ID in the "userInputsOutputs" collection
    this.userQaCollection.add({
      paragraph: input,
      question: question,
      output: output,
      dateTime: dateTime,
      type: 'qa'
    })
      .then(() => {
        console.log('User input and output saved to Firestore successfully.');
      })
      .catch((error) => {
        console.error('Error saving user input and output to Firestore: ', error);
      });
  }

  // saveParagraph(paragraphId?: string): void {
  //   const dateTime = new Date();
  //   const docRef = this.firestore.doc(`users/${this.authService.userData.uid}/qa/${paragraphId || ''}`); // create a reference to the document with the given paragraph ID, or create a new one if none is provided
  //
  //   const docData = {
  //     paragraph: this.textInput,
  //     dateTime: dateTime,
  //
  //   }; // create the document data with the paragraph field
  //   docRef.set(docData, { merge: true }).then(() => {
  //     console.log('Saved paragraph');
  //     this.saveQuestion(docRef, this.questionInput, this.textOutput)
  //   }).catch((error) => {
  //     console.error('Error saving user qa to Firestore: ', error);
  //   }); // set the document data with merge option to update the paragraph field if the document already exists
  // }
  //
  // saveQuestion(paragraphRef: AngularFirestoreDocument<unknown>, questionText: string, answerText: string): void {
  //   // const docRef = this.firestore.doc(`users/${userId}/qa/${paragraphId}/questions`); // create a reference to the questions collection
  //
  //   const docRef = paragraphRef.collection('questions');
  //   const docData = {
  //     question: questionText, answer: answerText
  //   }; // create the document data with question and answer fields
  //   docRef.add(docData).then(() => {
  //     console.log('Saved questions');
  //   }).catch((error) => {
  //     console.error('Error saving user qa to Firestore: ', error);
  //   });; // add the document to the questions collection
  // }

}
