import app from "./app"
import { createRecipes } from "./Endpoints/createRecipes";
import { getRecipesId } from "./Endpoints/getRecipesId";
import { getUser } from "./Endpoints/getUser";
import { getUserId } from "./Endpoints/getUserId";
import { login } from "./Endpoints/login";
import { signup } from "./Endpoints/signup";
import { HashManager } from "./services/HashManager";

// const hash = new HashManager().createHash("bananinha")

// console.log(hash);
app.get("/recipe/:id", getRecipesId)
app.get("/user/:id", getUserId)
app.get("/user", getUser)
app.post("/users/signup", signup)
app.post("/users/login", login)
app.post("/Recipes", createRecipes)
