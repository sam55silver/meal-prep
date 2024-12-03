from langchain_core.prompts import ChatPromptTemplate

detailed_template = ChatPromptTemplate([
    ("system", "Search for {dish_type} recipes using {ingredients}. They should be {cuisine} style, \
        {dietary_restrictions}, and take {prep_time} to prepare. Include {cooking_method} instructions \
        and yield {servings} servings. Provide links to full recipes and cooking tips."),
])

# EXAMPLE: 
# Input parameters for the recipe search
# query_params = {
#     "dish_type": "dessert",
#     "ingredients": "chocolate and strawberries",
#     "cuisine": "French",
#     "dietary_restrictions": "gluten-free",
#     "prep_time": "under 30 minutes",
#     "cooking_method": "no-bake",
#     "servings": 4,
# }
# # Generate the prompt using invoke
# search_query = detailed_template.invoke(query_params)
# message = search_query.messages[0].content


simple_template = ChatPromptTemplate([
    ("system", "Search for recipes based on user input. "
               "Provide detailed instructions, include key ingredients, preparation steps, "
               "and links to full recipes. Tailor the results to common preferences such as "
               "prep time, cuisine type, and dietary considerations whenever relevant."),
    ("user", "{user_input}")
])
