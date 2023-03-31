import axios from 'axios';
export default class GetData {

    constructor(){
        this.searchQuery = '';
        this.page = 1;
        this.PER_PAGE = 40;

    }
  
    async onFetch(){
        const options = {
            method: 'get',
            url: "https://pixabay.com/api/",
            params: {
              key: '34891295-3c871ab0268d353f15c88782f',
              q: this.searchQuery,
              image_type: 'photo',
              orientation: 'horizontal',
              safesearch: true,
              page: `${this.page}`,
              per_page: `${this.PER_PAGE}`,
            }
          }

        try {
            const response = await axios(options);
            const data = response.data;
            this.incrementPage();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get inputValue(){
        return (this.searchQuery);
    }

    set inputValue(input){
        this.searchQuery = input;
    }
  }