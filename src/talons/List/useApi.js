import { useCallback, useEffect, useState } from 'react';
import * as query from 'query-string';
import { useHistory } from "react-router-dom";

export const useApi = () => {
    const history = useHistory();
    const params = query.parse(window.location.search);

    const [loading, setLoading] = useState(true);
    const [jsonRespon, setJsonRespon] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(params.q);

    useEffect(() => {
        fetch("https://gorest.co.in/public-api/posts").then(
            res => res.json()
        ).then(
            (result) => {
                if (result.code === 200) {
                    result.success = true;
                    let parsed = query.parse(window.location.search);
                    let items = result.data,
                        indexOfLastItem = 5,
                        indexOfFirstItem = 0;

                    if (parsed.q) {
                        setSearchQuery(parsed.q);
                        items = items.filter(function (item) {
                            return item.title.toLowerCase().includes(parsed.q.toLowerCase());
                        });
                    } else {
                        setSearchQuery('');
                    }
                    result.countItems = items.length;
                    result.pageNumber = Math.round(items.length / 5);
                    if (parsed && Object.keys(parsed).length !== 0 && parsed.p) {
                        const p = parseInt(parsed.p);
                        if (p > 0) {
                            indexOfLastItem = 5 *p;
                            indexOfFirstItem = indexOfLastItem - 5;
                            setActivePage(p);
                        }                        
                    } else {
                        setActivePage(1);
                    }
                    if (items.length > 1) {
                        result.data = items.slice(indexOfFirstItem, indexOfLastItem);
                    } else {
                        result.data = items;
                    }
                    setJsonRespon(result);
                }
                setLoading(false);
            },
            (error) => {
                setLoading(false);
                setJsonRespon({
                    success: false
                });
            }
        )
    }, [history.location.search]);

    const handlePageChange = useCallback((pageNumber) => {
        let params = '',
            parsed = query.parse(window.location.search);
        if (pageNumber) {
            parsed.p = pageNumber;
        } else {
            delete parsed.p;
        }
        params += query.stringify(parsed);
        if (params) {
            history.push('/?' + params);
        } else {
            history.push('/');
        }
    }, [history]);

    const handleSearchSubmit = useCallback((event) => {
        event.preventDefault();
        let params = '',
            parsed = query.parse(window.location.search);
        if (searchQuery) {
            parsed.q = searchQuery;
            delete parsed.p;
        } else {
            delete parsed.q;
        }
        params += query.stringify(parsed);
        if (params) {
            history.push('/?' + params);
        } else {
            history.push('/');
        }
    }, [searchQuery, history]);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    return {
        handlePageChange,
        handleSearchSubmit,
        handleSearchChange,
        searchQuery,
        activePage,
        jsonRespon,
        loading
    }
};
