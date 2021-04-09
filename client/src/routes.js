import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated =>{
    
    return(
        <Switch>
            <Route path = "/" exact> 
            <AuthPage/>
             </Route>
             <Route path = "/auth" exact> 
                 <AuthPage/>
             </Route>
             <Redirect to = "/"/>
        </Switch>
    )
}
