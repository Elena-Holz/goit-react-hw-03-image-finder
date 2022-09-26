// import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";
import axios from 'axios';
import Loader from 'components/Loader/Loader.jsx'
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import ImageGallery from 'components/ImageGallery/ImageGallery.jsx';
import Searchbar from 'components/Searchbar/Searchbar.jsx'; 
import Button from 'components/Button/Button.jsx';
import Modal from 'components/Modal/Modal.jsx';
import css from 'components/styles.module.css';



export class App extends Component {

  state = {
    picturies: [],
    page: 1,
    loading: false,
    error: null,
    searchName: '',
    showModal: false,
  }

  componentDidMount() {
  
    const { searchName } = this.state;
    console.log(searchName);
      if (searchName !== '') {
      this.fetchPictures();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
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
        const newPicturies = Object.values(data.hits);
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
      
      .finally(() => this.setState({ loading: false }))
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

  // openModal = () => {
  //   this.setState((showModal) => ({
  //     showModal: !this.state.showModal,
    
  //   }))
  // }

      openModal = () => {
        this.setState({
           showModal: true,
           
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
           
        })
    }

  render() {
    const { picturies, loading, error, showModal } = this.state;
    const { onSearch, loadMore, openModal, closeModal } = this;
    const isPictury = Boolean(picturies.length);
    console.log('pictury', picturies);
    console.log('loading', loading);
    return (
      <div className={css.App}>
        <button className={css.Button} onClick={openModal} type='button'>openModal</button>
        {showModal && <Modal picturies={picturies}  onClose={closeModal}>
          
        </Modal>}
        <Searchbar onSubmit={onSearch} />
        {loading && <Loader />}
        {error && <p>Будь ласка спробуйте ще раз...</p>}
        {isPictury && <ImageGallery items={picturies} openModal={openModal} />}
        {isPictury && <Button loadMore={loadMore} text='Load more' />}
      </div>
    );
  };
};
