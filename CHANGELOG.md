### Modo de uso de use case create customer

```
(async () => {
const newCustomer = new CreateCustomerImpl()

    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452'
        }
    }


    await newCustomer.execute(information)

    const information2: CreateCustomerInput = {
        name: 'Beatriz',
        shippingAddress: 'Cra 56',
        contactInfo: {
            email: 'email2@example.com',
            phoneNumber: '3026493454'
        }
    }


    await newCustomer.execute(information2)

    console.log("Consultar el customer creado", await customerRepository.getCustomers())

})()
```

### Modo de uso de use case get all customers

```
(async () => {
    const newCustomer = new CreateCustomerImpl()

    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452'
        }
    }


    await newCustomer.execute(information)

    // Habiendo ya informacion almacenada veamos como funciona el metodo para obtenerlos todos
    const customers = new GetAllCustomersImpl()

    console.log("All customers: ", await customers.execute())
})()
```

### Modo de uso de use case get one customer

```
(async() => {
    const newCustomer = new CreateCustomerImpl()

    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452'
        }
    }


    await newCustomer.execute(information)

    const information2: CreateCustomerInput = {
        name: 'Beatriz',
        shippingAddress: 'Cra 56',
        contactInfo: {
            email: 'email2@example.com',
            phoneNumber: '3026493454'
        }
    }


    await newCustomer.execute(information2)

    const customers = new GetAllCustomersImpl()

    const allCostumers = await customers.execute()

    console.log("All customers: ", allCostumers)

    // Buscar el usuario
    const fisrtCustomer = new GetOneCustomerImpl()

    console.log( await fisrtCustomer.getOneCustomer(allCostumers.customers[0].id))
})()
```

### Modo de uso de use case update customer

```
(async () => {
    const newCustomer = new CreateCustomerImpl()

    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452'
        }
    }

    await newCustomer.execute(information)

    const customers = new GetAllCustomersImpl()

    const allCostumers = await customers.execute()

    console.log("All customers: ", allCostumers)

    // Ahora vamos a actualizar
    const updateIntsnace = new UpdateCustomerImpl()

    updateIntsnace.execute({
        id: allCostumers.customers[0].id,
        changes: {
            name: 'Yeison Villegas'
        }
    })

    console.log("All customers: ", await customers.execute())
})()
```
