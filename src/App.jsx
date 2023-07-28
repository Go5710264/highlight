import './App.css'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid'

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
}

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
}

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
}

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
}

const withAddKey = (Component) => (props) => (<Component {...props} key={v4()}/>) 
withAddKey.displayName = 'hoc-mini';

const withAdditionWrapper = 
    (Component) => 
    (props) => {
        if(props.views >= 1000) 
            return <Popular key={v4()}>
                {withAddKey(Component)(props)}
            </Popular>
        if(props.views < 100) 
            return <New key={v4()}>
                {withAddKey(Component)(props)}
            </New>
        return <Component {...props} key={v4()}/>
    };

withAdditionWrapper.displayName = 'hoc';



function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return withAdditionWrapper(Video)(item)

            case 'article':
                return withAdditionWrapper(Article)(item);
        }
    });
}


function App() {
  const [list] = useState([
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
        views: 50
    },
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
        views: 12
    },
    {
        type: 'article',
        title: 'Невероятные события в неизвестном поселке...',
        views: 175
    },
    {
        type: 'article',
        title: 'Секретные данные были раскрыты!',
        views: 1532
    },
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
        views: 4253
    },
    {
        type: 'article',
        title: 'Кот Бегемот обладает невероятной...',
        views: 12,
    },
]);

  return (
    <List list={list} />
  );
}

New.propTypes = {
  children: PropTypes.object
}

Popular.propTypes = {
  children: PropTypes.object
}

Article.propTypes = {
  title: PropTypes.string,
  views: PropTypes.number
}

Video.propTypes = {
  url: PropTypes.string,
  views: PropTypes.number
}

withAdditionWrapper.propTypes = {
    props: PropTypes.object,
    views: PropTypes.number
}

export default App
