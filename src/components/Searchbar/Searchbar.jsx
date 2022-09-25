import { Component } from "react";
import css from 'components/Searchbar/Searchbar.module.css';


export default class Searchbar extends Component {
    state = {
        searchName: ''
    };


handleChange = (e) => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() })
   
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchName.trim() === '') {
            alert('Enter request name')
            return;
        }
        // const { onSubmit } = this.props;
        // onSubmit({ ...this.state });
        this.props.onSubmit(this.state.searchName)
        this.reset();
    }

    reset() {
        this.setState({
            searchName: ""
        })
    }

render() {
    const { searchName } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
        <header className={css.searchBar}>
  <form className={css.searchForm} onSubmit={handleSubmit}>
    <button type="submit" className={css.searchButton} onClick={handleSubmit}>
      <span className={css.searchButton_label}>Search</span>
    </button>
    <input
      className={css.searchInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
        onChange={handleChange}
    value={searchName}
    />
  </form>
</header>
        
    )
}
}
