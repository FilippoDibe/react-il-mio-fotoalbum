

const Form = ({ onAddArticle }) => {


  return (
    <div>
      <form >
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Titolo del blog"
            
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            placeholder="URL dell'immagine"
            
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="Contenuto del blog"
            
          ></textarea>
        </div>
        <div className="form-group checkbox-group">
          <p>Categorie:</p>
            <label >
              <input
                type="checkbox"
                name="tags"
               
              />
            </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="published"
             
            />
            Pubblicato
          </label>
        </div>
        <button>Salva</button>
      </form>
    </div>
  );
}

export default Form;