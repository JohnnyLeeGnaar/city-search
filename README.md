Description:

A single page JS application that lists and filters Croatian cities by user input and shows them on a map as dots.

The list of cities is populated, but it gets filtered as the user types into the input element. It will do a country wide filter and display them on the map using their latitude and longitude coordinates.

The returned filtered list can be sorted by population, name or county depending which header was clicked on.

If a user clicks on a city name he can get additional information in the shape of a modal that has an embbeded iframe which directly renders the wikipedia article of the clicked city in question.

The application will be built using React, HTML and CSS. List of cities is currenty in a mock/utils. React Simple Maps is used to render and populate the map. Iframes to render the wiki articles
