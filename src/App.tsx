import { FormEvent, useState, } from "react";
import {
  Loader,
  Placeholder,
  RadioGroupField,
  Radio,
  Button
} from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});


const setLocalStorage = (value:string)=>
{
  localStorage.setItem('defaultDietType', value);
}

const getLocalStorage = ()=> localStorage.getItem('defaultDietType') || "Any";

  

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);



  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {

      const formData = new FormData(event.currentTarget);
 
      let diet = formData.get("Diet")?.toString() || "";

      setLocalStorage(diet);

      if(diet === "Any") diet = "";

      const temp = `${formData.get("ingredients")?.toString() || ""} ${diet}`; 

      console.log(temp)

      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: [temp],
      });

      if (!errors) {
        setResult(data?.body || "No data returned");
      } else {
        console.log(errors);
      }
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">Larder Ai</h1>
        <p className="description">
          Simply type a few ingredients using the format ingredient1,
          ingredient2, etc., and Larder Ai will generate an all-new recipe on
          demand...
        </p>
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <RadioGroupField legend="" name="Diet" direction="row" defaultValue={getLocalStorage()}>
            <Radio value="Any">Any</Radio>
            <Radio value="Vegan">Vegan</Radio>
            <Radio value="Vegetarian">Vegetarian</Radio>
          </RadioGroupField>

          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder="Ingredient1, Ingredient2, Ingredient3,...etc"
          />
          <Button type="submit" variation="primary" colorTheme="overlay">
            Get Recipe
          </Button>
        </div>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          result && <p className="result">{result}</p>
        )}
      </div>
      <footer>v1 by Michael Phillips <a href="http:\\www.area2.co.uk">home</a></footer>
    </div>
  );
}

export default App;
