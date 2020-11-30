import React, { useEffect } from 'react';

const AboutUs = () => {
	useEffect(() => {
       document.title = 'About Us';
    }, []);

    return (
        <div className="content w-100 mt-4">
        	<div className="container mx-auto">
	            <h1>AboutUs</h1>
	            <p>
	            	<strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry.
	            	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took agalley
	            	of type and scrambledit to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
	            	typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
	            	Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            	</p>
	        </div>
        </div>
    );
}
 
export default AboutUs;
