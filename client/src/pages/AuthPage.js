import React, { useCallback, useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {  Button, Container, Form} from 'react-bootstrap'
import useHttp from '../hooks/http.hook'
import Loader from '../components/Loader'
import TableCard from '../components/Table'

export const AuthPage = () => {
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

    return(
        <Container fluid>
            <TableCard data = {data}/>              
        </Container>

        
    )
}