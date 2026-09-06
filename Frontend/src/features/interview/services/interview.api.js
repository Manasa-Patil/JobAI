import axios from "axios";

export async function generateInterviewReport({jobDescription,selfDescription,resumeFile}){
     const formData=new FormData()
     formData.append("jobDescription",jobDescription)
     formData.append("selfDescription",selfDescription)
     formData.append("resume",resumeFile)
     
    try{
       const response=await axios.post(
        "http://localhost:3000/api/interview",
        formData,{
        headers:{
           "Content-Type":"multipart/form-data"
        },
            withCredentials:true
        
    }
       );
       return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function getInterviewReportById(interviewId){
    try{
     const response=await axios.get(
        `http://localhost:3000/api/interview/report/${interviewId}`,
        {
            withCredentials:true
        }
     )

     return response.data
    }catch(err){
        console.log(err)
    }
}

export async function getAllInterviewReports(){
    try{
     const response=await axios.get(
        "http://localhost:3000/api/interview/",
        {
            withCredentials:true
        }
     )

     return response.data
    }catch(err){
        console.log(err)
    }
}

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await axios.post(`http://localhost:3000/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob",
        withCredentials:true
    })

    return response.data
}