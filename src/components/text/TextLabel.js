import React from 'react';

/*
* Example use:
* <TextLabel type={TextLabelType.PARAGRAPH} text="Aligned left" alignment={TextLabelAlignment.LEFT} />
* <TextLabel type={TextLabelType.PARAGRAPH} text="Aligned center" alignment={TextLabelAlignment.CENTER} />
* <TextLabel type={TextLabelType.PARAGRAPH} text="Aligned right" alignment={TextLabelAlignment.RIGHT} />
*/

export const TextLabelAlignment = {
    left: "left",
    right: "right",
    center: "center"
}

export const TextLabelType = {
    p: "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4"
}

const TextLabel = ({ type, fontSize, text, alignment }) => {
    const elementType = TextLabelType[type] || TextLabelType.p;
    const alignmentType = TextLabelAlignment[alignment] || TextLabelAlignment.left;

    console.log('alignment and type', alignment, type, fontSize)
    const elementStyle = {
        fontSize: type === TextLabelType.p ? fontSize : undefined,
        textAlign: alignmentType,
    };

    return (
        <div>
            {React.createElement(elementType, { style: elementStyle }, text)}
        </div>
    );
}

export default TextLabel;


