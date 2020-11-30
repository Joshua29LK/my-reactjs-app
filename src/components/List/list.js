import React, { useEffect } from 'react';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { MDBCol, MDBInput } from "mdbreact";

import '../../assets/css/list.css';
import { useApi } from '../../talons/List/useApi';

const List = () => {

    const talonProps = useApi();

    const {
        handlePageChange,
        handleSearchSubmit,
        handleSearchChange,
        searchQuery,
        activePage,
        jsonRespon,
        loading
    } = talonProps;

    useEffect(() => {
       document.title = 'Items';
    }, []);

    if (loading || !jsonRespon) {
        return <div className="content w-100">
            <div className="container mx-auto">
                <span>{'Loading...'}</span>
            </div>
        </div>
    };

    if (!jsonRespon.success) {
        return <div>
            {'Error'}
        </div>
    }

    return (
        <div className="content w-100">
            <div className="container mx-auto">
                <form onSubmit={handleSearchSubmit.bind(this)}>
                    <MDBCol md="6" className="px-0">
                        <MDBInput hint="Enter here" type="text" containerClass="mt-0 d-inline-block w-75" value={searchQuery} onChange={handleSearchChange.bind(this)} />
                        <MDBInput type="submit" value="Search" containerClass="d-inline-block ml-2" />
                    </MDBCol>
                </form>
                {jsonRespon.data.length ? (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="id-column">ID</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jsonRespon.data.map(item => (
                                    <tr key={item.id}>
                                        <td className="text-center">{item.id}</td>
                                        <td>{item.title}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </Table>

                        <Pagination
                            linkClass={'page-link'}
                            itemClass={'page-item'}
                            activePage={activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={jsonRespon.countItems}
                            pageRangeDisplayed={jsonRespon.pageNumber}
                            onChange={handlePageChange.bind(this)}
                        />
                    </div>
                ) : (
                    <h2>{'No items'}</h2>
                )}
            </div>
        </div>
    );
}
 
export default List;