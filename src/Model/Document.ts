export interface Document {
           // Original file name
    fileType: string;         // pdf, docx, jpg, etc.
    fileBase64String: string; // Base64 string of the file
    createdOn?: Date;        // Defaults to current date if needed
    updatedOn?: Date;      // Defaults to false
   
  }