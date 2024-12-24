const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let employees = {
    empId: "EM01",
    empName: "EmployeeName",
    empBirthday: 123
};

// Get all
app.get('/',(req,res)=>{
    res.json(Object.values(employees));
});
// Create New
app.post('/create',(req,res)=>{
    const {empId, empName, empBirthday} =req.body;

    if(employees[empId]){
        return res.status(400).json({ error: 'Employee ID already exists' });
    }
    employees[empId] = {empId, empName, empBirthday};
    res.status(200).json(employees[empId]);

});
// Get One
app.get('/employees/:empId',(req,res)=>{
    const {empId} = req.params;

    if(!employees[empId])
        return res.status(404).json({error:'Employee not found'});
    
    res.status(200).json(employees[empId]);
    
});
// Update One
app.put('/employees/:empId',(req,res)=>{
    const {empId} = req.params;
    const {empName,empBirthday}= req.body;
    // const empName = req.body.empName;
    // const empBirthday = req.body.empBirthday;

    if(!employees[empId])
        return res.status(404).json({error:'Employees not found!'});
    else
        if (empName) employees[empId].empName = empName;
        if (empBirthday) employees[empId].empBirthday = empBirthday;
        res.json(employees[empId]);
    
});

//Delete One
app.delete('/delete/:empId',(req,res)=>{
    const {empId} = req.params;

    if(!employees[empId]){
        return res.status(404).json({error:'Employees not found!'});
    }
    delete employees[empId];
    res.json({message:'Employee deleted succesfully'});
});
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
module.exports = app;
