

export default function(){



    return(<>
        <h1>Login</h1>
        <form >
            <input 
                type="text"
                placeholder="Email" 
            />
            <input 
                type="password"
                placeholder="Password" 
               
            />
            {/* {loginError !== null && <div className="error">{loginError.message}</div>}
            {loginError?.errors && loginError.errors.map( (err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
            ))} */}
            <button>Accedi</button>
        </form>
    </>)

}
