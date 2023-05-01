import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() { }

  deleteUserHistory() {
    const userHistoryRef: AngularFirestoreCollection<any> = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-qa');
    userHistoryRef.get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete().then(() => {
          // alert("Your history has been successfully deleted!");
          console.log('User QA history deleted from Firestore successfully.');
        })
          .catch((error) => {
            console.error('Error deleting QA user history from Firestore: ', error);
          });
      });
    });
    const userHistoryRef2: AngularFirestoreCollection<any> = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-sum');
    userHistoryRef2.get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete().then(() => {
          // alert("Your history has been successfully deleted!");
          console.log('User summarization history deleted from Firestore successfully.');
        })
          .catch((error) => {
            console.error('Error deleting user summarization history from Firestore: ', error);
          });
      });
    });
    const userHistoryRef3: AngularFirestoreCollection<any> = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History-kg');
    userHistoryRef3.get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete().then(() => {
          // alert("Your history has been successfully deleted!");
          console.log('User KG history deleted from Firestore successfully.');
        })
          .catch((error) => {
            console.error('Error deleting KG user history from Firestore: ', error);
          });
      });
    });

  }
}
