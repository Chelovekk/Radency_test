import React, {useState} from 'react'
import {Button, Container, Table} from 'react-bootstrap'

export default function TableCard({data}) {
    const [isGood, setIsGood] = useState(true)
    console.log(data)
    return(
    
        <Container class="mt-5">
            <Table  variant="dark" striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Experience</th>
                        <th>Yearly Income</th>
                        <th>Has children</th>
                        <th>License states</th>
                        <th>Expiratin date</th>
                        <th>License number</th>
                        <th>Duplicate with</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((info)=>{
                        //Check AGE
                        if(info.age<21){
                            var ageStyle={
                                backgroundColor : 'red'
                            }
                        }
                        //CHECK PHONE
                        if(info.phoneMistake){
                            var phoneStyle = {
                                backgroundColor : 'red'
                            }
                        }
                        //CHEK EXPIRIENCE
                        if(info.experience<1 || info.experience>info.age){
                            var experienceStyle={
                                backgroundColor:'red'
                            }
                        }
                        //Yearly_income
                        if(info.yearly_income>=1000000){
                            var incomeStyle={
                                backgroundColor:'red'
                            }
                        }
                        //License
                        if(info.license_number.length<6){
                            var license_numberStyle={
                                backgroundColor:'red'
                            }
                        }
                        // DATA
                            let l = info.date.split('-')
                            let now = new Date()
                            let date = new Date(l[0],l[1],l[2])
                            if(now>date){
                                var dateStyle={
                                    backgroundColor:'red'
                                }
                            }


                        return(
                            <tr>
                                <td>{info.id}</td>
                                <td>{info.full_name}</td>
                                <td style={phoneStyle}>{info.phone}</td>
                                <td>{info.email}</td>
                                <td style={ageStyle}>{info.age}</td>
                    
                                <td style={experienceStyle}>{info.experience}</td>
                                <td style={incomeStyle}>{ parseFloat(info.yearly_income).toFixed(2)}</td>
                                <td>{info.has_children}</td>
                                <td>{info.license}</td>
                                <td style={dateStyle}>{info.date}</td>
                                <td style={license_numberStyle}>{info.license_number}</td>
                                <td>{info.duplicate_with}</td>

                        
                            </tr>
                        )
                        
                    })}
                </tbody>
            </Table>
        </Container>
    )
}