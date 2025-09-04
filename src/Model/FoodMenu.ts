export interface FoodMenu {
    foodDescription: string,
    quantity: number,
    rate: string,
    category: string,
    createdOn:Date,
    updatedOn: Date,
    fileType: string;         // pdf, docx, jpg, etc.
    fileBase64String: string; // Base64 string of the file
}