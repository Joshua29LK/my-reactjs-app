import React, { useEffect } from 'react';

import notFoundPage from '../../assets/images/not-found-page.png';

const NotFoundPage = () => {
	useEffect(() => {
	   document.title = '404 Not Found Page';
	}, []);

    return (
        <div className="content w-100">
        	<div className="container mx-auto">
            	<img src={notFoundPage} alt="Not Found Page" className="w-100" />
            </div>
        </div>
    );
}
 
export default NotFoundPage;
