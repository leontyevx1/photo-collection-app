import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./components/Collection/Collection";
import {categoryOptions} from "./state/state";
import axios from "axios";
import Paginator from "./components/Paginator/Paginator";

const App = () => {

    const [categoryId, setCategoryId] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [collections, setCollections] = useState([]);
    const [fullCollection, setFullCollection] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {

        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` : '';

        const instance = axios.create({
            withCredentials: false,
            baseURL: 'https://640a0343d16b1f3ed6e4046a.mockapi.io/'
        })

        instance.get(`photo_collections?page=${page}&limit=3&${category}`)
            .then(response => {
                setCollections(response.data);
            })
            .catch(error => {
                console.warn(error);
                alert('Ошибка запроса');
            }).finally(() => {
            setIsLoading(false);
        })

        instance.get('photo_collections')
            .then(response => {
                setFullCollection(response.data);
            })
            .catch(error => {
                console.warn(error);
                alert(error)
            })
    }, [categoryId, page]);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categoryOptions.map((item, index) =>
                        (<li
                            onClick={() => setCategoryId(index)}
                            className={categoryId === index ? 'active' : ''} key={item.name}>
                            {item.name}
                        </li>))}
                </ul>
                <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input"
                       placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {isLoading
                    ? (<h2>Идет загрузка...</h2>)
                    : (collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj, index) => (
                            <Collection
                                key={index}
                                name={obj.name}
                                images={obj.photos}
                            />
                        )))}
            </div>
            <ul className="pagination">
                <Paginator
                    setPage={setPage}
                    page={page}
                    fullCollection={fullCollection}
                />
            </ul>
        </div>
    );
}

export default App;
