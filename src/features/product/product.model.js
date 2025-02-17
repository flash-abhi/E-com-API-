export default  class ProductModel{
    constructor(id,name,description,imageUrl,category,price,sizes){
        this.id = id
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.category = category
        this.price = price
        this.sizes = sizes
    }
    static getALL(){
        return products;
    }
    static get(id){
        const product = products.find(p => p.id == id)
        return product
    }
    static AddProduct(product){
        product.id = products.length+1;
        products.push(product)
        return product
    }
    static filter(minPrice, maxPrice, category){
        const result = products.filter(product => {
            return (
                (!minPrice || product.price>=minPrice) && 
                (!maxPrice || product.price<= maxPrice) && 
                (!category ||product.category == category)
            );
        });
        return result;
    }
}

const products = [
    new ProductModel(
        1,
        "Product 1",
        "Lenovo ThinkPad gives fast performance at an affordable price. Laptop Ideal for professionals/students needing best-in-class, slim and light laptops. It's powered with Intel Core i5 8250U 1.6 GHz upto 3.4 GHz with Intel Turbo Boost, 16 GB DDR4 RAM along with 512 GB SSD Storage which enhances the overall performance of the machine and 3 MB cache.",
        "https://m.media-amazon.com/images/I/51nM5vzFmnL.AC_SX500.jpg",
        "category1",
        19.99,
    ),
    new ProductModel(
        2,
        "Product 2",
        "description 2",
        "https://m.media-amazon.com/images/I/41f7sNC+WpL.AC_SX250.jpg",
        "category2",
        29.99
    ),
    new ProductModel(
        3,
        "Product 3",
        "description 3",
        "https://m.media-amazon.com/images/I/81iK-qtJbcL._AC_UL480_FMwebp_QL65_.jpg",
        "category3",
        39.9,
        ["M","L","XL","XXL"]
    )
]