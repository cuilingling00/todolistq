let todolist = [
  {
    title: "Jessica",
    isLocked: true,
    todos: [
      {
        desc: "吃饭",
        isDone: false,
      },
      {
        desc: "睡觉",
        isDone: false,
      },
      {
        desc: "打豆豆",
        isDone: true,
      },
    ],
  },
  {
    title: "Mark",
    isLocked: false,
    todos: [
      {
        desc: "写代码",
        isDone: false,
      },
      {
        desc: "玩游戏",
        isDone: false,
      },
      {
        desc: "睡觉",
        isDone: false,
      },
    ],
  },
];

// 获取左侧菜单menu的盒子
let menuBox = document.querySelector(".menu");
// 获取添加按钮
let addMenuItemBtn = document.getElementById("addTodo");
// 获取头部的title
let headerTitle = document.getElementById("title");
// 获取头部title的徽标
let headerBadge = document.getElementById("title-badge");
// 获取头部的小锁
let headerLock = document.getElementById("lock");
// 获取todos的容器
let todoItemWrapper = document.querySelector(".todoItemWrapper");
let addTodoInp = document.getElementById("addTodoInp");
let menuItem = document.querySelectorAll('.menu-item')
let menuLeftIconlist = document.getElementsByClassName('menu-left-icon')
let remove = document.getElementById('remove')
let hEader = document.querySelector('.header')
let menuTitle = document.querySelectorAll('.menuTitle')
let addtodo=document.querySelector('.addtodo')

// 将数据存储在本地，永久保存数据
if (localStorage.getItem('todolist')) {
  todolist = JSON.parse(localStorage.getItem('todolist'))
}
// 定义currentIndex变量，来保存当前被选中的menuItem，默认选中第一个menuItem，所以我们这个值为0
let currentIndex = localStorage.getItem('currentIndex') || 0;
// 将函数调用写在前面，防止用到的函数会出现错误
renderMenuItem();
renderTodos();


// 小锁的切换
headerLock.onclick = function () {
  // 修改todolist里面当前被激活的menuItem的islocked属性
  if (headerLock.classList.contains('glyphicon-lock')) {
    this.classList.remove('glyphicon-lock')
    this.classList.add('glyphicon-pencil')
    //修改左侧菜单的属性
    todolist[currentIndex].isLocked = false;
    addTodoInp.disabled = false;

    //  修改menuItem里面的左侧的图标
    menuLeftIconlist[currentIndex].classList.remove('glyphicon-lock')

    menuLeftIconlist[currentIndex].classL,ist.add('glyphicon-pencil')

    // if (menuLeftIconlist[currentIndex].classList.contains('glyphicon-lock')) {
    //   menuItem[currentIndex].isLocked = false

    //   menuLeftIconlist[currentIndex].className = 'glyphicon glyphicon-pencil menu-left-icon'
    //   addTodoInp.disabled = false;

    // } 
    //  else if (menuLeftIconlist[currentIndex].classList.contains('glyphicon-pencil')) {
    //   menuItem[currentIndex].isLocked = true
    //   menuLeftIconlist[currentIndex].className = 'glyphicon glyphicon-lock menu-left-icon'
    //   // console.log(menuItem[currentIndex].isLocked);
    //   addTodoInp.disabled = true;
    // }
  }
  else {
    this.classList.remove('glyphicon-pencil')
    this.classList.add('glyphicon-lock')
    todolist[currentIndex].isLocked = true;
    addTodoInp.disabled = true

    //  修改menuItem里面的左侧的图标
    menuLeftIconlist[currentIndex].classList.add('glyphicon-lock')

    menuLeftIconlist[currentIndex].classList.remove('glyphicon-pencil')
    // if (menuLeftIconlist[currentIndex].classList.contains('glyphicon-lock')) {
    //   menuItem[currentIndex].isLocked = false

    //   menuLeftIconlist[currentIndex].className = 'glyphicon glyphicon-pencil menu-left-icon'
    //   addTodoInp.disabled = false;


    // } else if (menuLeftIconlist[currentIndex].classList.contains('glyphicon-pencil')) {
    //   menuItem[currentIndex].isLocked = true
    //   menuLeftIconlist[currentIndex].className = 'glyphicon glyphicon-lock menu-left-icon'
    //   // console.log(menuItem[currentIndex].isLocked);
    //   addTodoInp.disabled = true;
    // }

  }
  // 重新渲染右侧的内容区

  // todoItemWrapper.innerHTML = ''
  // creatTodos()
  localStorage.setItem('todolist',JSON.stringify(todolist))
}

