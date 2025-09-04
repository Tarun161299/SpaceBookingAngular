import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FoodMenu } from '../../Model/FoodMenu';
import { Document } from '../../Model/Document';
import { FoodService } from '../../Common/services/food-Services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-items',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './add-items.html',
  styleUrl: './add-items.css'
})
export class AddItems {
  foodForm: FormGroup;
  fileBase64: string | null = null;
  fileType: string = '';

  constructor(private fb: FormBuilder, private foodService: FoodService,private tostr:ToastrService) {
    this.foodForm = this.fb.group({
      foodDescription: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      rate: ['', Validators.required],
      category: ['', Validators.required],
      file: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      // ✅ Allow only JPEG/JPG
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        this.tostr.error('Only JPEG/JPG files are allowed!');
        event.target.value = ''; // clear file input
        return;
      }
  
      this.fileType = file.type;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.fileBase64 = (reader.result as string).split(',')[1]; // only base64 part
      };
      reader.readAsDataURL(file);
    }
  }
  

  onSubmit() {
    debugger
    if (this.foodForm.valid && this.fileBase64) {
      debugger
      var food: FoodMenu = {
        foodDescription: this.foodForm.value.foodDescription,
        quantity: this.foodForm.value.quantity,
        rate: this.foodForm.value.rate,
        category: this.foodForm.value.category,
        createdOn: new Date(),
        updatedOn: new Date(),
        fileBase64String: this.fileBase64,
        fileType: this.fileType,
       
      };

   
      this.foodService.saveFood(food).subscribe({
        next: (data:any) => {
          this.tostr.success('Food Information Saved Successfully!');
          this.foodForm.reset();
          this.fileBase64 = null;
        },
        error: (err:any) => {
          console.error(err);
          this.tostr.error('Error saving food');
        }
      });
    }
  }
}
