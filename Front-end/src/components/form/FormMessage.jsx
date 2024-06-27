

export default function(){



    return(<>
        <h1>Login</h1>
        <form >
            <input 
                type="text"
                placeholder="Email" 
            />
            <textarea 
                type="text"
                placeholder="messaggio" 
               
            />
            {/* {loginError !== null && <div className="error">{loginError.message}</div>}
            {loginError?.errors && loginError.errors.map( (err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
            ))} */}
            <button>Invia</button>
        </form>
    </>)

}
