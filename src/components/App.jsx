// import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";
import axios from 'axios';
import Loader from 'components/Loader/Loader.jsx'
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import ImageGallery from 'components/ImageGallery/ImageGallery.jsx';
import Searchbar from 'components/Searchbar/Searchbar.jsx'
import css from 'components/styles.css';



export class App extends Component {

  state = {
    picturies: [],
    page: 1,
    loading: false,
    error: null,
    searchName: ''
  }

  // componentDidMount() {
  //     this.fetchPictures()
  // }

   componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
     const { searchName, page } = this.state;
     console.log('prevState.searchName', prevState.searchName);
        if (prevState.searchName !== searchName) {
          console.log('New pictury');
          console.log('newsearch', searchName);
          console.log('prevState.searchName', prevState.searchName);
    
            this.fetchPictures();
        }
    }
  
  fetchPictures() {
    const { page, searchName } = this.state;
    this.setState({
      loading: true,
    });
  
    axios.get(`https://pixabay.com/api/?key=29134253-bbfb6b627ddeed17a742fb71a&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${searchName}`)
      .then(({ data }) => {
        console.log(data)
        console.log(Object.values(data.hits))
        const newPicturies = Object.values(data.hits);
        // console.log(this.state.picturies);
        this.setState(({ picturies }) => {
          return {
            picturies: [...picturies, ...newPicturies]
            
          }
        })
        
  })

  
      .catch(error => {
        this.setState({
        error
      })
    })
    .finally(() => this.setState({loading: false}))
    
    
  }
 onSearch = searchName => {
        this.setState({
            searchName,
        })
   console.log('search', searchName);
    }

  loadMore = (page) => {
    this.setState(({ page }) => {
      return {
        page: page + 1
      }
    })
  
  }
  
  render() {
    const { picturies, loading, error } = this.state;
    const { onSearch, loadMore } = this;
    const isPictury = Boolean(picturies.length);
    console.log('pictury', picturies);
    console.log('loading', loading);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSearch} />
        {loading && <Loader />}
        {error && <p>Будь ласка спробуйте ще раз...</p>}
        {isPictury && <ImageGallery items={picturies} />}
        {isPictury && <button className={css.Button} type='button' onClick={loadMore}>Load more</button>}
      </div>
    );
  };
};
