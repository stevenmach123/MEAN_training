

const API = (() => {
    const baseUrl = "http://localhost:5101/registers"
    const getList = () => fetch(baseUrl).then(x => x.json());
    const putList = (id, body) =>
        fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }).then(x => x.json());

    const addList = (body) => fetch(baseUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(x => x.json())

    const deleteList = (id) => fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }).then(x => x.json()).catch(e => console.log("error delete", e))
    return { getList, putList, addList, deleteList }

})()

const View = (() => {
    const dom = {
        input: "#inputwork",
        add: "#addwork",
        box1: "#box1"
    }
    /**
     * @param {{name:string,id:number}} itemlist
     */
    const temp = (itemlist) => {
        const { name, id } = itemlist;
        const join_value = name.replace(/\s+/g, '')
        return `
        <div id="${id}" >
        <span>${id}. </span>
        <span class="value" id="${join_value}value">${name}</span>
        <button class="collapse" onclick="collapse(event)" id="${join_value}">Collapse</button>
        <button onclick="updatemark(event)">Edit</button>
        <button class="remove" onclick="remove(event)">X</button>
     </div>`
    }
    return { dom, temp }
})()
const Model = ((view, API) => {
    class State {
        #onChange;
        #mylist = []
        constructor() { }
        get mylist() {
            return this.#mylist;
        }
        set mylist(list) {
            this.#mylist = list;
            this.#onChange(this.#mylist);
        }
        subscribe(cb) {
            this.#onChange = cb;
        }


    }

    // let db_id = []

    collapse = (e) => {

        let selector = `${e.target.id}value`;
        let v = document.getElementById(selector)?.classList;
        let spans = document.querySelectorAll("button.collapse");
        // console.log(spans.length)
        for (let span of spans) {
            console.log(span.id)
            if (e.target.id != span.id) {
                span.parentElement?.children[1].classList.remove("none");
            }
        }
        if (!v?.contains("none"))
            v?.add("none")
        else
            v?.remove("none")
    }


    /**
     * @param {State} state
     * @param {string} value
     */
    const addBox = async (state, value) => {
        let id = Math.floor(Math.random() * 100 + 1);
        let v = { name: value, id };
        const user = await API.addList(v);
        console.log(user);
        state.mylist = [...state.mylist, user];

    }
    return { ...API, State, addBox }


})(View, API)

const Controller = (function control(Model, View, API) {

    let input_work = document.querySelector(View.dom.input);
    let add_work = document.querySelector(View.dom.add);
    let box1 = document.querySelector(View.dom.box1);
    this.state = new Model.State();

    updatemark = (e) => {
        const name = e.target.parentNode.children[1].innerHTML;
        const id = e.target.parentNode.id;
        document.querySelector(".updateform input[name=id]").value = id;
        document.querySelector(".updateform input[name=name]").value = name;
    }
    updateform = async (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const id = parseInt(e.target.id.value);
        if (!Number.isNaN(id)) {
            await API.putList(id, { name })
            this.state.mylist = await API.getList();
        }
    }

    add_work?.addEventListener('click', (e) => {

        //console.log(document.querySelector(`.1#vin`)) .vin#1 is bad
        if ("#" + e.target.id === View.dom.add) {
            const exist = this.state.mylist.find(ele => ele.name === input_work.value)
            if (!exist && input_work?.value.trim() !== "") {
                console.log("here")
                Model.addBox(this.state, input_work?.value);
            }
        }
    })
    remove = async (e) => {
        console.log(e.target)
        const ele_id = e.target.parentElement.id;

        const del_user = await Model.deleteList(ele_id);
        console.log(del_user);
        const users = this.state.mylist.filter(el => el.id != del_user.id);
        this.state.mylist = users;

    }
    box1?.addEventListener('click', (e) => {
        if (e.target.tagName == "SPAN")
            console.log(e.target)
    })
    this.init = async () => {
        this.state.subscribe((mylist) => {
            let temp = "";
            for (let itemlist of mylist) {
                temp += View.temp(itemlist)
            }
            box1.innerHTML = temp;
        })
        const datas = await Model.getList()
        this.state.mylist = datas;

    }


}).bind(this);
let controller = new Controller(Model, View, API);
controller.init();

//--


const str = "ds d"








/* 
remove(id){
}
*/