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
            console.log(data[0])
            setExcelData(data);

        }
    }

    return(
        <>
         <h1>Payslip maker</h1>
    <form onSubmit={handleFileSubmit}>
      <input type='file' required onChange={handleFile}></input>
      <button type='submit'>UPLOAD</button>
      {typeError&&(
        <div>{typeError}</div>
      )}
    </form>

<div>
{
    excelData?(
        <>
        <table>
            <thead>
                <tr>
                    {Object.keys(excelData[0]).map((key)=>(
                        <>
                            <th key={key}>{key}
                            </th>
                      
                        </>
                    
                    ))}
                     
                </tr>
            </thead>

            <tbody>
                {
                    excelData.map((individualExcelData,index)=>(
                        <tr key={index}>
                            {Object.keys(individualExcelData).map((key,index)=>(
                                <>
                                 <td key={key}>{individualExcelData[key]}</td>
                           
                                </>
                               
                            ))}
                                  <td>
                                    <button onClick={()=>{
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
        <>
        <p>No file uploaded!!</p>
        </>
    )
}
</div>
{
    indexnum != null ? (
        <Modal isVisible={showModal} onClose={()=>setShowModal(false)}/>
    ):(
        <></>
    )
}

        </>
    )
}