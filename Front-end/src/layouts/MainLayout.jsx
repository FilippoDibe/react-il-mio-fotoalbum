import Nav from "../components/nav/Nav";

const MainLayout = ({ children }) => {
    return (
        <>
            <Nav />
            {children}
        </>
    );
}

export default MainLayout;
