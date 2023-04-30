import React from 'react';
import {Helmet} from 'react-helmet';

const HelmetFile = () => {
    return (
        <div className='application'>
            <Helmet>
            {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
            <title>Kabir LLC</title>
            </Helmet>
        </div>
    )
}

export default HelmetFile;