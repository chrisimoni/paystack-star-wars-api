exports.sortMoviesByReleaseDate =  (movies) => {   
    try{
        return movies.sort((a, b) => {
            return  new Date(b.release_date) - new Date(a.release_date);
        });
    }catch(err) {
        return Promise.reject(err);
    }  
};

exports.extractMovieId = (url) => parseInt(url.replace(/[\D]/g, ''));
