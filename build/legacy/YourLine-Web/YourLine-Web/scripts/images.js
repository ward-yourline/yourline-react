function addImageToComponent(component, imageURL) {
    if (imageURL == null) {
        imageURL = '../../../assets/product_placeholder.jpeg'
    }
    let userImage = document.createElement('div');

    userImage.style.width = '250px';
    userImage.style.height = '250px';
    userImage.style.borderRadius = '50%';
    userImage.style.backgroundImage = `url(${imageURL})`;
    userImage.style.backgroundRepeat = 'no-repeat';
    userImage.style.backgroundPosition = 'center';
    userImage.style.backgroundSize = 'cover';

    component.appendChild(userImage)
}