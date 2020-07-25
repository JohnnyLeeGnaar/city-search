Description:

A single page JS application that lists and filters Croatian cities by user input and shows them on a map as dots.

The list of cities is initially empty, but it gets populated as the user types into the input element. The input element will have two additional radio buttons ("prefix" and "sufix") for specific Regexp queries that begin or end with the user typed string. It will do a country wide filter and display them on the map using their latitude and longitude coordinates.

The returned filtered list will be sorted by population and which County the City belongs to.

After the filter, display and map functionality is implemented there will be an additional update to the list, where a user can click on a city name and get additional information (description, size, population, coat of arms) directly pulled from wikipedia.

The application will be built using HTML, CSS and JS. List of cities will be pulled from the Geonames web service The map will be displayed in a canvas with the mappa.js plugin
