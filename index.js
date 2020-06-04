let state = {
  defaultItems: [],
  items: [],
}
// 0: {userId: 1, id: 1, title: "delectus aut autem", completed: false}

function getList() {
axios
  .get("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    state.items = response.data;
    state.defaultItems = response.data 
    render();
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

function reset() {
  const { defaultItems } = state;
  state.items = [...defaultItems];
  render();
}

function renderItems() {
  const { items } = state;
if (items.length === 0) {
  return `<h4>There are no items</h4>`;
} else {
    return items.reduce((itemStr, item) => {
       return itemStr + renderItem(item);
    }, '');
}
}  

function renderItem(item) {
    if (item.completed) {
      return `<h3>Title: ${item.title}</h3>
              <h5>User ID: ${item.userID}</h5>
              <h5> Completed </h5>`
              
    } else {
      return `<h3>Title: ${item.title}</h3>
              <h5>User ID: ${item.userID}</h5>
              <h5> Incomplete </h5>`
              
    }
}

// removed onclick from renderItem
// function complete() {
//   const { items } = state
//   changeItem = items.dataset
//   console.log(changeItem)
//   if (changeItem.completed === false) {
//     changeItem.completed = true;
//   } else {
//     changeItem.completed = false;
// }
// render();
// }

function sortByTitle() {
    const { items } = state
    items.sort((a, b) => {
        if (a.title.split(" ")[0] > b.title.split(" ")[0]) {
        return 1;
        } else if (a.title.split(" ")[0] < b.title.split(" ")[0]) {
                return -1;
        } else {
          return 0;
        }
      });
      render();
    }


function getHTML(id, text) {
    document.getElementById(id).innerHTML = text
}

function filterComplete() {
    reset();
    const {items} = state
    const tasksCompleted = items.filter((item) => item.completed === true )
    state.items = tasksCompleted
    render();     
    }

function filterIncomplete() {
    reset();
    const {items} = state
    const tasksIncomplete = items.filter((item) => item.completed === false )
    state.items = tasksIncomplete
    render();     
     }
    

function render() {
    getHTML("items", renderItems())
}
// render();