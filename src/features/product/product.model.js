
export default  class ProductModel{
    constructor(name,description,imageUrl,category,price,sizes,id){
        this._id = id
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.category = category
        this.price = price
        this.sizes = sizes
    }
}