/**
 * Sort movies by release date
 */
exports.sortMoviesByReleaseDate =  (movies) => {   
    try{
        return movies.sort((a, b) => {
            return  new Date(b.release_date) - new Date(a.release_date);
        });
    }catch(err) {
        return Promise.reject(err);
    }  
};

/**
 * Get the integer from URL
 */
exports.extractMovieId = (url) => parseInt(url.replace(/[\D]/g, ''));

/**
 * Check if a movie with a given Id is found
 */
exports.checkMovieExist = (movies, movieId) => {
    let result = movies.find(element => {
        let id = this.extractMovieId(element.url)
        if(id == movieId) {
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
    try {
        //Check if sortBy is height 
        const movieData = (sortBy === 'height') ? this.sortByheight(characters, sortBy) : characters;
        let sortedData = this.sortAsc(movieData, sortBy);
        sortedData = order && order === 'desc' ? [...sortedData].reverse() : sortedData;
        sortedData = gender ? this.fiterByGender(sortedData, gender) : sortedData;

        return sortedData;

    }catch(err) {
       return Promise.reject(err);
    }
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
    try {
        return characters.filter((character) => {
            return character.gender === gender.toLowerCase();
        });
    }catch (e) {
        return Promise.reject(e);
    }
};

/**
 * Convert centimeter to feet and inches
 */
exports.convertCentToFeetIn = async (characters) => {
    const totalHeight = await characters.reduce((total, current) => {
        total += isNaN(current.height) ? 0 : parseInt(current.height);
        return total;
    }, 0);

    const feet = Math.floor(totalHeight * 0.0328084);
    const inches = ((totalHeight * 0.393700787) % 12).toFixed(2);

    return `${totalHeight}cm (${feet}ft and ${inches} inches)`;

}
