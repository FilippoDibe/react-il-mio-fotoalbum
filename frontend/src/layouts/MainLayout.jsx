import Nav from "../components/navbar/Nav.jsx"
import Footer from "../components/footer/Footer.jsx"
import Jumbo from "../components/jumbotron/Jumbo.jsx"

const MainLayout = ({children}) =>{
    return (
        <>
         <Nav/>
         <Jumbo/>
         <div>
            {children}
         </div>
         <Footer/>

        </>
       

    )
}
export default MainLayout 