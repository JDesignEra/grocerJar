import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { map, take, finalize } from 'rxjs/operators';
import { Grocery } from '../models/grocery';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private groceries: Observable<Grocery[]>
  private groceryCollection: AngularFirestoreCollection<Grocery>;

  private task: AngularFireUploadTask;
  private snapshot: Observable<any>;
  private uploadedFileURL: Observable<string>
  private fileName: string;
  private isUploading: boolean;
  private isUploaded: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private toastService: ToastService) {
    this.groceryCollection = this.db.collection<Grocery>('grocery');

    this.isUploading = false;
    this.isUploaded = false;

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
    return this.groceryCollection.add(grocery).then(ref => {
      this.updateId(ref.id);
    });
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

  uploadImage(file: File): string {
    if (file) {
      if (file.type.split('/')[0] !== 'image') {
        this.toastService.presentToast('File type is unsupported.', 2000, 'danger');
        return;
      }
  
      this.isUploading = true;
      this.isUploaded = false;
      this.fileName = file.name;
  
      const newName = `${new Date().getTime()}_${file.name}`;
      const path = `uploads/${newName}`;
      const fileRef = this.storage.ref(path);
  
      this.task = this.storage.upload(path, file);
      this.snapshot = this.task.snapshotChanges().pipe(
        finalize(() => {
          this.uploadedFileURL = fileRef.getDownloadURL();
  
          this.uploadedFileURL.subscribe(response => {
            this.isUploading = false;
            this.isUploaded = true;
          },
          error => {
            console.log(error);
          });
        })
      );

      return newName;
    }
    
    return null;
  }

  deleteImage(fileName: string) {
    this.storage.ref(`uploads/${fileName}`).delete();
  }

  private updateId(id: string): Promise<void> {
    return this.groceryCollection.doc(id).update({
      id: id
    });
  }
}
