import Customer from "./models/Customer"
import OrderDB from "./models/Order"
import ProductDB from "./models/Product"

const dbInit = async () => {
    await Customer.sync()
    await OrderDB.sync()
    await ProductDB.sync()
}
export default dbInit