// 更改右侧标题的值

let titleBox = document.querySelector(".titleBox")
let titl = document.querySelector(".title-editer")
let titleinput = document.getElementById("title-input")
let cancel = document.getElementById("cancel")
headerTitle.onclick = function () {
  titleinput.value = todolist[currentIndex].title
  titleBox.style.display = "none"
  titl.style.display = "block"

  titleinput.onkeyup = function (e) {
    if (e.key ==='Enter' && this.value) {
      headerTitle.innerText = this.value
      todolist[currentIndex].title = headerTitle.innerText
      titleBox.style.display = "block"
      titl.style.display = "none"
      titleBox.style.display = "flex"
      // 修改了headerTitle的值，重新渲染左侧菜单的值
      renderMenuItem()
    }
  }
  // 将数据存储在本地
  localStorage.setItem('todolist', JSON.stringify(todolist))
}

// 实现新增功能
addMenuItemBtn.onclick = function () {
  // 1、创建一个描述menuItem的对象，添加到 todolist 数组中
  // 2、修改 currentIndex，让当前选择的是menuItem的当前项
  // 3、创建一个新的menuItem，并且添加到新增按钮的前面
  // 4、重新渲染右侧内容区
  let descmenu = {
    title: "newList",
    isLocked: false,
    todos: []
  }
  todolist.push(descmenu)
  // let newmenuItem=document.createElement('menu-item')
  // menuBox.insertBefore(newmenuItem,addMenuItemBtn)
  // menuItem = document.querySelectorAll('.menu-item');
  // console.log(menuItem);
  // for (let i = 0; i < menuItem.length - 1; i++) {
  //   console.log(i);
  //   menuItem[i].remove();
  // }
  // todoItemWrapper.innerHTML = ''
  // 让鼠标选中新增的项
  currentIndex = todolist.length - 1

  renderTodos()
  renderMenuItem()
  localStorage.setItem('todolist',JSON.stringify(todolist))
}

// 点击删除按钮，删除右侧内容区，以及左侧菜单栏的当前项
remove.onclick = function () {
  // menuItem = document.querySelectorAll('.menu-item');
  // let todoItemWrapper = document.querySelector(".todoItemWrapper");
  // let hEader = document.querySelector('.header')
  // todoItemWrapper.remove();
  // hEader.style.display='none'
  // menuItem[currentIndex].remove()
  // todoItemWrapper.style.display='none'
  todolist.splice(currentIndex, 1)
  if (currentIndex > 0) {
    currentIndex--
  }
  console.log(currentIndex);
  renderMenuItem()
  // 渲染左侧菜单
  renderTodos()
  // 渲染右侧内容区
  localStorage.setItem('todolist',JSON.stringify(todolist))
}


// input 框添加enter回车事件，将输入的内容添加到todos
addTodoInp.onkeyup = function (e) {
  e = e || window.event
  if (e.key == 'Enter' && this.value) {
    let todoObj = {
      desc: this.value,
      isDone: false,
    }

    todolist[currentIndex].todos.push(todoObj)
    console.log(todolist);
    // 一旦向todolist添加对象，就要先清空之前存在的内容，在重新渲染左右侧页面
    todoItemWrapper.innerHTML = ''
    // 更新左侧菜单栏和右侧内容区
    renderMenuItem()
    renderTodos()
    // 清空输入框的内容
    this.value = ''
    //   let oinp = document.createElement('input')
    //   oinp.innerHTML = todoObj.todos.desc
    //   oinp.type = 'text'
    //  let oChec=document.createElement('input')
    //  oChec.type='checkbox'
    //  oChec.checked=todos.isDone.value

    //  创建一个input框，添加到页面中

    // 创建元素，添加到todolist 
    // let oDiv=document.createElement('div')
    // oDiv.classList.add('todoItem')
  }
  localStorage.setItem('todolist',JSON.stringify(todolist))

}

