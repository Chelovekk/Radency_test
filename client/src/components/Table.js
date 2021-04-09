import React from 'react'
import {Container, Table} from 'react-bootstrap'

export default function TableCard({data}) {
    console.log(data)
    return(
        <Container class="mt-5">
            <Table  variant="dark" striped>
                <thead>
                    <tr>
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
                    {data.map((data)=>{
                        if(data.age<=21){
                            var l={
                                backgroundColor : 'red'
                            }
                        }
                        return(
                            <tr>
                                <td>{data.full_name}</td>
                                <td>{data.phone}</td>
                                <td>{data.email}</td>
                                <td style={l}>{data.age}</td>
                    
                                <td>{data.experience}</td>
                                <td>{data.yearly_income}</td>
                                <td>{data.has_children}</td>
                                <td>{data.license}</td>
                                <td>{data.expiration}</td>
                                <td>{data.license_number}</td>
                                <td>{data.duplicate_with}</td>

                        
                            </tr>
                        )
                        
                    })}
                </tbody>
            </Table>
        </Container>
    )
}