import React, { useCallback, useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {  Button, Container, Form} from 'react-bootstrap'
import useHttp from '../hooks/http.hook'
import Loader from '../components/Loader'
import TableCard from '../components/Table'

export const MainPage = () => {
    const {request, loading} = useHttp()
    const[data, setData] = useState([])

    const getTable = useCallback(async () =>{
        try {
            const fetched = await request('/api', 'GET', null)
            setData(fetched)
            // console.log(fetched)
        } catch (e) {}
    }, [request])

    useEffect(()=>{
        getTable()
    }, getTable)


    if(loading){
        return <Loader/>
    }
    try {
        if(data[0].error){
            return(
                <Container className="mt-5 " fluid>
                    <Button block disabled>Ошибка данных</Button>     
                </Container>
            )
        }
    } catch (error) {
        
    }
    
    return(
        <Container className="mt-5" fluid>
            <TableCard data = {data}/>              
        </Container>

        
    )
}