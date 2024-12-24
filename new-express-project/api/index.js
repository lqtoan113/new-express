const express = require("express");
const fs = require("fs/promises");
const app = express();
const port = 3000;


app.use(express.json());

const filePath = "data.json" // File chứa dữ liệu

// let employees = {
//     empId: "EM01",
//     empName: "EmployeeName",
//     empBirthday: 123
// };

// Read data from file
async function readData(){
    try{
        const data = await fs.readFile(filePath,"utf-8");
        return JSON.parse(data);
    }catch(err){
        console.error("Cannot reading file:",err);
        return [];
    }
}
// Write data to file
async function writeData(data){
    try{
        await fs.writeFile(filePath, JSON.stringify(data, null, 2),"utf-8");
        console.log("Data succesfully updated!");
    }catch(err){
        console.error("Cannot writing to the file:",err);
    }
}
// Get One
app.get('/:empId',async(req,res)=>{
    const {empId} = req.params;
    const employees = await readData();
    const employee = employees.find((emp)=>emp.empId === empId); 

    if(!employee)
        return res.status(404).json({error:'Employee not found'});
    res.status(200).json(employee);
    
});
// Get all
app.get('/',async(req,res)=>{
    const employees = await readData();
    res.status(200).json(employees);
});
// Create New
app.post('/', async (req,res)=>{
    const employeeToAdd = req.body;
    const employees = await readData();
    
    //Check the same
    // if(employees.some((emp)=> emp.empId === employeeToAdd.empId)){
    //     return res.status(400).json({error:"Employee ID already exists"});
    // }
  // Check Empid 
    const duplicateEmpIds = employeeToAdd.filter(empToAdd => 
        employees.some(existingEmp => existingEmp.empId === empToAdd.empId)
    );

    if (duplicateEmpIds.length > 0) {
        return res.status(400).json({error: "Employee already exist!"});
    }

    employees.push(...employeeToAdd);
    await writeData(employees);
    
    res.status(200).json(employeeToAdd);
});
// Create Multiple 
app.post('/multiple', async (req, res) => {
    const employeesToAdd = req.body; 
    const employees = await readData();

    // Check Empid 
    const duplicateEmpIds = employeesToAdd.filter(empToAdd => 
        employees.some(existingEmp => existingEmp.empId === empToAdd.empId)
    );

    if (duplicateEmpIds.length > 0) {
        return res.status(400).json({
            error: "Have one or more Employee ID already exist!",
            duplicateEmpIds: duplicateEmpIds.map(emp => emp.empId)
        });
    }

    // Add new employees to list
    employees.push(...employeesToAdd);
    await writeData(employees);

    res.status(200).json({
        message: `${employeesToAdd.length} employee update successfully`,
        addedEmployees: employeesToAdd
    });
});


// Update One
app.put('/:empId',async(req,res)=>{
    const {empId} = req.params;
    const {empName,empBirthday}= req.body;
    const employees = await readData();
    const employee = employees.find((emp)=>emp.empId === empId); 

    if(!employee)

        return res.status(404).json({error:'Employees not found!'});

    else

        if (empName) employee.empName = empName;
        if (empBirthday) employee.empBirthday = empBirthday;

        await writeData(employees);
        res.status(200).json(employee);
    
});

//Delete One
app.delete('/:empId',async (req,res)=>{
    const {empId} = req.params;
    const employees = await readData();
    const updatedEmployees = employees.filter((emp) => emp.empId !== empId);

    if(employees.length === updatedEmployees.length){
        return res.status(404).json({error:'Employees not found!'});
    }
    await writeData(updatedEmployees);
    res.status(200).json({message:'Employee deleted succesfully'});
});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;