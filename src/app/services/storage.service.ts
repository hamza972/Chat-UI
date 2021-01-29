import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uploadProgress: Observable<number>;
  downloadURL: string;

  constructor(private afStorage: AngularFireStorage) { }

  async uploadAvatar(id, imageFile): Promise<string> {
    const uploadTask = this.afStorage.upload('avatars/' + id, imageFile);
    const ref = this.afStorage.ref('avatars/' + id);
    this.uploadProgress = uploadTask.percentageChanges();
    await uploadTask;
    const urlTask = await ref.getDownloadURL();
    console.log('Image uploaded!');
    return urlTask.toPromise();
  }
}
