import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Header from "./Header"
import Home from '../pages/Home/Home'
import React, { useState,useEffect } from 'react';

function Layout() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            setIsMobile(true)
         }else{
             setIsMobile(false)
         }
    }, [isMobile])
   

    return (
        <Router>
            {isMobile && <Header /> }
            <Switch>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
  }
  
export default Layout;