import React, { useCallback, useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {  Button, Container, Form} from 'react-bootstrap'
import useHttp from '../hooks/http.hook'
import Loader from '../components/Loader'
import TableCard from '../components/Table'

export const MainPage = () => {
    //Хук для post/get запросов
    const {request, loading} = useHttp()
    //данные с сервера
    const[data, setData] = useState([])

    //функция для запроса на сервер
    const getTable = useCallback(async () =>{
        try {
            const fetched = await request('/api', 'GET', null)
            setData(fetched)
            // console.log(fetched)
        } catch (e) {}
    }, [request])

    //при любых изменениях на странице данные обновляються т.е, если в дальнейшем делать возможность добавлять кандидатов страница автоматичестки будет обновляться
    useEffect(()=>{
        getTable()
    }, getTable)

    // флаг из хука useHttp, если true на странице видно только компонент Loader
    if(loading){
        return <Loader/>
    }
    // Так как  сервер get запросом отдает массив, а два обьекта отправить не нашёл способа, используеться костыль для отображения ошибки, если имя, телефон или email пустые  
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