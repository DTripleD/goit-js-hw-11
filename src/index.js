


function getData(){
    const API_KEY = '34891295-3c871ab0268d353f15c88782f';

    return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json())
    // when markap will be done use lower return !!!!!!!!!!!
    // return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json())
}


getData().then((data) => {

    return data;
}).then((d) => {
    return d.map(({likes}) => {
        return console.log(likes)})
});

