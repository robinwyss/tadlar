import _ from 'lodash'

export const getAbstract = (url) => {
    var parts = _.split(url, '/');
    var title = _.last(parts);

    return fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=explaintext&format=json&origin=*&titles='+title)
        .then((response)=>{
            if (response.ok) {
                return response.json();
            } else {
                throw "An error occured"; // TODO: better error handling 
            }
        });
}