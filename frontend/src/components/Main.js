import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main ({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((item) => {
    return (
      <li className="cards__item" key={item._id}>
        <Card
        card={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}/>
      </li>
    );
  })

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrap">
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__image-edit"
            aria-label="Редактировать"
            //Не является ошибкой!!! Ссылка на официальную документацию по данному вопросу: https://ru.reactjs.org/docs/accessibility.html
          ></button>
          <img src={currentUser.avatar} alt="Аватарка" className="profile__image"/>
          <div className="profile__wrap-text">
            <div className="profile__wrap-title">
              <p className="profile__title">{currentUser.name}</p>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__button-edit"
                aria-label="Редактировать"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__button-add"
          aria-label="Добавить место"
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__items">
          {cardsElements}
        </ul>
      </section>
    </main>
  );
}

export default Main;
