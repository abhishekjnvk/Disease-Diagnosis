import React, { useState } from 'react';

import { Alert } from 'react-bootstrap';



export default function AlertDismissible(props) {
    const [show] = useState(true);
    return (
        <>
            <Alert show={show} variant={props.alert_type}>
                <Alert.Heading>{props.message}</Alert.Heading>
            </Alert>
        </>
    );
}