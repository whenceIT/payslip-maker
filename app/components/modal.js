'use client'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import PayslipTemplate from "./paysliptemplate";
import React, { useState,useEffect,useRef}  from 'react';


const Modal=({isVisible,onClose})=>{
    if(!isVisible) return null;

    // const payslipTemplateRef = useRef(null);

    // const generateTemplatePdf =()=>{
    //     const doc = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'px',
    //         format: 'a4',
    //     }); 
    
    
    // doc.html(payslipTemplateRef.current,{
    //     async callback(doc){
    //         await doc.save('document')
    //     }
    // })
    
    // }

    const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {

        const downloadPdfDocument = () => {
            const input = document.getElementById(rootElementId);
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "px",
                        format: "a4"
                    });
                    const width = pdf.internal.pageSize.getWidth();
                    const height = (canvas.height * width) / canvas.width;
                    pdf.addImage(imgData, 'JPEG', 0,0,width, height);
                    pdf.save(`document.pdf`);
                })
        }
    
        return <button onClick={downloadPdfDocument} className='text-bold'>Download Pdf</button>
    
    }


    const handleClose =(e)=>{
       if(e.target.id === 'wrapper') onClose()
    }


    return(
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose} id="wrapper">
            <div className='flex flex-col justify-center items-center m-2'>
            
            <button className="text-white text-xl" onClick={()=>onClose()}>
                close
            {/* <IoClose size={30} color='black'/> */}
            </button>
            <GenericPdfDownloader 
          downloadFileName="CustomPdf" 
          rootElementId="payslip" 
        />
                                    
            <div className='w-full flex justify-center items-center mt-1 border-2' onClick={handleClose} id="wrapper">
                <div id='payslip' className='border 2'>
                <PayslipTemplate/>
                </div>

                
            </div>
            </div>
        </div>
    )
}

export default Modal;