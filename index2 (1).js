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
        desc: "吃饭",
        isDone: true,
      },
      {
        desc: "睡觉",
        isDone: false,
      },
      {
        desc: "打豆豆",
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

// 定义currentIndex变量，来保存当前被选中的menuItem，默认选中第一个menuItem，所以我们这个值为0
let currentIndex = 0;

renderMenuItem();
renderTodos();

// 实现新增功能
addMenuItemBtn.onclick = function () {
  // 1、创建一个描述menuItem的对象，添加到 todolist 数组中
  // 2、修改 currentIndex
  // 3、创建一个新的menuItem，并且添加到新增按钮的前面
  // 4、重新渲染右侧内容区
};

// 给头部的小锁绑定点击事件，来切换锁定状态
headerLock.onclick = function () {
 
  // 1、修改todolist里面当前被激活的menuItem的 isLocked属性

  // 2、重新渲染右侧的内容区

  // 3、修改menuItem左侧的图标
};

// 根据todolist的数据来生成menuItem
function renderMenuItem() {
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
    if (idx === currentIndex) {
      menuItemBadge.classList.add("active-badge");
    }
    // 统计徽标的数字
    let noDoneArr = menuItemObj.todos.filter(function (todoObj) {
      return todoObj.isDone == false;
    });
    menuItemBadge.innerText = noDoneArr.length;

    // 给每一个 menuItemDiv 绑定点击事件，点击的时候来切换右侧的内容
    menuItemDiv.onclick = function () {
      // 动态修改当前被激活的menuItem的索引
      currentIndex = this.getAttribute("data-index");

      // 1、切换menuItem被激活的样式
      let menuItemList = document.querySelectorAll(".menu-item");
      for (let i = 0; i < menuItemList.length - 1; i++) {
        menuItemList[i].classList.remove("menuItem-active");
      }

      // 2、切换menuItem的徽标的被激活的样式
      let menuItemBadgeList = document.querySelectorAll(".menu-right-badge");
      menuItemBadgeList.forEach(function (badge) {
        badge.classList.remove("active-badge");
      });
      menuItemBadgeList[currentIndex].classList.add("active-badge");
     

      this.classList.add("menuItem-active");

      // 2、切换右侧展示的内容
      renderTodos();
    };

    // 拼装menuItem
    menuItemDiv.appendChild(menuLeftIcon);
    menuItemDiv.appendChild(menuItemTitle);
    menuItemDiv.appendChild(menuItemBadge);
    // 将menuItemDiv插入到新增按钮的前面
    menuBox.insertBefore(menuItemDiv, addMenuItemBtn);
  });
}

// 根据todolist的数据来生成右侧的todo
function renderTodos() {
  // 获取左侧菜单被激活的徽标
  let menuItemActiveBadge = document.getElementsByClassName("active-badge")[0];

  // 修改右侧头部的标题
  headerTitle.innerText = todolist[currentIndex].title;
  // 修改右侧头部的徽标数值
  headerBadge.innerText = menuItemActiveBadge.innerText;

  // 动态渲染头部小锁的图标
  if (todolist[currentIndex].isLocked) {
    headerLock.classList.remove("glyphicon-pencil");
    headerLock.classList.add("glyphicon-lock");
    addTodoInp.disabled = true;
  } else {
    headerLock.classList.remove("glyphicon-lock");
    headerLock.classList.add("glyphicon-pencil");
    addTodoInp.disabled = false;
  }

  // 先将 todoItemWrapper 里面的todoItem全部移除掉
  todoItemWrapper.innerHTML = "";
  // 循环生成todos
  creatTodos();
}

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
    if (todoObj.isDone) {
      oCheckbox.checked = true;
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
}
