'use client'
import React, { useState,useEffect,useRef}  from 'react';
import * as XLSX from 'xlsx'
import Modal from './modal';
import jsPDF from 'jspdf';
import PayslipTemplate from './paysliptemplate';


export default function Dashboard(){
    const [excelFile,setExcelFile] = useState(null)
    const [typeError,setTypeError] = useState(null)
    const [excelData, setExcelData] = useState(null)
    const [showModal,  setShowModal] = useState(false)
    const [indexnum,setIndex] = useState()
    const payslipTemplateRef = useRef(null);

    
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
            const workbook  = XLSX.read(excelFile,{type:'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName]
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data[0]['Gross Pay'])
            setExcelData(data);

        }
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
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                    {Object.keys(excelData[0]).map((key)=>(
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
                        <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            {Object.keys(individualExcelData).map((key,index)=>(
                                <>
                                 <td className= 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white' key={key}>{individualExcelData[key]}</td>
                           
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