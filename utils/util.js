/**
 * Sort movies by release date
 */
exports.sortMoviesByReleaseDate =  (movies) => {   
    return movies.sort((a, b) => {
        return  new Date(b.release_date) - new Date(a.release_date);
    });
};

/**
 * Get the integer from URL
 */
exports.extractMovieId = (url) => parseInt(url.replace(/[\D]/g, ''));

/**
 * Check if a movie with a given Id is found
 */
exports.checkMovieExist = (movies, movie_id) => {
    const result = movies.find(element => {
        const id = this.extractMovieId(element.url)
        if(id == movie_id) {
            return true;
        }

        return false;
    });

    return result;
};

/**
 * Sort movie characters by given parameters
 */
exports.sortCharacters = async (characters, sortBy, gender, order) => {
    //Check if sortBy is height 
    const movieData = (sortBy === 'height') ? this.sortByheight(characters, sortBy) : characters;
    const sortedData = this.sortAsc(movieData, sortBy);
    const sortedDataOrder = order && order === 'desc' ? [...sortedData].reverse() : sortedData;
    const filterData = gender ? this.fiterByGender(sortedDataOrder, gender) : sortedDataOrder;

    return filterData;
};

/**
 * Sort characters by height
 */
exports.sortByheight = (characters, sortBy) => {
    if (isNaN(characters[0][sortBy]) === false) {
        const newArr = characters.map((character) => {
            return Object.assign(character, { [sortBy]: character[sortBy] });
        });
        return newArr;
    }

    return characters;
    
};

/**
 * Sort character in ASC
 */
exports.sortAsc = (array, sortBy) => {
    return array.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
    });
};

/**
 * Filter Characters by gender
 */
exports.fiterByGender = (characters, gender) => {
    return characters.filter((character) => {
        return character.gender === gender.toLowerCase();
    });
};

/**
 * Convert centimeter to feet and inches
 */
exports.convertCentimeterToFeetAndInches = (totalHeight) => {
    const feet = Math.floor(totalHeight * 0.0328084);
    const inches = ((totalHeight * 0.393700787) % 12).toFixed(2);

    return `${totalHeight}cm (${feet}ft and ${inches} inches)`;

}
