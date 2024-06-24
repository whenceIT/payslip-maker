'use client'
import React, { useState,useEffect,useRef}  from 'react';
import * as XLSX from 'xlsx'
import Modal from './modal';
import jsPDF from 'jspdf';
import PayslipTemplate from './paysliptemplate';
import { saveAs } from 'file-saver';
import {pdf} from '@react-pdf/renderer';

export default function Dashboard(){
    const [excelFile,setExcelFile] = useState(null)
    const [typeError,setTypeError] = useState(null) 
    const [excelData, setExcelData] = useState(null)
    const [showModal,  setShowModal] = useState(false)
    const [indexnum,setIndex] = useState()
    const payslipTemplateRef = useRef(null);
    const [loading,setIsLoading] = useState(false)

    
const generateTemplatePdf =()=>{
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
    }); 


doc.html(payslipTemplateRef.current,{
    async callback(doc){
        await doc.save('document')
    }
})

}


    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv']
        let selectedFile = e.target.files[0]
        console.log(selectedFile + 'tiro')
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setTypeError(null)
                let reader = new FileReader()
                reader.readAsArrayBuffer(selectedFile)
                reader.onload=(e)=>{
                    setExcelFile(e.target.result)
                }
                
            }else{
                setTypeError('Please select excel files only!!')
                setExcelFile(null)
            }
           // console.log(selectedFile.type)
        }else{
            console.log('Please select a file!')
        }
    } 


    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(excelFile!==null){
            const workbook  = XLSX.read(excelFile,{type:'binary'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName]
            const data = XLSX.utils.sheet_to_json(worksheet,{defval:''});
            setExcelData(data);

        }
    }

    const sendAllPayslips=async()=>{
        setIsLoading(true)
        for (let indexnum = 0; indexnum < excelData.length ; indexnum++) {
            if(excelData[indexnum]['Email'] != ''){
                const blob = await pdf(<PayslipTemplate Name={excelData[indexnum]['Staff']} grossPay={excelData[indexnum]['Gross Pay']} NAPSA={excelData[indexnum]['NAPSA']} NHIMA={excelData[indexnum]['NHIMA']} PAYE={excelData[indexnum]['PAYE']} ALLOWANCES={excelData[indexnum]['Allowances']} DEDUCTIONS={excelData[indexnum]['Advance Deductions']} CHARGES={excelData[indexnum]['Charges']} NET_PAY={excelData[indexnum]['Net Pay']} DATE={excelData[indexnum]['Date']}/>).toBlob();
            console.log(blob)
            const pdfFile = new File([blob],`${excelData[indexnum]['Staff']} - payslip.pdf`,{
                type: 'application/pdf',
                 lastModified: new Date().getTime()
            })
            console.log(pdfFile)
            const formData = new FormData()
            formData.append('pdf_file',pdfFile),
            formData.append('email',excelData[indexnum]['Email'])
            formData.append('filename',pdfFile.name)
            formData.append('date',excelData[indexnum]['Date'])
         
            await fetch('https://payslip-maker-backend-1.onrender.com/pdf_upload',{
                method:'POST',
                body:formData,
            }).then((data=>data.json()))
            .then((res)=>{
                console.log(res)
            })
            .catch((error)=>{
                console.log(error)
            })
            }
          }
          setIsLoading(false)
    }

    const sendFile=async(indexnum)=>{
        setIsLoading(true)
        const blob = await pdf(<PayslipTemplate Name={excelData[indexnum]['Staff']} grossPay={excelData[indexnum]['Gross Pay']} NAPSA={excelData[indexnum]['NAPSA']} NHIMA={excelData[indexnum]['NHIMA']} PAYE={excelData[indexnum]['PAYE']} ALLOWANCES={excelData[indexnum]['Allowances']} DEDUCTIONS={excelData[indexnum]['Advance Deductions']} CHARGES={excelData[indexnum]['Charges']} NET_PAY={excelData[indexnum]['Net Pay']} DATE={excelData[indexnum]['Date']}/>).toBlob();
        const pdfFile = new File([blob],`${excelData[indexnum]['Staff']} - payslip.pdf`,{
            type: 'application/pdf',
             lastModified: new Date().getTime()
        })
        console.log(pdfFile)
        const formData = new FormData()
        formData.append('pdf_file',pdfFile),
        formData.append('email',excelData[indexnum]['Email'])
        formData.append('filename',pdfFile.name)
        formData.append('date',excelData[indexnum]['Date'])
        await fetch('https://payslip-maker-backend-1.onrender.com/pdf_upload',{
            method:'POST',
            body:formData,
        }).then((data=>data.json()))
        .then((res)=>{
            console.log(res)
            setIsLoading(false)
        })
        .catch((error)=>{
            console.log(error)
            setIsLoading(false)
        })
     }

     if(loading){
        return (
            <div className="flex items-center justify-center border h-screen">
            <div className = 'flex flex-col items-center'>
  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <p className='text-center font-bold'>Sending the payslips...</p>
</div>
      </div>
        )
           }

    return(
        <div className='p-2'>
        <nav className="relative px-4 py-4 flex justify-center items-center bg-white">
        <img alt='logo' src='/logo.png'/>
        </nav>

         <div className='flex justify-center'>
          
            <form onSubmit={handleFileSubmit} className='flex flex-col gap-3'>
      <input type='file' required onChange={handleFile}></input>
      <button type='submit' className='font-bold text-white bg-[#008000] focus:outline-none focus:ring-4 rounded-lg px-12 py-3 text-center'>UPLOAD</button>
      {typeError&&(
        <div>{typeError}</div>
      )}
    </form>
         </div>
  

<div className='relative overflow-x-auto mt-5'>
{
    excelData?(
        <>
        <div className='flex justify-center mb-5'>
        <button className='font-bold text-white bg-[#008000] focus:outline-none focus:ring-4 rounded-lg px-12 py-3 text-center' onClick={sendAllPayslips}>Send All</button>
        </div>
       
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                    {Object.keys(excelData[0]).map((key,item)=>(
                        <>
                            <th className='px-6 py-3' key={key}>{key}
                            </th>
                      
                        </>
                    
                    ))}
                     
                </tr>
            </thead>

            <tbody>
                {
                    excelData.map((individualExcelData,index)=>(
                        <tr key={index} className='bg-white border-b'>
                            {Object.keys(individualExcelData).map((key,index)=>(
                                <>
                                 <td className= 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap' key={key}>{individualExcelData[key]}</td>
                           
                                </>
                               
                            ))}
                                  <td>
                                    <button className='font-bold text-white bg-[#008000] focus:outline-none focus:ring-4 rounded-lg px-4 py-3 text-center' onClick={()=>{
                                        setIndex(index)
                                        setShowModal(true)
                                    }}>
                                    View
                                    </button>
                                 
                                </td>
                                <td>
                                    <button  className='font-bold text-white bg-[#008000] focus:outline-none focus:ring-4 rounded-lg px-4 py-3 text-center' onClick={()=>{
                                        sendFile(index)
                                    }}>
                                        Send
                                    </button>
                                </td>
                           
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    ):(
        <div className='flex justify-center items-center'>
        <p>No file uploaded!!</p>
        </div>
    )
}
</div>
{
    indexnum != null ? (
        <Modal isVisible={showModal} onClose={()=>setShowModal(false)} Name={excelData[indexnum]['Staff']} grossPay={excelData[indexnum]['Gross Pay']} NAPSA={excelData[indexnum]['NAPSA']} NHIMA={excelData[indexnum]['NHIMA']} PAYE={excelData[indexnum]['PAYE']} ALLOWANCES={excelData[indexnum]['Allowances']} DEDUCTIONS={excelData[indexnum]['Advance Deductions']} CHARGES={excelData[indexnum]['Charges']} NET_PAY={excelData[indexnum]['Net Pay']} DATE={excelData[indexnum]['Date']}/>
    ):(
        <></>
    )
}

        </div>
    )
}