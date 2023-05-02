import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  userTextSumCollection: AngularFirestoreCollection<any>; // Firestore collection reference
  userTextSumInputsOutputs: Observable<any[]>; // Observable for user inputs and outputs data


  userQaCollection: AngularFirestoreCollection<any>; // Firestore collection reference
  userQas: Observable<any[]>; // Observable for user inputs and outputs data

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {
    // text summarization
    if (this.authService.userData.uid != null) {
      this.userTextSumCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-sum');
      // Reference to "userInputsOutputs" collection in Firestore
      this.userTextSumInputsOutputs = this.userTextSumCollection.snapshotChanges().pipe(
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
    } else {
      this.userTextSumCollection = this.firestore.collection('users').doc('56pBT5yueRdWeRUJaRjzXuPk1io2').collection('History-sum');
      // Reference to "userInputsOutputs" collection in Firestore
      this.userTextSumInputsOutputs = this.userTextSumCollection.snapshotChanges().pipe(
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

    // KGs
    if (this.authService.userData.uid != null) {
      this.userQaCollection = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-qa');
      // Reference to "userInputsOutputs" collection in Firestore
      this.userQas = this.userQaCollection.snapshotChanges().pipe(
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
    } else {
      this.userQaCollection = this.firestore.collection('users').doc('56pBT5yueRdWeRUJaRjzXuPk1io2').collection('History-qa');
      // Reference to "userInputsOutputs" collection in Firestore
      this.userQas = this.userQaCollection.snapshotChanges().pipe(
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


  }

  ngOnInit(): void {

  }

  fetchUserHistory() {
    this.userTextSumInputsOutputs.subscribe((historyData: any[]) => {
      console.log('User history data:', historyData);
      // Do whatever you want with the user history data, e.g., update a local array to display in the UI
    });
  }

  deleteUserInputOutput(itemId: string) {
    // Delete the document from Firestore using the document ID
    this.userTextSumCollection.doc(itemId).delete()
      .then(() => {
        console.log('User input and output deleted from Firestore successfully.');
      })
      .catch((error) => {
        console.error('Error deleting user input and output from Firestore: ', error);
      });
  }

  deleteQas(itemId: string) {
    // Delete the document from Firestore using the document ID
    this.userQaCollection.doc(itemId).delete()
      .then(() => {
        console.log('User input and output deleted from Firestore successfully.');
      })
      .catch((error) => {
        console.error('Error deleting user input and output from Firestore: ', error);
      });
  }
  //
  // deleteAllUserHistory() {
  //   // const userHistoryRef: AngularFirestoreCollection<any> = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History');
  //   this.userTextSumCollection.get().subscribe(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       doc.ref.delete().then(() => {
  //         alert("Your history has been successfully deleted!");
  //         console.log('User history deleted from Firestore successfully.');
  //       })
  //         .catch((error) => {
  //           console.error('Error deleting user history from Firestore: ', error);
  //         });
  //     });
  //   });
  //   this.userKCollection.get().subscribe(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       doc.ref.delete().then(() => {
  //         alert("Your history has been successfully deleted!");
  //         console.log('User history deleted from Firestore successfully.');
  //       })
  //         .catch((error) => {
  //           console.error('Error deleting user history from Firestore: ', error);
  //         });
  //     });
  //   });
  // }

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
