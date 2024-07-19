const API2 = (() => {
    const baseURL = "http://localhost:3000";
    const headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
    }
    const getCart = () => fetch(`${baseURL}/cart`, {
        headers: headers,
        method: 'GET'
    }).then(x => x.json());

    const getInvent = (id) => fetch(`${baseURL}/inventory/${id}`, {
        headers: headers,
        method: 'GET'
    }).then(x => x.json());

    const getInventory = () =>
        fetch(`${baseURL}/inventory`, {
            headers: headers,
            method: 'GET'
        }).then(x => x.json());

    const addToCart = (inventoryItem) => fetch(`${baseURL}/cart`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(inventoryItem)
    }).then(x => x.json());
    // define your method to add an item to cart


    const updateCart = (id, newAmount) => fetch(`${baseURL}/cart/${id}`, {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify({ amount: newAmount })
    }).then(x => x.json());

    const deleteFromCart = (id) => fetch(`${baseURL}/cart/${id}`, {
        method: 'DELETE',
        headers: headers,
    })

    const checkout = () => {
        // you don't need to add anything here
        return getCart().then((data) =>
            Promise.all(data.map((item) => deleteFromCart(item.id)))
        );
    };

    return {
        getCart,
        updateCart,
        getInventory,
        addToCart,
        deleteFromCart,
        checkout, getInvent
    };
})();

const Model2 = (() => {
    // implement your logic for Model
    class State {
        #onChange;
        #onChange2;
        #inventory;
        #cart;
        constructor() {
            this.#inventory = [];
            this.#cart = [];
        }
        get cart() {
            return this.#cart;
        }

        get inventory() {
            return this.#inventory;
        }

        set cart(newCart) {
            this.#cart = newCart
            this.#onChange2(this.#cart);
        }
        set inventory(newInventory) {
            this.#inventory = newInventory
            this.#onChange(this.#inventory)

        }

        subscribe(cb) {
            this.#onChange = cb;
        }
        subscribe2(cb) {
            this.#onChange2 = cb
        }
    }
    const {
        getCart,
        updateCart,
        getInventory,
        addToCart,
        deleteFromCart,
        checkout, getInvent
    } = API2;
    return {
        State,
        getCart,
        updateCart,
        getInventory,
        addToCart,
        deleteFromCart,
        checkout,
        getInvent
    };
})();

const View2 = (() => {
    // implement your logic for View
    const dom = {
        invent: ".inventory-container ul",
        cart: '.cart-wrapper ul'
    }
    const temp2 = (items) => {
        const content = items.content.replace(/\s+/g, '')
        const id = items.id;
        return `
            <div class="invent cart" id="v${id}"> 
                <div>${content} </div>
                <div>x</div>
                <div>${items.amount}</div>
                <button onclick="deleteFromCart()">Delete</button>
            </div>
        `
    }
    const temp = (items) => {

        const content = items.content.replace(/\s+/g, '')
        const id = items.id;
        const count = items.count;
        return `
        <div class="invent"  id="${id}" >
            <span>${items.content}</span>
            <div  name="btn" class="minus" onclick="handleUpdateAmount(event)" >-</div>
            <div class="count">0</div>
            <div name="btn" class="plus" onclick="handleUpdateAmount(event)" >+</div>
            <button class="add" id="${content}" onclick="handleAddToCart(event)" >Add to Cart</button>
        </div>
        `
    }
    return { temp, temp2, dom };
})();

const Controller2 = ((model, view) => {
    // implement your logic for Controller
    const state = new model.State();
    const invent_container = document.querySelector(view.dom.invent)
    const cart_container = document.querySelector(view.dom.cart);
    const init = async () => {
        state.subscribe2(carts => {
            let temp = ""
            for (let cart of carts) {
                temp += view.temp2(cart);
            }
            cart_container.innerHTML = temp;
        })
        state.subscribe(invents => {
            let temp = ""

            for (let invent of invents) {
                temp += view.temp(invent);
            }
            invent_container.innerHTML = temp;
        })
        const invents = await model.getInventory()
        const carts = await model.getCart();
        state.inventory = invents
        state.cart = carts;

    };

    handleUpdateAmount = (event) => {
        event.preventDefault()
        const el = event.target;
        const amount_el = el.parentElement.children[2];
        if (el.className == "minus") {
            const val = parseInt(amount_el.innerHTML) - 1;
            if (val < 0) {
                amount_el.innerHTML = 0; return;
            }
            amount_el.innerHTML = val;
        }
        else if (el.className == "plus") {
            amount_el.innerHTML = parseInt(amount_el.innerHTML) + 1;
        }

    };

    handleAddToCart = async (event) => {
        event.preventDefault()
        const el = event.target
        const id = el.parentElement.id
        const count = parseInt(el.parentNode.childNodes[2]);
        const invent_item = await model.getInvent(id);
        const cart_items = await model.getCart();
        const exist = cart_items.find(el => el.id == parseInt(id));
        if (exist) {
            const cur_amount = exist.amount;
            model.updateCart(id, cur_amount + count);
            cart_items.parentElement.children[2].innerHTML = JSON.stringify(cur_amount + count);

        } else {
            console.log(count, invent_item);
            invent_item.amount = count
            model.addToCart(invent_item);
            cart_container.innerHTML += view.temp2(invent_item);
        }



    };

    const handleDelete = () => { };

    const handleCheckout = () => { };
    const bootstrap = () => {
        init();
    };
    return {
        bootstrap,
    };
})(Model2, View2);

Controller2.bootstrap();