// 根据todolist的数据来生成menuItem
function renderMenuItem() {
  // 先清空menuItem
  let menuItem = document.querySelectorAll(".menu-item");
  for (let i = 0; i < menuItem.length - 1; i++) {
    menuItem[i].remove()
  }

  todolist.forEach(function (menuItemObj, idx) {
    let menuItemDiv = document.createElement("div");
    menuItemDiv.classList.add("menu-item");
    // 如果idx等于currentIndex，就说明我们这个 menuItemDiv 被选中了
    if (idx == currentIndex) {
      menuItemDiv.classList.add("menuItem-active");
    }
    // 给menuItemDiv设置自定义属性
    menuItemDiv.setAttribute("data-index", idx);

    // 创建menuItem左侧小图标
    let menuLeftIcon = document.createElement("span");
    menuLeftIcon.classList.add("glyphicon", "menu-left-icon");
    // 根据当前menuItem是否锁定状态，来动态添加Icon图标
    if (menuItemObj.isLocked) {
      menuLeftIcon.classList.add("glyphicon-lock");
    } else {
      menuLeftIcon.classList.add("glyphicon-pencil");
    }

    // 创建menuItem 的标题标签
    let menuItemTitle = document.createElement("span");
    menuItemTitle.classList.add("menuTitle");
    // 设置标题
    menuItemTitle.innerText = menuItemObj.title;

    // 创建徽标标签
    let menuItemBadge = document.createElement("span");
    menuItemBadge.classList.add("badge", "menu-right-badge");
    if (idx == currentIndex) {
      menuItemBadge.classList.add("active-badge");
    }
    // 统计徽标的数字
    let noDoneArr = menuItemObj.todos.filter(function (todoObj) {
      return todoObj.isDone == false;
    });
    menuItemBadge.innerText = noDoneArr.length;

    // 给每一个 menuItemDiv 绑定点击事件，点击的时候来切换右侧的内容
    menuItemDiv.onclick = function () {
      currentIndex = this.getAttribute("data-index");
      // 将currentIndex保存在localStorage,刷新页面时保持该页面
      localStorage.setItem('currentIndex',currentIndex)
      
    
      // 切换menuItem右侧的内容
      let menuItem = document.querySelectorAll('.menu-item')
      for (let i = 0; i < menuItem.length - 1; i++) {
        menuItem[i].classList.remove('menuItem-active')
      }
      this.classList.add('menuItem-active')
      // 切换徽标的被激活的样式
      let menuItemBadgelist = document.querySelectorAll('.menu-right-badge')
      menuItemBadgelist.forEach(function (badge) {
        badge.classList.remove('active-badge')
      })
      menuItemBadgelist[currentIndex].classList.add('active-badge')

      // this.classList.add('active-badge')
      renderTodos();
      todoItemWrapper.innerHTML = ''
      creatTodos()
      let menuItemActiveBadge = document.getElementsByClassName("active-badge")[1];
      // 修改右侧头部的标题
      headerTitle.innerText = todolist[currentIndex].title;

      // 修改右侧头部的徽标数值
      headerBadge.innerText = menuItemActiveBadge.innerText;
      // console.log(menuItemActiveBadge.innerText);
      // console.log(headerBadge.innerText);



      // // 动态渲染头部小锁的图标
      if (todolist[currentIndex].isLocked) {
        headerLock.classList.add("glyphicon-lock");
        headerLock.classList.remove("glyphicon-pencil");
        addTodoInp.disabled = true;
      } else {
        headerLock.classList.add("glyphicon-pencil");
        headerLock.classList.remove("glyphicon-lock");
        addTodoInp.disabled = false;
      }

      // 判断锁的状态

    }

    // 拼装menuItem
    menuItemDiv.appendChild(menuLeftIcon);
    menuItemDiv.appendChild(menuItemTitle);
    menuItemDiv.appendChild(menuItemBadge);
    // 将menuItemDiv插入到新增按钮的前面
    menuBox.insertBefore(menuItemDiv, addMenuItemBtn);

  })
  localStorage.setItem('todolist',JSON.stringify(todolist))
}

