import { apiCall } from "./ApiCall";
const FileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // "image" should match your backend field name
  
    const data = await apiCall("/assets/upload", "post", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
  
    return data.filename;
  };
  export default FileUpload;