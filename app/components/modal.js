'use client'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import PayslipTemplate from "./paysliptemplate";
import React, { useState,useEffect,useRef}  from 'react';
import { Image, Text, View, Page, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';


const Modal=({isVisible,onClose})=>{
    if(!isVisible) return null;

    const payslipTemplateRef = useRef(null);
    let pdfjs = document.getElementById('payslip');
    const generateTemplatePdf =()=>{
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        }); 
    
    
    doc.html(payslipTemplateRef.current,{
        async callback(doc){
            await doc.save('document')
        },
       // html2canvas: { scale: 0.5 }
    })
    
    }
    //'landscape', 'pt', [1200, 600]

    const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {

        const downloadPdfDocument = () => {
            const input = document.getElementById(rootElementId);
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "pt",
                        format: "a4"
                    });
                    const width = pdf.internal.pageSize.getWidth();
                    const height = pdf.internal.pageSize.getWidth(); //(canvas.height * width) / canvas.width;
                    pdf.addImage(imgData, 'JPEG', 0,0,width, height);
                    pdf.save(`document.pdf`);
                })
        }
    
        return <button onClick={downloadPdfDocument} className='text-bold'>Download Pdf</button>
    
    }


    const handleClose =(e)=>{
       if(e.target.id === 'wrapper') onClose()
    }

    const styles = StyleSheet.create({
        page:{borderStyle: 'solid',fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column'},
        titleView:{textAlign: 'center',flexDirection: 'column',gap:2},
        pdfView:{overflow:true}

    })


    return(
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm border flex justify-center items-center" onClick={handleClose} id="wrapper">
            <div className='flex flex-col justify-center items-center m-2'>
            
            <button className="text-white text-xl" onClick={()=>onClose()}>
                close
            {/* <IoClose size={30} color='black'/> */}
            </button>

            <PDFViewer width="1000" height="650">
                <Document>
                    <Page size="A4" style={styles.page}>
                        {/* PAYSLIP TITLE */}
                        <View style={styles.titleView}>
                            <Text>Whence Financial Services</Text>
                            <Text>Payslip</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
            {/* <GenericPdfDownloader 
          downloadFileName="CustomPdf" 
          rootElementId="payslip" 
        />
        <button onClick={generateTemplatePdf}>Generate PDF</button>
                                    
            <div onClick={handleClose} id="wrapper">
                <div id='payslip' className='border tracking-normal' ref={payslipTemplateRef} >
                <h1>Learning Computer Science</h1>
                <PayslipTemplate/>
                </div>

                
            </div> */}
            </div>
        </div>
    )
}

export default Modal;