// 根据todolist的数据来生成右侧的todo
function renderTodos() {
  // 没有数据时，让右侧内容区的头部和内容隐藏
  if (todolist.length <= 0) {
    hEader.style.display = 'none'
    todoItemWrapper.style.display = 'none'
    return;
  }
  else {
    hEader.style.display = 'block'
    todoItemWrapper.style.display = 'block'
  }
  // 获取左侧菜单被激活的徽标
  let menuItemActiveBadge = document.getElementsByClassName("active-badge")[0];

  // 修改右侧头部的标题
  headerTitle.innerText = todolist[currentIndex].title;
  // 修改右侧头部的徽标数值
  headerBadge.innerText = menuItemActiveBadge.innerText;
 
  // 动态渲染头部小锁的图标
  if (todolist[currentIndex].isLocked) {
    headerLock.classList.add("glyphicon-lock");
    headerLock.classList.remove("glyphicon-pencil");
    addTodoInp.disabled = true;
  } else {
    headerLock.classList.add("glyphicon-pencil");
    headerLock.classList.remove("glyphicon-lock");
    addTodoInp.disabled = false;
  }
  // 先将 todoItemWrapper 里面的todoItem全部移除掉
  todoItemWrapper.innerHTML = "";
  // 循环生成todos
  creatTodos();
  localStorage.setItem('todolist',JSON.stringify(todolist))
}
// 判断多选框的选中状态，实现垃圾桶元素的添加和删除此行
// 创建todos，并添加到页面
function creatTodos() {
  todolist[currentIndex].todos.forEach(function (todoObj) {
    // 创建todoItem这个最外层的div
    let todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todoItem");

    // 创建label标签
    let olabel = document.createElement("label");
    olabel.classList.add("label");

    // 创建 checkbox 多选框
    let oCheckbox = document.createElement("input");
    oCheckbox.type = "checkbox";
    oCheckbox.onchange = function () {
      if (this.checked) {
        oInput.disabled = true;
        deleteBtn.style.display = "block";
        oInput.classList.add('todo-done')
        todoObj.isDone = true

        // 点击每行，删除此行
        let todoItemdele = document.querySelectorAll('.todoItem-delete')
        todoItemdele.forEach(function (item,idx) {
          item.onclick = function () {
            this.parentElement.remove()
            todolist[currentIndex].todos.splice(idx,1)
          }
        })
        
     
      }
      else {
        oInput.disabled = false;
        deleteBtn.style.display = "none";
        oInput.classList.remove('todo-done')
        todoObj.isDone = false
      }
      // 获取徽标的数字
      let noDoneArr = todolist[currentIndex].todos.filter(function (todoObj) {
        return todoObj.isDone == false;
      });
      // 给徽标设置给头部
      headerBadge.innerHTML = noDoneArr.length;

      // 获取左侧的徽标并把设置给对应的徽标
      let menuRight = document.querySelectorAll('.menu-right-badge')
      menuRight[currentIndex].innerHTML = noDoneArr.length;
    }
    if (todoObj.isDone) {

      oCheckbox.checked = true;
    }
    else {
      oCheckbox.checked = false;
    }

    // 创建输入框
    let oInput = document.createElement("input");
    oInput.type = "text";
    oInput.classList.add("input", "todoItem-input");
    if (todoObj.isDone) {
      oInput.classList.add("todo-done");
      oInput.disabled = true;
    }
    oInput.value = todoObj.desc;

    // 创建删除按钮
    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("glyphicon", "glyphicon-trash", "todoItem-delete");
    if (todoObj.isDone) {
      deleteBtn.style.display = "block";
    } else {
      deleteBtn.style.display = "none";
    }

    // 判断锁定状态
    if (todolist[currentIndex].isLocked) {
      oCheckbox.disabled = true;
      oInput.disabled = true;
      deleteBtn.style.display = "none";
    }

    // 拼接todoItem
    olabel.appendChild(oCheckbox);
    todoItemDiv.appendChild(olabel);
    todoItemDiv.appendChild(oInput);
    todoItemDiv.appendChild(deleteBtn);

    // 将 todoItemDiv 添加到 todoItemWrapper
    todoItemWrapper.appendChild(todoItemDiv);
  });
  localStorage.setItem('todolist',JSON.stringify(todolist))

}




