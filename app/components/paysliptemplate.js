import { Image, Text, View, Page, Document, StyleSheet, PDFViewer, Font} from '@react-pdf/renderer';

export default function PayslipTemplate({Name,grossPay,NAPSA,NHIMA,PAYE,ALLOWANCES, DEDUCTIONS,CHARGES,NET_PAY,DATE}){

    Font.register({
        family: 'Roboto',
        src: '/Roboto-Bold.ttf',
        format: 'truetype', 
      });
    

    const styles = StyleSheet.create({
        
        page:{borderStyle: 'solid',fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column'},
        titleView:{textAlign: 'center',flexDirection: 'column',gap:2,alignItems:'center'},
        logo:{width:50},
        pdfView:{overflow:true},
        table1:{borderWidth:1,padding:20,marginTop:20},
        table1FirstRow:{flexDirection:'row',justifyContent:'space-evenly',},
        table1SecondRow:{flexDirection:'row',justifyContent:'space-evenly'},
        table2:{borderWidth:1,flexDirection:'row',justifyContent:'space-evenly',gap:4,marginTop:20},
        table3:{borderWidth:1,flexDirection:'column',justifyContent:'space-evenly',gap:4,marginTop:1},
        table4:{borderWidth:1,flexDirection:'column',justifyContent:'space-evenly',gap:4,marginTop:20,padding:20},
        table5:{borderWidth:1,flexDirection:'column',justifyContent:'space-evenly',gap:4,marginTop:20,padding:20},
        tableColumn1:{flexDirection:'column',gap:8,padding:10,textOverflow:'ellipsis',width:'100%',borderRight:1},
        tableColumn2:{flexDirection:'column',gap:8,padding:10,textOverflow:'ellipsis',width:'100%',borderLeft:1},
        longWords:{textOverflow:'ellipsis'},
        row:{flexDirection:'row',justifyContent:'space-between'},
        row2:{flexDirection:'row',justifyContent:'space-between',padding:2},
        tableHeader:{flexDirection:'row',justifyContent:'space-between',padding:1,borderBottom:1},
        column:{flexDirection:'column',justifyContent:'space-evenly'},
        tableText:{margin:5},
        boldText: { fontFamily: 'Roboto' },
        totalPay:{flexDirection:'row',justifyContent:'space-between',padding:2},
        table4Header:{padding:4},
        headerText:{fontWeight:'bold'}

    })

    return(
        <Document>
            <Page size="A4" style={styles.page}>
                {/* PAYSLIP TITLE */}
                <View style={styles.titleView}>
                    <Image style={styles.logo} src='/logo.png'/>
                    <Text>Whence Financial Services</Text>
                    <Text>Payslip</Text>
                </View>
                <View style={styles.table1}>
                    <View style={styles.table1FirstRow}> 
                        <Text>Employee Name</Text>
                        <Text style={styles.boldText}>{Name}</Text>
                        <Text>Payroll Date</Text>
                        <Text style={styles.boldText}>{DATE}</Text>
                    </View>

                </View>
                <View style={styles.table2}>
                  
                    <View style={styles.tableColumn1}>
                        <View style={styles.tableHeader}>
                        <Text>Description</Text>
                        <Text>Amount</Text>
                        </View>
                       
                        <View style={styles.row}>
                        <Text>Basic Pay</Text>
                        <Text style={styles.boldText}>{grossPay}</Text>
                        </View>
                        <View style={styles.row}>
                        <Text>Performance Allowance</Text>
                        <Text style={styles.boldText}>{ALLOWANCES}</Text>
                        </View>
                       
                    </View>

                    <View style={styles.tableColumn2}>
                        <View style={styles.tableHeader}>
                        <Text>Description</Text>
                        <Text>Amount</Text>
                        </View>
                        <View style={styles.row}>
                        <Text>Salary Advance Deduction</Text>
                        <Text style={styles.boldText}>{DEDUCTIONS}</Text>
                        </View>
                        <View style={styles.row}>
                        <Text>Penalty Deductions</Text>
                        <Text style={styles.boldText}>{CHARGES}</Text>
                        </View>
                        <View style={styles.row}>
                        <Text>NAPSA</Text>
                        <Text style={styles.boldText}>{NAPSA}</Text>
                        </View>
                        <View style={styles.row}>
                        <Text>PAYE</Text>
                        <Text style={styles.boldText}>{PAYE}</Text>
                        </View>
                        <View style={styles.row}>
                        <Text>NHIMA</Text>
                        <Text style={styles.boldText}>{NHIMA}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.table3}>
                <View style={styles.totalPay}>
                    <Text>Total Pay</Text>
                    <Text style={styles.boldText}></Text>
                </View>
                
                <View style={styles.totalPay}>
                    <Text>Total Deductions</Text>
                    <Text style={styles.boldText}></Text>
                </View>

                 
                <View style={styles.totalPay}>
                    <Text>Net Pay</Text>
                    <Text style={styles.boldText}>{NET_PAY}</Text>
                </View>

                </View>

                <View style={styles.table4}>
                    <View style={styles.table4Header}>
                        <Text style={styles.boldText}>Net Pay Distribution</Text>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.column}>
                            <Text>Payment Method</Text>
                            <Text></Text>
                        </View>
                        <View style={styles.column}>
                            <Text>Bank Name</Text>
                            <Text></Text>
                        </View>
                        <View style={styles.column}>
                            <Text>Account Number</Text>
                            <Text></Text>
                        </View>
                        <View style={styles.column}>
                            <Text>Description</Text>
                            <Text></Text>
                        </View>
                        <View style={styles.column}>
                            <Text>Paid Amount</Text>
                            <Text></Text>
                        </View>
                    </View>
                </View>

                <View style={styles.table5}>
     
                    <Text style={styles.boldText}>
                        Comments</Text>
                  
                    <Text>Whence Financial Services strives for accuracy in all pay-related matters. If you notice any
discrepancies, please let your immediate supervisor know right away.</Text>
                </View>
    
            </Page>
        </Document>

   
    )
}