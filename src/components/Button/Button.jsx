import css from 'components/Button/Button.module.css'

 function Button({ text, loadMore }) {
  return (
      <button onClick={loadMore} className={css.Button} type='button'>{text}</button>
  )
}


export default Button