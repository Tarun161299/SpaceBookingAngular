import { Component } from '@angular/core';
import { FoodData } from '../../Model/FoodData';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../Common/services/food-Services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  foodData:FoodData[]=[];
  pagedData: FoodData[] = [];  // records for current page
currentPage = 1;
pageSize = 10;           // records per page
totalPages = 1;
editIndex: number | null = null;
backupRow: any = null;
filetype:any=null;
newFileBase64: string | null = null;
constructor(private foodService:FoodService,private router: Router,private toast:ToastrService) {}
ngOnInit(): void {
  // This code runs when the page/component loads
  console.log('Page loaded!');
   this.loadAllFoodData();
}
loadAllFoodData(){
  debugger
this.foodService.getAllFoodDetails().subscribe({
  next: (res:any) => {
    debugger
    this.foodData= res;
    this.loadFoodData();
  },
  error: (err) => {
    console.error('Error fetching records', err);
  }
});;
}
updatePagedData() {
  debugger
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.pagedData = this.foodData.slice(start, end);
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePagedData();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagedData();
  }
}
navigateTo(path: string) {
  debugger
  this.router.navigate([path]);
}
loadFoodData() {
  // simulate API data (replace with actual service call)
  // this.foodData = await this.foodService.getAllFood();
  
  this.totalPages = Math.ceil(this.foodData.length / this.pageSize);
  this.updatePagedData();
}
startEdit(index: number) {
  this.editIndex = index;
  this.backupRow = { ...this.foodData[index] }; // keep backup
}

fileError: string = '';
saveEdit(item: any) {
  // If a new image was uploaded, update it
  if (this.newFileBase64) {
    item.fileBase64String = this.newFileBase64;
    item.fileType=this.filetype;
  }
this.foodService.UpdateData(item).subscribe({
  next: (res:any) => {
    debugger
    if(res==1){
      this.loadAllFoodData();
this.toast.success("data updated Successfully")
    }
    else{
      this.toast.error("Some Error occured")
    }
  },
  error: (err) => {
    this.toast.error("Some Error occured")
    console.error('Error fetching records', err);
  }}
)

  // Reset after save
  this.filetype=null;
  this.newFileBase64 = null;
  this.editIndex = null;
  this.backupRow = null;

  // TODO: Call API to save changes
  console.log("Saving item:", item);
}

onFileSelected(event: any, item: any) {
  const file: File = event.target.files[0];
  this.fileError = '';
  this.newFileBase64 = null;

  if (file) {
    const fileType = file.type.toLowerCase();
    const validTypes = ['image/jpeg', 'image/jpg'];
this.filetype=file.type.toLowerCase();
    if (!validTypes.includes(fileType)) {
      this.fileError = 'Only JPG/JPEG files are allowed.';
      event.target.value = ''; // reset file input
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // store new base64 in temp, don't overwrite immediately
      this.newFileBase64 = (reader.result as string).split(",")[1];
    };
    reader.readAsDataURL(file);
  }
}


cancelEdit() {
  if (this.editIndex !== null) {
    this.foodData[this.editIndex] = this.backupRow; // restore backup
  }
  this.editIndex = null;
  this.backupRow = null;
}

deleteItem(item: any) {
  this.foodService.DeleteData(item.id).subscribe({
    next: (res:any) => {
      debugger
      if(res==1){
        this.loadAllFoodData();
  this.toast.success("Data Deleted Successfully")
      }
      else{
        this.toast.error("Some Error occured")
      }
    },
    error: (err) => {
      this.toast.error("Some Error occured")
      console.error('Error fetching records', err);
    }}
  )
}
}
