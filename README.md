# Meal Prep Service

An AI service to redefine home cooking for fitness enthusiasts. 

Currently people who meal prep 
    1. Take a lot of time to build plans with their macro nutrition needs.
    2. Resort to bland, raw recipes. 

An AI kitchen helper would be a game changer to speed up the meal plan process and provide much more creative meals.

## MVP

- Allow a user to have an account
- Allow users to enter their macro needs (Keep simple with cals and protein for now) on their account
- Allow users to create new plans
- Allow users to create new meals
- When creating new meals, give recipe ideas through a selection of prompts
    1. Surprise me
    2. Mediterranean, Indian, etc...
    3. Enter your own prompt
- Let user build their week plan from list
- Compile plan
    - get list of ingredients
    - get nutritional facts
    - portion each meal to macro needs based on grams and ml
    - create recipe to cook meal (keep recipes very simple. Add in to prompt to keep steps limited)
    - create grocery list of what is needed
- Give user week view of their meals
    - allow each meal to be an item they can drill into to see recipe, macros, and grocery list
- Give one big list of groceries

## TO-DO

- Front end:
    1. User signup, login, logout, forget password
    2. User macro panel
    3. User exisiting plans
    4. User exisiting meals
    5. User plan creation
    6. User meal creation
    7. Grocery list
- Backend:
    1. Create user Auth, emailing and such
    2. Create relation Diagram for data structure
    3. REST api for plans (GET, POST, PATCH, DELETE)
    4. REST api for meals (GET, POST, PATCH, DELETE)
    5. REST api for grocery list?
    6. REST api for user macros

- Bizz Logic Single meal (what matters):
    1. create prompt structure for user input (COT?)
    2. Generate list of meal descriptions / ideas
    2. create list of ingredients from idea selected
    3. get nutritional facts (RAG)
    4. Create recipe from the idea, keeping it simple
    5. Portion each meal to macro needs based on data. user grams and ml (LLM to calculator?)
    6. Based on recipe and portions, make a list of grocery for the meal

- Bizz logic plan:
    1. Repeat single meal logic at scale
