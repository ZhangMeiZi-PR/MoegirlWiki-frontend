import searchIcon from '../../../../assets/Material/image/search.svg'
import './FocusHeader.css';
export function FocusHeader() {
  return(
    <header className='focus-header'>
      <p className='focus-logo'>萌媒百科</p>
      <form className='focus-search'>
        <input type="search" placeholder='搜索之....' className='focus-search-input' />
        <button type="submit" className='focus-search-icon' aria-label='Search site'>
          <img src={searchIcon} alt=""/>
        </button>
      </form>
    </header>
  )
}