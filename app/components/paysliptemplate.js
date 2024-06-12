export default function PayslipTemplate({}){
    return(
        
       
<div className="bg-white w-full border">
<h3 className="text-center">Whence Financial Services</h3>
<h3 className="text-center">Payslip</h3>
<table>
<tr>
<th>Employee Name</th>
<td>Andyson Mupeta</td>
<th>Payroll Date</th>
<td>Mon, Jan 24th</td>
</tr>
<tr>
<th>Company Name</th>
<td>Whence Financial Services</td>
</tr>
</table>

<table className=" w-full">
<div className="flex items-start border">

  
    <table className="w-2/4">

<tbody>
<tr>
<th>Description</th>
<th>Amount</th>
</tr>

<tr>
<td>Basic Pay</td> 
<td>8000</td>
</tr>

<tr>
<td>Allowances</td> 
<td>8000</td>
</tr>

<tr>

</tr>
</tbody>

</table>
   


   
    <table className="w-2/4">

<tbody>
<tr>
<th>Description</th>
<th>Amount</th>
</tr>

<tr>
<td>Advance Deductions</td> 
<td>8000</td>
</tr>

<tr>
<td>Penalties/Charges</td> 
<td>8000</td>
</tr>


<tr>
<td>NAPSA</td> 
<td>8000</td>
</tr>


<tr>
<td>PAYE</td> 
<td>8000</td>
</tr>


<tr>
<td>NHIMA</td> 
<td>8000</td>
</tr>

<tr>

</tr>
</tbody>

</table>



</div>




</table>


<table className="border w-full">
<tbody>
<tr>
  <th>
  Net Pay Distribution
    </th> 
    </tr>
<tr>
    <td>Payment Method</td>
    <td>Bank Name</td>
    <td>Account #</td>
    <td>Description</td>
    <td>Paid Amount</td>
</tr>
<tr>
    <td>Bank</td>
    <td>Absa</td>
    <td>1234</td>
    <td>Description</td>
    <td>8000</td>
</tr>
</tbody>
</table>

<div className="border">
<p>
"Whence Financial Services strives for accuracy in all pay-related matters. If you notice any
discrepancies, please let your immediate supervisor know right away."
</p>
</div>

</div>
   
    )
}