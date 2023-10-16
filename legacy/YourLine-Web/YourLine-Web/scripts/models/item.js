class Item {
    constructor({ id, name, type, businessID, categoryID, value, description, mainImage, childrenIDs, isVisible, stock }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.businessID = businessID;
        this.categoryID = categoryID;
        this.value = value;
        this.description = description;
        this.mainImage = mainImage;
        this.childrenIDs = childrenIDs;
        this.isVisible = isVisible;
        this.stock = stock;
    }
}
