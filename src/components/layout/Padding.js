import React from 'react';

const Padding = ({ flex }) => {
    return <div style={{ flex }}></div>;
};

Padding.defaultProps = {
    flex: 1,
};

export default Padding;
