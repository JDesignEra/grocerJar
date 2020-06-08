import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(msg: string, duration: number, color: string = undefined) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      color: color,
    });

    toast.present();
  }
}
