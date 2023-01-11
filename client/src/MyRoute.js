import {BrowserRouter ,Switch,Route} from "react-router-dom"
import App from "./App"
import FromComponent from "./components/FromComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import AdminRoute from "./AdminRoute"
const MyRoute=()=> {
 
    return (
      <BrowserRouter>   
        <Switch>
           
            <Route path="/" exact component={App}></Route>
            <AdminRoute path="/create" exact component={FromComponent}></AdminRoute>
            <Route path="/blog/:slug" exact component={SingleComponent}></Route>
            <AdminRoute path="/blog/edit/:slug" exact component={EditComponent}></AdminRoute>


            <Route path="/login" exact component={LoginComponent}></Route>
            
        </Switch>
      </BrowserRouter>
    )
}

export default MyRoute
