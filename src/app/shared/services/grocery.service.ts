import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Grocery } from '../models/grocery';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private groceries: Observable<Grocery[]>
  private groceryCollection: AngularFirestoreCollection<Grocery>;

  constructor(private afs: AngularFirestore) {
    this.groceryCollection = this.afs.collection<Grocery>('grocery');
    this.groceries = this.groceryCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    )
  }

  getAll(): Observable<Grocery[]> {
    return this.groceries;
  }

  getById(id: string): Observable<Grocery> {
    return this.groceryCollection.doc<Grocery>(id.toString()).valueChanges().pipe(
      take(1),
      map(i => {
        i.id = id;
        
        return i;
      })
    );
  }

  add(grocery: Grocery): Promise<void> {
    return this.groceryCollection.add(grocery).then(ref => this.updateId(ref.id));
  }

  update(grocery: Grocery): Promise<void> {
    return this.groceryCollection.doc(grocery.id).update({
      item: grocery.item,
      quantity: grocery.quantity,
      status: grocery.status,
      image: grocery.image
    });
  }

  delete(id: string): Promise<void> {
    return this.groceryCollection.doc(id).delete();
  }

  private updateId(id: string): Promise<void> {
    return this.groceryCollection.doc(id).update({
      id: id
    });
  }
}
