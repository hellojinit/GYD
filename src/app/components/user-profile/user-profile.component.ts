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
    const userHistoryRef: AngularFirestoreCollection<any> = this.firestore.collection('users').doc(this.authService.userData.uid).collection('History');
    userHistoryRef.get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete().then(() => {
          alert("Your history has been successfully deleted!");
          console.log('User history deleted from Firestore successfully.');
        })
          .catch((error) => {
            console.error('Error deleting user history from Firestore: ', error);
          });
      });
    });
  }
}
